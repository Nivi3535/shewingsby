import prisma from "@/lib/prisma"; //Lowercase prisma is your database client instance
import { Prisma } from "@/lib/generated/prisma/client"; //capital Prisma in the instanceof check; error comes from Prisma

import { NextResponse } from "next/server";
import { productSchema } from "@/lib/schemas/product";
import { createSlug } from "@/lib/slug";
import { mkdir, writeFile, unlink } from "fs/promises";
import path from "path";

import { auth } from "@/lib/auth";
import { getOrSet, invalidateTag } from "@/lib/cache";

const ALLOWED_TYPES = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
} as const;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_FILES = 6;

//if I have any stored copy, use it, however old; only go to the network if I have nothing
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const searchStr = searchParams.get("searchStr");
  console.log("searchStr", searchStr);

  const search = searchStr?.trim().toLowerCase() ?? "";
  if (search && search.length < 3) return NextResponse.json([]);
  const key = search ? `products:search:${search}` : "products:all";

  const products = await getOrSet(key, 60 * 60, ["products"], () =>
    prisma.product.findMany({
      include: { category: true, image: true },
      where: search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { description: { contains: search, mode: "insensitive" } },
            ],
          }
        : undefined,
    }),
  );

  return NextResponse.json(products);
}

export async function POST(request: Request) {
  // 1. Who is asking? (fixes: anyone could add products)
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ message: "Sign in required" }, { status: 401 });
  }
  if (session.user.role !== "ADMIN") {
    return NextResponse.json(
      { message: "Admin access required" },
      { status: 403 },
    );
  }

  try {
    const formData = await request.formData();

    // 2. Validate text fields with your existing schema (fixes: empty slug, 1.5 stock, NaN price)
    const name = String(formData.get("name") ?? "");
    const parsed = productSchema.safeParse({
      name,
      slug: createSlug(String(formData.get("slug") || name)), // empty slug -> made from name
      description: formData.get("description"),
      price: formData.get("price"),
      stock: formData.get("stock"),
      categoryId: formData.get("categoryId"),
    });
    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.issues[0].message },
        { status: 400 },
      );
    }
    const data = parsed.data;

    // 3. Does the category exist? (fixes: bad categoryId -> 500)
    const category = await prisma.category.findUnique({
      where: { id: data.categoryId },
      select: { id: true },
    });
    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 400 },
      );
    }

    // 4. Check the files BEFORE writing anything (fixes: orphan files, no type/size check)
    const files = formData
      .getAll("images")
      .filter((f): f is File => f instanceof File && f.size > 0);

    if (files.length > MAX_FILES) {
      return NextResponse.json(
        { message: `Max ${MAX_FILES} images` },
        { status: 400 },
      );
    }
    for (const file of files) {
      if (!(file.type in ALLOWED_TYPES)) {
        return NextResponse.json(
          { message: `${file.name}: only JPG, PNG or WEBP` },
          { status: 400 },
        );
      }
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { message: `${file.name}: max 5MB` },
          { status: 400 },
        );
      }
    }

    // 5. Write files with OUR name, never file.name (fixes: crafted filenames escaping the folder)
    const uploadDir = path.join(process.cwd(), "public", "uploads", "products");
    await mkdir(uploadDir, { recursive: true });

    const imagePaths: string[] = [];
    for (const file of files) {
      const ext = ALLOWED_TYPES[file.type as keyof typeof ALLOWED_TYPES];
      const filename = `${crypto.randomUUID()}.${ext}`;
      await writeFile(
        path.join(uploadDir, filename),
        Buffer.from(await file.arrayBuffer()),
      );
      imagePaths.push(`/uploads/products/${filename}`);
    }

    // 6. Save; if the DB fails, delete the files we just wrote
    try {
      const product = await prisma.product.create({
        data: {
          name: data.name,
          slug: data.slug,
          description: data.description || null,
          price: data.price,
          stock: data.stock,
          categoryId: data.categoryId,
          image: { create: imagePaths.map((image) => ({ image })) },
        },
        include: { category: true, image: true },
      });
      await invalidateTag("products");
      return NextResponse.json(product, { status: 201 });
    } catch (error) {
      await Promise.all(
        imagePaths.map((p) =>
          unlink(path.join(process.cwd(), "public", p)).catch(() => {}),
        ),
      );
      throw error; // goes to the outer catch below
    }
  } catch (error) {
    // 7. A clear message for a duplicate slug instead of a generic 500
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { message: "A product with this slug already exists" },
        { status: 409 },
      );
    }
    console.error(error);
    return NextResponse.json(
      { message: "Failed to create product" },
      { status: 500 },
    );
  }
}
