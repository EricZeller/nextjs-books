import { useState, useCallback, useRef, useEffect } from "react";
import { Book } from "@/types/book";
import { searchBooks } from "@/services/getBooks";

export function useBookSearch(debounceDelay = 400) {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const getBooks = useCallback(async (searchTerm: string): Promise<void> => {
    if (!searchTerm.trim()) {
      setBooks([]);
      return;
    }

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
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setBooks([]);
      return;
    }

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      getBooks(query);
    }, debounceDelay);

    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [query, getBooks, debounceDelay]);

  return {
    query,
    setQuery,
    books,
    loading,
    error,
    getBooks, 
  };
}
