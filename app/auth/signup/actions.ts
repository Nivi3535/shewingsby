"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

type SignupData = {
  name: string;
  email: string;
  password: string;
};

export async function signupAction(data: SignupData) {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  // User already exists -> Login
  if (existingUser) {
    return {
      success: false,
      message: "User already exists. Please log in instead.",
    };
  }

  // User doesn't exist -> Create account
  const hashedPassword = await bcrypt.hash(data.password, 10);

  await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
    },
  });

  // // Login after signup
  // await signIn("credentials", {
  //   email: data.email,
  //   password: data.password,
  //   redirectTo: "/dashboard",
  // });

  return {
    success: true,
    message: "Account created successfully",
  };
}
