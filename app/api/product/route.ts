import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { revalidateTag } from "next/dist/server/web/spec-extension/revalidate";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const searchStr = searchParams.get("searchStr");
  console.log("searchStr", searchStr);
  if (!searchStr) {
    return NextResponse.json(
      await prisma.product.findMany({
        include: {
          category: true,
          image: true,
        },
      }),
    );
  }

  if (searchStr.length < 3) {
    return NextResponse.json([]);
  }

  const productList = await prisma.product.findMany({
    include: {
      category: true,
      image: true,
    },
    where: {
      OR: [
        {
          name: {
            contains: searchStr,
          },
        },
        {
          description: {
            contains: searchStr,
          },
        },
      ],
    },
  });

  return NextResponse.json(productList);
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const price = Number(formData.get("price"));
    const stock = Number(formData.get("stock"));
    const categoryId = formData.get("categoryId") as string;

    const files = formData.getAll("images") as File[];

    // Create uploads folder if it doesn't exist
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    const imagePaths: string[] = [];

    for (const file of files) {
      if (file.size === 0) continue;

      const buffer = Buffer.from(await file.arrayBuffer());

      const filename = `${Date.now()}-${file.name}`;

      await writeFile(path.join(uploadDir, filename), buffer);

      imagePaths.push(`/uploads/${filename}`);
    }
    if (!categoryId || typeof categoryId !== "string") {
      return NextResponse.json(
        { message: "Category is required" },
        { status: 400 },
      );
    }
    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price,
        stock,
        categoryId,

        image: {
          create: imagePaths.map((image) => ({
            image,
          })),
        },
      },
      include: {
        category: true,
        image: true,
      },
    });
    revalidateTag("products", "max");
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to create product" },
      { status: 500 },
    );
  }
}

export type Products = Awaited<ReturnType<typeof GET>>;
