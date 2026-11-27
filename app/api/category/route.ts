// app/api/category/route.ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { getOrSet, invalidateTag } from "@/lib/cache";

function optionalText(value: FormDataEntryValue | null) {
  if (typeof value !== "string") return null;

  const text = value.trim();

  return text === "" ? null : text;
}

export async function POST(req: Request) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }
  try {
    const formData = await req.formData();

    const name = optionalText(formData.get("name"));
    const slug = optionalText(formData.get("slug"));

    if (!name || !slug) {
      return NextResponse.json(
        { message: "Name and slug are required" },
        { status: 400 },
      );
    }

    const category = await prisma.category.create({
      data: {
        name,
        slug,
        description: optionalText(formData.get("description")),
        image: optionalText(formData.get("image")),
        parentId: optionalText(formData.get("parentId")),
      },
    });

    await invalidateTag("categories");

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to create category" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const categories = await getOrSet(
      "categories:all", // key
      60 * 60 * 24, // keep 1 day
      ["categories"], // tag
      () => prisma.category.findMany({ orderBy: { createdAt: "asc" } }),
    );
    return NextResponse.json(categories);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch categories" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }
  const { id } = await req.json();
  try {
    const deletedCategory = await prisma.category.delete({
      where: {
        id: id,
      },
    });
    if (!deletedCategory) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 },
      );
    }
    await invalidateTag("categories");

    return NextResponse.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to delete category" },
      { status: 500 },
    );
  }
}
