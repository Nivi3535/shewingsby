import FilterSection from "./FilterSection";

export default function PriceFilter() {
  return (
    <FilterSection title="Price">
      <input type="range" min={0} max={5000} className="w-full" />

      <div className="mt-2 flex justify-between text-sm text-gray-500">
        <span>₹0</span>
        <span>₹5000</span>
      </div>
    </FilterSection>
  );
}
