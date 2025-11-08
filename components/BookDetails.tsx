"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book } from "@/types/book";
import { BackLink } from "./BackLink";
import { useState } from "react";
import { LoadingSpinner } from "./Loading";

interface BookDetailsProps {
    book: Book;
}

export function BookDetails({ book }: BookDetailsProps) {
    const [imgLoaded, setImgLoaded] = useState(false);
    return (
        <div className="max-w-4xl mx-auto">
            <BackLink/>
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl">{book.title}</CardTitle>
                    <p className="text-xl text-muted-foreground">{book.author}</p>
                </CardHeader>

                <CardContent className="grid md:grid-cols-3 gap-8">
                    {/* Buchcover */}
                    <div className="md:col-span-1">
                        <div className="relative w-64 h-96 mx-auto rounded-md overflow-hidden shadow-lg">
                            {!imgLoaded && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <LoadingSpinner />
                                </div>
                            )}
                            <Image
                                src={book.cover}
                                alt={book.title}
                                fill
                                className={`object-cover transition-opacity duration-300 ${imgLoaded ? "opacity-100" : "opacity-0"
                                    }`}
                                onLoadingComplete={() => setImgLoaded(true)}
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