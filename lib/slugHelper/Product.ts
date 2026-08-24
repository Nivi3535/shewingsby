import prisma from "@/lib/prisma";
import { cache } from "react";
//const cache = new Map<string, unknown>(); //i tried with return type it gives me circular refernce error which comes first
//im calling this page from server component and direct prisma query no HTTP so how do we
//cache this and check for validation
//map and react cache works
//also next 16 has cache compoent
//map never expires so we need to check for validation and revalidation
export const getProductsByCategoryId = cache(
  async (categoryId: string, _page: number) => {
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
    //cache.set(key, product);
    //console.log(product);
    return product;
  },
);

//Trying different cache way
// export async function getProductsByCategoryId2(
//   categoryId: string,
//   _page: number,
// ) {
//   const take = 5;
//   const skip = (_page - 1) * take;
//   console.log("PRODUCT categoryId", categoryId);

//   const key = `${categoryId}-${_page}`; //it gives unique key if we search women its cache then if we do kids then return women caches value

//   if (cache.has(key)) {
//     console.log("Serving from cache");
//     return cache.get(key);
//   }

//   console.log("checking cache Fetching from database");
//   const product = await prisma.product.findMany({
//     where: {
//       categoryId,
//     },

//     include: {
//       image: true,
//       category: true,
//     },

//     orderBy: {
//       name: "asc",
//     },
//     skip,
//     take,
//   });
//   cache.set(key, product);
//   //console.log(product);
//   return product;
// }

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

// export async function getProductsByCategoryIds(categoryIds: string[]) {
//   return prisma.product.findMany({
//     where: {
//       categoryId: {
//         in: categoryIds,
//       },
//     },
//     include: {
//       image: true,
//       category: true,
//     },
//     orderBy: {
//       name: "asc",
//     },
//   });
// }
export const getProductBySlug = cache(async (slug: string) => {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      image: true,
      category: true,
    },
  });
  return product;
});

export type ProductsByCategory = Awaited<
  ReturnType<typeof getProductsByCategoryId>
>;
