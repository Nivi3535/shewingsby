"use client";
import {
  createContext,
  ReactNode,
  useState,
  useContext,
  useMemo,
  useCallback,
} from "react";

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
  // memoized so consumers only re-render when selectedFilters actually changes
  const value = useMemo(
    () => ({ selectedFilters, setSelectedFilters }),
    [selectedFilters],
  );
  return (
    <FilterContext.Provider value={value}>
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

  const selectedFilterValue = useCallback(
    (Filtervalues: string) => {
      setSelectedFilters((prev) => {
        const current = prev[filterKey] ?? [];
        const next = current.includes(Filtervalues)
          ? current.filter((value) => value !== Filtervalues)
          : [...current, Filtervalues];
        return { ...prev, [filterKey]: next };
      });
    },
    [filterKey, setSelectedFilters],
  );

  return { selectedFilterValue, selectedFiltersKey };
};
//just for my learning i used filtercontext
export { FilterContext };
export default FilterProvider;
