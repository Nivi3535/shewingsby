import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  //const body = await request.json();

  try {
    const { name, email, password, phone } = await request.json();
    console.log("body", email);
    if (!name || !email || !password || !phone) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 },
      );
    }
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (existingUser)
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 },
      );
    const hashedPassword = await bcrypt.hash(password, 10);
    const signup = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    //this doesnt work on server side it needs to do cookie part
    /*  if (signup) {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      redirect("/login");
    } */

    return NextResponse.json(
      {
        message: "User Succesfully created",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
