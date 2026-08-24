import { searchProducts } from "@/lib/Helper/search";
//my version of the search hook
export function useSearch() {
  const search = async (keyword: string) => {
    console.log(keyword, "keyword");
    const timer = setTimeout(async () => {
      const response = await searchProducts(keyword);
      const data = await response.json();
      console.log(data);
      console.log("This message appears after 10 seconds!");
    }, 3000);
    return () => clearTimeout(timer);
    console.log("This message appears immediately!");
    //return data;
  };

  return { search };
}

//GPT version of the search hook
// hooks/useDebounce.ts
import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}
