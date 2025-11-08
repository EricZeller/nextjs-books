"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useBookSearch } from "@/hooks/useBookSearch";
import { BookGrid } from "@/components/BookGrid";
import { LoadingSpinner } from "@/components/Loading";

export default function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const { books, loading, getBooks } = useBookSearch();

  useEffect(() => {
    if (query) getBooks(query);
  }, [query, getBooks]);

  return (
    <main className="mt-6">
      {loading && <LoadingSpinner />}
      {!loading && books.length > 0 && <BookGrid books={books} />}
      {!loading && books.length === 0 && query && (
        <div className="text-center mt-8 text-muted-foreground">
          Keine Bücher gefunden
        </div>
      )}
    </main>
  );
}
