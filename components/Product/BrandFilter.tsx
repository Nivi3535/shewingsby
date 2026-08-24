import FilterSection from "./FilterSection";

//here replace it with category
const brands = ["Nike", "Puma", "Adidas"];

export default function BrandFilter() {
  return (
    <FilterSection title="Brand">
      <div className="space-y-2">
        {brands.map((brand) => (
          <label key={brand} className="flex items-center gap-2">
            <input type="checkbox" />

            <span>{brand}</span>
          </label>
        ))}
      </div>
    </FilterSection>
  );
}
