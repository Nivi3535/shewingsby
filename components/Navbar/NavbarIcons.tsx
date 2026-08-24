"use client";
import Link from "next/link";

import { useSession } from "next-auth/react";
import {
  FaUser,
  FaHeart,
  FaShoppingBag,
  FaSearch,
  FaSignInAlt,
  FaSignOutAlt,
  FaUserShield,
  FaFemale,
} from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
//import { useSearch } from "@/hooks/useSearch";
import { useState } from "react";
//const { search } = useSearch();

import useSWR from "swr";
import { useDebounce } from "@/hooks/useSearch";
import product from "@/types/Product";
import { useRouter } from "next/navigation";

//import { Product } from "@/lib/generated/prisma/browser";

export default function NavbarIcons() {
  const router = useRouter();
  //using router.push its firing to router api page also next.js slug too
  //check how to fix this
  const { data: session } = useSession();
  const [query, setQuery] = useState("");

  const debouncedQuery = useDebounce(query, 300);

  const fetcher = (url: string): Promise<product[]> =>
    fetch(url).then((r) => r.json());

  // /product/search?searchStr=${encodeURIComponent(debouncedQuery)}
  //this will just load search autocomplete
  const { data: results, isLoading } = useSWR(
    debouncedQuery.length > 2
      ? `/api/product/search?searchStr=${encodeURIComponent(debouncedQuery)}`
      : null,
    fetcher,
  );

  //app/slug for individual product page
  const handleSelect = (p: product) => {
    console.log("Clicked", p.name);

    // Navigate using product slug (same [...slug] route handles both categories and products)
    router.push(`/${p.slug}`);
  };

  //app/search/serverpage for general search result page dont give individual
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim()) {
      // Navigate to search results page
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setQuery("");
    }
  };
  // const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  //setQuery(e.target.value);
  //ways to do adding to url query string  using searchparara and pathname and router
  //or do customhook then take the value and pass to api route and return the data and
  // display in the page also simply aadd the value to url query string and
  //do server page without api call but do direct prisma quwery but i will do clickin other things
  //in the helper add prisma query to search the product table and return the data
  //will try 2
  // if (e.target.value.length > 3) {
  //  const _searchdata = search(e.target.value);
  //console.log(_searchdata);
  //}
  //};

  return (
    <div className="flex items-center gap-5 text-xl w-3xl">
      <div className="relative w-64">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" />

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search products..."
          className="w-full rounded-md border py-2 pl-10 pr-3"
        />

        {/* Results Dropdown */}
        {(isLoading || (results && results.length > 0)) && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
            {isLoading && (
              <div className="p-3 text-center text-gray-500 text-sm">
                Searching...
              </div>
            )}

            {!isLoading && results?.length === 0 && (
              <div className="p-3 text-center text-gray-500 text-sm">
                No products found
              </div>
            )}

            {results?.map((p) => (
              <div
                key={p.id}
                onClick={() => handleSelect(p)}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer border-b last:border-b-0 text-sm"
              >
                <div className="font-medium text-gray-900">{p.name}</div>
                <div className="text-xs text-gray-500">₹{p.price}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {session ? (
        <Link href="/auth/logout">
          <FaSignOutAlt className="cursor-pointer" />
        </Link>
      ) : (
        <Link href="/auth/login">
          <FaFemale className="cursor-pointer" />
        </Link>
      )}

      {session?.user?.role === "ADMIN" && (
        <Link href="/admin">
          <FaUserShield className="cursor-pointer" />
        </Link>
      )}

      {/* <Link href="/admin">
        <FaUserShield className="cursor-pointer" />
      </Link> */}
      <FaHeart />
      <FaShoppingBag />
    </div>
  );
}
