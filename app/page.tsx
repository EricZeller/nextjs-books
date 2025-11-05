"use client";

import { Navbar } from "@/components/Navbar";
import { BookGrid } from "@/components/BookGrid";
import { LoadingSpinner } from "@/components/Loading";
import { useBookSearch } from "@/hooks/useBookSearch";

export default function Home() {
  const { query, setQuery, books, loading, getBooks } = useBookSearch();

  return (
    <main className="container mx-auto p-4">
      <Navbar
        query={query}
        setQuery={setQuery}
        onSearch={getBooks}
      />
      
      {loading && <LoadingSpinner />}
      
      <BookGrid books={books} />
      
      {!loading && books.length === 0 && query && (
        <div className="text-center mt-8 text-muted-foreground">
          Keine Bücher gefunden
        </div>
      )}
    </main>
  );
}