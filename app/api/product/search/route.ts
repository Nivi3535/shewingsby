import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const searchStr = searchParams.get("searchStr");

  console.log("searchStr", searchStr);

  if (!searchStr || searchStr.length < 3) {
    return NextResponse.json([]);
  }

  const productList = await prisma.product.findMany({
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
    include: {
      category: true,
      image: true,
    },
  });

  return NextResponse.json(productList);
}
