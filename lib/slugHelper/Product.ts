import prisma from "@/lib/prisma";
//import { cacheTag, cacheLife } from "next/cache";
//const cache = new Map<string, unknown>(); //i tried with return type it gives me circular refernce error which comes first
//im calling this page from server component and direct prisma query no HTTP so how do we
//cache this and check for validation

//React's cache() forgets everything when the request ends.
export const getProductsByCategoryId = async (
  categoryId: string,
  _page: number,
) => {
  //cacheTag("products"); // 2. label it "products"
  //cacheLife("hours"); // 3. auto-refresh after about 1 hour even if nobody calls
  const take = 5;
  const skip = (_page - 1) * take;
  console.log("PRODUCT categoryId", categoryId);
  const product = await prisma.product.findMany({
    where: {
      categoryId,
    },

    include: {
      image: true,
      category: true,
    },

    orderBy: {
      name: "asc",
    },
    skip,
    take,
  });
  return product;
};

export async function getProductCount(categoryIds: string[]) {
  const countvalue = prisma.product.count({
    where: {
      categoryId: {
        in: categoryIds,
      },
    },
  });
  console.log(countvalue);
  return countvalue;
}

export const getProductBySlug = async (slug: string) => {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      image: true,
      category: true,
    },
  });
  return product;
};

export type ProductsByCategory = Awaited<
  ReturnType<typeof getProductsByCategoryId>
>;
