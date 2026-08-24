"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";

interface Item {
  id: number;
  title: string;
  // add other fields present in your API response
}
export function InfiniteList() {
  const [items, setItems] = useState<Item[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observerTarget = useRef(null);

  // Simulated API call
  const loadMoreItems = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    // Replace with your API endpoint (e.g., fetch(`/api/items?page=${page}`))
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`,
    );
    const newData = await response.json();

    if (newData.length === 0) {
      setHasMore(false);
    } else {
      setItems((prev) => [...prev, ...newData]);
      setPage((prev) => prev + 1);
    }
    setLoading(false);
  }, [page, loading, hasMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreItems();
        }
      },
      { threshold: 1.0 }, // Triggers when the target element is 100% visible
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [loadMoreItems, hasMore]);

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <ul>
        {items.map((item) => (
          // ✅ Pass a unique primitive property like string or number
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>

      {/* Invisible trigger element */}
      <div ref={observerTarget} style={{ height: "40px", margin: "20px 0" }}>
        {loading && <p>Loading more items...</p>}
        {!hasMore && <p>No more data to load.</p>}
      </div>
    </div>
  );
}
