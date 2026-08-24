"use client";

import FilterSection from "./FilterSection";
import { useFilter } from "./Filter/FilterContext";

const colors = ["Red", "Blue", "Black", "Green"];

export default function ColorFilter() {
  const key = "color";

  const context = useFilter(key);

  const { selectedFiltersKey, selectedFilterValue } = context;

  return (
    <FilterSection title="Color">
      <div className="space-y-2">
        {colors.map((color) => (
          <div>
            {" "}
            <label key={color} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedFiltersKey.includes(color) ?? false}
                onChange={() => {
                  selectedFilterValue(color);
                }}
              />
              <span>{color}</span>
            </label>{" "}
          </div>
        ))}
      </div>
    </FilterSection>
  );
}
