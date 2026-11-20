import { notFound } from "next/navigation";

import ProductFilter from "@/components/Product/ProductFilter";
import ProductSection from "@/components/Product/ProductSection";
import ProductDetail from "@/components/Product/ProductDetail";
import FilterProvider from "@/components/Product/Filter/FilterContext";

import {
  getCategoryBySlugPath,
  getCategoryWithChildren,
  getDescendantCategories,
} from "@/lib/slugHelper/Category";
import {
  getProductCount,
  getProductsByCategoryId,
  getProductBySlug,
  ProductsByCategory,
  //getProductsByCategoryIds,
} from "@/lib/slugHelper/Product";

interface SlugPageProps {
  searchParams: Promise<{ page?: string }>;
  params: Promise<{
    slug: string[];
  }>;
}

export default async function SlugPage({
  searchParams,
  params,
}: SlugPageProps) {
  const { slug } = await params;
  console.log("slug", slug);
  const _page = Number((await searchParams).page ?? 1);
  console.log("_page", _page);

  // Try to find as category first
  const category = await getCategoryBySlugPath(slug);
  console.log("category", category);
  // If not a category, try to find as product (use last slug segment)
  if (!category) {
    const productSlug = slug[slug.length - 1];

    console.log("productSlug", productSlug);
    const product = await getProductBySlug(productSlug);
    console.log("product", product);
    if (product) {
      // Show product detail page
      return <ProductDetail product={product} />;
    }

    // Neither category nor product found
    notFound();
  }

  // Category found - show category page with products
  let products: ProductsByCategory = [];
  let count = 0;

  //steps from gpt
  //get the slug record
  //using the slug id go find the children recordss
  //if it has children then keep the slug record ID and spread the all baby record ID
  //now we have id of each category fetch the product
  //else just the slug id
  //yhis return baby category
  const descendants = await getDescendantCategories(category.id);
  console.log("descendants", descendants);

  if (descendants.length > 0) {
    // has children (women -> sarees/kurtis, kids -> boys/girls, etc.)
    const categoryIds = [category.id, ...descendants.map((c) => c.id)];
    count = await getProductCount(categoryIds);
    const productArrays = await Promise.all(
      categoryIds.map((id) => getProductsByCategoryId(id, _page)),
    );
    products = productArrays.flat();
  } else {
    //
    // leaf category (e.g. boys, girls, sarees) — just its own products
    //count = await getProductCount(category.id);
    products = await getProductsByCategoryId(category.id, _page);
  }

  //   const _categoryWithChildren = await getCategoryWithChildren(slug);
  //   console.log(JSON.stringify(_categoryWithChildren, null, 2));
  //   if (!_categoryWithChildren) {
  //     return [];
  //   }
  //   const productArrays = await Promise.all(
  //     _categoryWithChildren.map((child) => getProductsByCategoryId(child.id)),
  //   );
  //   products = productArrays.flat();
  //   console.log(products);
  // }

  //criteria 2
  //If women then find all children category.parentID == women.id

  //criteria 3
  //when kids then load all boys(boys has children) and girls (girls also have children)

  /* if (!category.parentId) {
    const children = (await getCategoryWithChildren(slug)) ?? [];
    console.log(children.length);
    console.log(children);
    children.map((child) => console.log(child.id));
    const productArrays = await Promise.all(
      children.map((child) => getProductsByCategoryId(child.id)),
    );
    //console.log(productArrays);
    products = productArrays.flat();
  } else {
    products = await getProductsByCategoryId(category.id);
  } */

  // Sarees, Kurtis, etc.
  // Load parent category products for this category // women generally dont have anything send categoryid
  //find children category
  //now get all children category id and do search on product table // Sarees, Kurtis, etc.
  //found 1 problem here kids > got boys and girls and only boys and girls have product associated with it not kids
  //function getchild =(children : ) ={
  //do query again to get the children id and get the category of the children also check if the length is > 0
  //}
  // Load products for this category
  //const products = await getProductsByCategoryId(category.id);

  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      {/* filter state is scoped to this page, not the root layout */}
      <FilterProvider>
        <div className="flex gap-8">
          <aside className="w-72 shrink-0">
            <ProductFilter />
          </aside>

          <section className="flex-1">
            <ProductSection
              categoryName={category.name}
              products={products}
              count={count}
            />
          </section>
        </div>
      </FilterProvider>
    </main>
  );
}
