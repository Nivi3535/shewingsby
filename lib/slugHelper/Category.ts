import prisma from "@/lib/prisma";

/**
 * Returns the category from a slug path.
 * Example:
 * ["women"] -> Women
 * ["kids", "boys"] -> Boys
 */
export async function getCategoryBySlugPath(slugs: string[]) {
  let category = null;

  for (const slug of slugs) {
    category = await prisma.category.findFirst({
      where: {
        slug,
      },
    });

    if (!category) {
      return null;
    }
  }

  return category;
}

async function collectChildren(categoryId: string) {
  const children = await prisma.category.findMany({
    where: {
      parentId: categoryId,
    },
  });

  let result = [...children];

  for (const child of children) {
    const grandChildren = await collectChildren(child.id);
    result.push(...grandChildren);
  }

  return result;
}

export async function getCategoryWithChildren(slugs: string[]) {
  const category = await getCategoryBySlugPath(slugs);

  if (!category) {
    return null;
  }

  return await collectChildren(category.id);
}

// lib/slugHelper/Category.ts
export async function getDescendantCategories(categoryId: string) {
  console.log(categoryId);
  return collectChildren(categoryId); // just export the existing helper
}
