import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronRightCircle } from "lucide-react";
import { Book } from "@/types/book";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  return (
    <Card className="flex flex-col justify-between hover:shadow-md transition-shadow">
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
          {book.description || book.publisher || "Unbekannter Verlag"}
        </p>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center">
        <span className="text-xs text-muted-foreground">
          {book.pages ? `${book.pages} Seiten` : ""}
        </span>
        <Link href={`/details/${book.id}`}>
          <Button size="sm">
            Details
            <ChevronRightCircle className="ml-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}