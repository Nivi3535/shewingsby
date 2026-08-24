import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";
import SizeFilter from "./SizeFilter";
import ColorFilter from "./ColorFilter";
import BrandFilter from "./BrandFilter";

//./filters/SizeFilter" after checking change the folder to filter

export default function ProductFilter() {
  return (
    <aside className="w-72 shrink-0 rounded-lg border bg-white p-5">
      <h2 className="mb-6 text-xl font-semibold">Filters</h2>

      <div className="space-y-6">
        <CategoryFilter />
        <PriceFilter />
        <SizeFilter />
        <ColorFilter />
        <BrandFilter />
      </div>
    </aside>
  );
}
