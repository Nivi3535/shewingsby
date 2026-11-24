import "dotenv/config";
import bcrypt from "bcryptjs";
import prisma from "../lib/prisma";

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("Set ADMIN_EMAIL and ADMIN_PASSWORD in .env");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  //creates the admin, or makes an existing user with this email an admin
  const admin = await prisma.user.upsert({
    where: { email },
    update: { role: "ADMIN" },
    create: {
      name: "Admin",
      email,
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log(`Admin ready: ${admin.email} (role: ${admin.role})`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
