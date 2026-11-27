"use client";

import { useEffect, useState } from "react";
import { useCategoryStore } from "@/stores/categoryStore";
import { useShallow } from "zustand/react/shallow";

type ViewCategoryProps = {
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export default function ViewCategory({
  selectedId,
  onSelect,
}: ViewCategoryProps) {
  const { categories, loadCategory } = useCategoryStore(
    useShallow((state) => ({
      categories: state.categories,
      loadCategory: state.loadCategory,
    })),
  );

  useEffect(() => {
    loadCategory();
  }, [loadCategory]);

  return (
    <fieldset>
      <legend>Select a category</legend>

      {categories.map((category) => (
        <div key={category.id}>
          <label>
            <input
              type="radio"
              name="category"
              checked={selectedId === category.id}
              onChange={() => onSelect(category.id)}
            />
            {category.name}
          </label>
        </div>
      ))}
    </fieldset>
  );
}
