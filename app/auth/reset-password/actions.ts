"use server";

import crypto from "crypto";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { resend } from "@/lib/resend";

const GENERIC = "If an account exists for this email, we've sent a reset link.";

function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export async function requestPasswordReset(email: string) {
  console.log("requestPasswordReset called with email:", email);
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return { message: GENERIC }; // same answer either way

  // simple rate limit: max 3 links per hour
  const recent = await prisma.passwordResetToken.count({
    where: {
      userId: user.id,
      createdAt: { gt: new Date(Date.now() - 60 * 60 * 1000) },
    },
  });
  if (recent >= 3) return { message: "Reached maxium number of times." };

  const token = crypto.randomBytes(32).toString("hex"); // goes in the email
  await prisma.passwordResetToken.create({
    data: {
      userId: user.id,
      tokenHash: hashToken(token), // only the hash is saved
      expiresAt: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes
    },
  });

  //its searchParams in the page.tsx not params - todo
  const link = `${process.env.APP_URL}/auth/reset-password?token=${token}`;

  await resend.emails.send({
    from: "ShewingBy <onboarding@resend.dev>",
    to: user.email,
    subject: "Reset your ShewingBy password",
    html: `<p>Click the link below to reset your password. It works for 30 minutes.</p>
           <p><a href="${link}">${link}</a></p>
           <p>If you didn't ask for this, you can ignore this email.</p>`,
  });

  return { message: GENERIC };
}

export async function resetPassword(token: string, newPassword: string) {
  if (newPassword.length < 8) {
    return {
      success: false,
      message: "Password must be at least 8 characters.",
    };
  }

  const record = await prisma.passwordResetToken.findUnique({
    where: { tokenHash: hashToken(token) },
  });

  if (!record || record.usedAt || record.expiresAt < new Date()) {
    return {
      success: false,
      message: "This reset link is invalid or has expired.",
    };
  }

  const hashed = await bcrypt.hash(newPassword, 10);

  // all three happen together, or none do
  await prisma.$transaction([
    prisma.user.update({
      where: { id: record.userId },
      data: { password: hashed, passwordChangedAt: new Date() },
    }),
    prisma.passwordResetToken.update({
      where: { id: record.id },
      data: { usedAt: new Date() },
    }),
    prisma.passwordResetToken.deleteMany({
      where: { userId: record.userId, id: { not: record.id } },
    }),
  ]);

  return {
    success: true,
    message: "Password reset successfully. Please log in.",
  };
}
