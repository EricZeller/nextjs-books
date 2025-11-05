import { getBookDetails } from "@/services/getBooks";
import { BookDetails } from "@/components/BookDetails";
import { notFound } from "next/navigation";

interface PageProps {
    params: {
        id: string;
    };
}

export default async function DetailPage({ params }: PageProps) {
    const { id } = await params
    const book = await getBookDetails(id);

    if (!book) {
        notFound();
    }

    return (
        <main className="container mx-auto p-4">
            <BookDetails book={book} />
        </main>
    );
}