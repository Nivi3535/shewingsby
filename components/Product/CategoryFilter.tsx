"use client";
import FilterSection from "./FilterSection";
import { useContext, useEffect, useState } from "react";
import { useFilter } from "./Filter/FilterContext";
import { useCategoryStore } from "@/stores/categoryStore";
import { Category } from "@/types/categories";
//import Category from "@/types/categories";

type Categorymap = {
  id: string | number;
  name: string;
  children?: Category[];
};

export default function CategoryFilter() {
  const context = useFilter("category");
  if (!context) return null;

  const { selectedFiltersKey, selectedFilterValue } = context;
  const { categories, loadCategory } = useCategoryStore();
  //const selectedCategory = selectedFilters["category"] || [];
  const [openCategory, setOpenCategory] = useState(false);

  useEffect(() => {
    loadCategory();
  }, [loadCategory]);

  const handleChange = (category: number) => {
    console.log(category);
    setOpenCategory((prev) => !prev);
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

  return (
    <FilterSection title="Category">
      {buildTree(categories).map((category) => (
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
