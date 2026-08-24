import { createContext, ReactNode, useState, useContext } from "react";

interface FilterContextType {
  selectedFilters: Record<string, string[]>;
  setSelectedFilters: React.Dispatch<
    React.SetStateAction<Record<string, string[]>>
  >;
}
const FilterContext = createContext<FilterContextType | undefined>(undefined);

//this makes it generic "category":[pattu pavadai], "gender": " kids"
//instead of creating state for all the filter Im making it as any type of key and Value
/* type FilterContextType = {
  selectedFilters: Record<string, string[]>;
  setSelectedFilters: React.Dispatch<
    React.SetStateAction<Record<string, string[]>>
  >;
}; */

function FilterProvider({ children }: { children: ReactNode }) {
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});
  return (
    <FilterContext.Provider value={{ selectedFilters, setSelectedFilters }}>
      {children}
    </FilterContext.Provider>
  );
}
export const useFilter = (filterKey: string) => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  const { selectedFilters, setSelectedFilters } = context;

  const selectedFiltersKey = selectedFilters[filterKey] ?? [];
  console.log("selectedFiltersKey", selectedFiltersKey, filterKey);

  const selectedFilterValue = (Filtervalues: string) => {
    setSelectedFilters((prev) => {
      const current = prev[filterKey] ?? [];
      const next = current.includes(Filtervalues)
        ? current.filter((value) => value !== Filtervalues)
        : [...current, Filtervalues];
      return { ...prev, [filterKey]: next };
    });
  };

  return { selectedFilterValue, selectedFiltersKey };
};
//just for my learning i used filtercontext
export { FilterContext };
export default FilterProvider;
