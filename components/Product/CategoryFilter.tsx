"use client";
import FilterSection from "./FilterSection";
import { useEffect, useMemo, useState } from "react";
import { useFilter } from "./Filter/FilterContext";
import { useCategoryStore } from "@/stores/categoryStore";
import { Category } from "@/types/categories";
//import Category from "@/types/categories";

type Categorymap = {
  id: string | number;
  name: string;
  children?: Category[];
};

function buildTree(
  categories: Category[],
  parentId: number | null = null,
): Category[] {
  return categories
    .filter((category) => category.parentId === parentId)
    .map((category) => ({
      ...category,
      children: buildTree(categories, category.id),
    }));
}

export default function CategoryFilter() {
  const { selectedFiltersKey, selectedFilterValue } = useFilter("category");
  // select only what this component uses so loading/error changes don't re-render it
  const categories = useCategoryStore((state) => state.categories);
  const loadCategory = useCategoryStore((state) => state.loadCategory);
  //const selectedCategory = selectedFilters["category"] || [];
  const [openCategory, setOpenCategory] = useState(false);

  useEffect(() => {
    loadCategory();
  }, [loadCategory]);

  const handleChange = (category: number) => {
    console.log(category);
    setOpenCategory((prev) => !prev);
  };

  // only rebuild the tree when the categories change, not on every checkbox click
  const categoryTree = useMemo(() => buildTree(categories), [categories]);

  return (
    <FilterSection title="Category">
      {categoryTree.map((category) => (
        <label key={category.id} className="flex items-center gap-2">
          <input
            key={category.id}
            type="checkbox"
            onChange={() => {
              selectedFilterValue(String(category.id));
            }}
            checked={selectedFiltersKey.includes(String(category.id)) ?? false}
          />
          <span>{category.name}</span>{" "}
        </label>
      ))}
    {/*   {categories.map((category) => (
        <label key={category.id} className="flex items-center gap-2">
          <input
            key={category.id}
            type="checkbox"
            onChange={() => {
              selectedFilterValue(String(category.id));
            }}
            checked={selectedFiltersKey.includes(String(category.id)) ?? false}
          />
          <span>{category.name}</span>{" "}
        </label>
      ))}
      <p className="text-sm text-gray-600">Girls / Frocks</p> */}
    </FilterSection>
  );
}
