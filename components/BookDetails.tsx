import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book } from "@/types/book";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface BookDetailsProps {
    book: Book;
}

export function BookDetails({ book }: BookDetailsProps) {
    return (
        <div className="max-w-4xl mx-auto">
            {/* Zurück-Button */}
            <Link href="/" className="inline-flex items-center gap-2 mb-6 text-sm text-muted-foreground hover:text-primary">
                <ArrowLeft className="w-4 h-4" />
                Zurück zur Suche
            </Link>

            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl">{book.title}</CardTitle>
                    <p className="text-xl text-muted-foreground">{book.author}</p>
                </CardHeader>

                <CardContent className="grid md:grid-cols-3 gap-8">
                    {/* Buchcover */}
                    <div className="md:col-span-1">
                        <div className="relative w-64 h-96 mx-auto rounded-md overflow-hidden shadow-lg">
                            <Image
                                src={book.cover}
                                alt={book.title}
                                fill
                                className="object-cover"
                                loading="lazy"
                            />
                        </div>
                    </div>

                    {/* Buchdetails */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Beschreibung */}
                        {book.description && (
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Beschreibung</h3>
                                <div
                                    className="text-muted-foreground leading-relaxed prose"
                                    dangerouslySetInnerHTML={{ __html: book.description }}
                                />
                            </div>
                        )}

                        {/* Metadaten */}
                        <div className="grid grid-cols-2 gap-4">
                            {book.publisher && (
                                <div>
                                    <h4 className="font-medium">Verlag</h4>
                                    <p className="text-muted-foreground">{book.publisher}</p>
                                </div>
                            )}

                            {book.pubDate && (
                                <div>
                                    <h4 className="font-medium">Veröffentlichung</h4>
                                    <p className="text-muted-foreground">
                                        {new Date(book.pubDate).toLocaleDateString('de-DE')}
                                    </p>
                                </div>
                            )}

                            {book.pages && (
                                <div>
                                    <h4 className="font-medium">Seiten</h4>
                                    <p className="text-muted-foreground">{book.pages}</p>
                                </div>
                            )}

                            {book.isbn_13 && (
                                <div>
                                    <h4 className="font-medium">ISBN-13</h4>
                                    <p className="text-muted-foreground">{book.isbn_13}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}