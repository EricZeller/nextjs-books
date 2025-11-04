"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { Input } from "@/components/ui/input"


import { Search, X, ChevronRightCircle } from "lucide-react"
import { ModeToggle } from "@/components/ui/mode-toggle";

type Book = {
  isbn_13: number,
  isbn_10: number,
  title: string,
  id: string,
  author: string,
  publisher: string,
  pubDate: Date,
  description: string,
  pages: number,
  cover: string
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  async function getBooks(searchTerm: string): Promise<void> {
    if (!searchTerm.trim()) return;
    setLoading(true);

    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
        searchTerm
      )}&orderBy=relevance&maxResults=12`
    );

    const data = await res.json();

    const results =
      data.items?.map((item: any) => ({
        id: item.id,
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors?.[0] || "Unbekannt",
        publisher: item.volumeInfo.publisher,
        pubDate: item.volumeInfo.publishedDate,
        description: item.volumeInfo.description,
        pages: item.volumeInfo.pageCount,
        cover:
          item.volumeInfo.imageLinks?.thumbnail ||
          item.volumeInfo.imageLinks?.smallThumbnail ||
          "/book-fallback.png"
      })) || []
    setBooks(results);
    setLoading(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    getBooks(query);
  }

  return (
    <main>
      <form onSubmit={handleSubmit} className="flex w-full max-w-md items-center gap-2 mx-auto">
        <ModeToggle/>

        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Büchersuche"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="rounded-full shadow min-h-11 pr-10"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 
                   text-gray-400 hover:text-primary 0 transition-colors"
            >
              <X />
            </button>
          )}
        </div>
        <Button
          onClick={handleSubmit}
          type="submit"
          className="bg-primary text-primary-foreground shadow rounded-full min-h-11 min-w-11">
          <Search />
        </Button>
      </form>
      {
        loading &&
        <div className="flex items-center justify-center gap-2 mt-4">
          <Spinner className="text-primary size-5" />
          <p>Suche läuft...</p>
        </div>
      }
      <div className="grid md:grid-cols-4 gap-4 mt-6">
        {books.map((book) => (
          <Card key={book.id} className="flex flex-col justify-between hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row justify-between items-start gap-4">
              <div className="flex flex-col flex-1">
                <CardTitle className="line-clamp-2">{book.title}</CardTitle>
                <CardDescription>{book.author}</CardDescription>
                <p className="text-sm text-muted-foreground mt-1">
                  {book.publisher || "Unbekannter Verlag"}
                </p>
              </div>

              <div className="relative w-20 h-30 shrink-0 rounded-sm overflow-hidden">
                <Image
                  src={book.cover}
                  alt={book.title}
                  fill
                  className="object-cover"
                />
              </div>
            </CardHeader>

            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {book.publisher || "Unbekannter Verlag"}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">
                {book.pages ? `${book.pages} Seiten` : ""}
              </span>
              <Button size="sm">
                Zum Buch 
                <ChevronRightCircle/>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
