import { Book } from "@/types/book";

export async function searchBooks(searchTerm: string): Promise<Book[]> {
  if (!searchTerm.trim()) return [];

  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
      searchTerm
    )}&orderBy=relevance&maxResults=12`
  );

  const data = await res.json();

  return data.items?.map((item: any) => ({
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
  })) || [];
}

export async function getBookDetails(id: string): Promise<Book | null> {
  try {
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes/${id}`
    );

    if (!res.ok) return null;

    const data = await res.json();

    return {
      id: data.id,
      title: data.volumeInfo.title,
      author: data.volumeInfo.authors?.[0] || "Unbekannt",
      publisher: data.volumeInfo.publisher,
      pubDate: data.volumeInfo.publishedDate,
      description: data.volumeInfo.description,
      pages: data.volumeInfo.pageCount,
      cover: data.volumeInfo.imageLinks?.medium || data.volumeInfo.imageLinks?.thumbnail || "/book-fallback.png",
      isbn_13: data.volumeInfo.industryIdentifiers?.find((id: any) => id.type === "ISBN_13")?.identifier || 0,
      isbn_10: data.volumeInfo.industryIdentifiers?.find((id: any) => id.type === "ISBN_10")?.identifier || 0
    };
  } catch (error) {
    console.error("Error fetching book details:", error);
    return null;
  }
}