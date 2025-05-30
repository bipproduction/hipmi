/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

// Tipe untuk data item (sesuaikan sesuai API kamu)
interface Item {
  id: number;
  name: string;
}

// Props komponen
interface InfiniteScrollProps<T> {
  fetchFunction: (page: number) => Promise<T[]>;
  renderItem: (item: T) => React.ReactNode;
  itemsPerPage?: number;
  threshold?: number; // Jarak dari bawah halaman untuk memicu load
}

const InfiniteScroll = <T,>({
  fetchFunction,
  renderItem,
  itemsPerPage = 10,
  threshold = 50,
}: InfiniteScrollProps<T>) => {
  const [items, setItems] = useState<T[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  // Load data awal
  useEffect(() => {
    const loadInitialData = async () => {
      const data = await fetchFunction(page);
      if (data.length === 0) setHasMore(false);
      setItems(data);
    };

    loadInitialData();
  }, [fetchFunction, page]);

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      const isBottom =
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - threshold;

      if (isBottom && hasMore) {
        loadMoreItems();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, threshold]);

  const loadMoreItems = async () => {
    const nextPage = page + 1;
    const newItems = await fetchFunction(nextPage);

    if (newItems.length === 0) {
      setHasMore(false);
    }

    setItems((prev) => [...prev, ...newItems]);
    setPage(nextPage);
  };

  return (
    <div >
      <ul>
        {items.map((item, index) => (
          <li key={index}>{renderItem(item)}</li>
        ))}
      </ul>
      {!hasMore && <p>🎉 Semua data telah dimuat.</p>}
    </div>
  );
};

export default InfiniteScroll;
