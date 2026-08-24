import FilterSection from "./FilterSection";

const sizes = ["XS", "S", "M", "L", "XL"];

export default function SizeFilter() {
  return (
    <FilterSection title="Size">
      <div className="space-y-2">
        {sizes.map((size) => (
          <label key={size} className="flex items-center gap-2">
            <input type="checkbox" />

            <span>{size}</span>
          </label>
        ))}
      </div>
    </FilterSection>
  );
}
