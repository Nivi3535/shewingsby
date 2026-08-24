import prisma from "@/lib/prisma";
import { NextResponse } from "next/dist/server/web/spec-extension/response";
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get("keyword");
  console.log("keyword", keyword);
  const searchTerm = searchParams.get("keyword") ?? "";
  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: searchTerm,
        //mode: "insensitive",
      },
    },
  });

  return NextResponse.json(products);
}
