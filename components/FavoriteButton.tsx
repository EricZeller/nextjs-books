import { addFavorite, removeFavorite } from "@/lib/favorites";
import { useState } from "react";
import { Heart, HeartOff } from "lucide-react";
import { Button } from "./ui/button";

interface FavoriteButtonProps {
  isbn: string;
  isInitiallyFavorite: boolean;
}

export function FavoriteButton({ isbn, isInitiallyFavorite }: FavoriteButtonProps) {
    const [isFav, setIsFav] = useState(isInitiallyFavorite);

    async function toggleFavorite() {
        if (isFav) {
            await removeFavorite(isbn);
            setIsFav(false);
        } else {
            await addFavorite(isbn);
            setIsFav(true);
        }
    }

    return (
        <Button className="min-h-11 min-w-11" variant={"ghost"} onClick={toggleFavorite}>
            {isFav ? <Heart className="text-red-800" /> : <HeartOff />}
        </Button>
    );
}
