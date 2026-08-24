// app/api/category/route.ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const category = await prisma.category.create({
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description || null,
        image: body.image || null,
        parentId: body.parentId || null,
      },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to create category",
      },
      {
        status: 500,
      },
    );
  }
}

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to fetch categories",
      },
      {
        status: 500,
      },
    );
  }
}
