import { useState } from "react";
import { Book } from "@/types/book";
import { searchBooks } from "@/services/getBooks";

export function useBookSearch() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function getBooks(searchTerm: string): Promise<void> {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    setError(null);

    try {
      const results = await searchBooks(searchTerm);
      setBooks(results);
    } catch (err) {
      setError("Fehler bei der Suche. Bitte versuchen Sie es erneut.");
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  }

  return {
    query,
    setQuery,
    books,
    loading,
    error,
    getBooks,
  };
}