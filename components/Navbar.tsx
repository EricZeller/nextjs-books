"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, User, X } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

interface NavbarProps {
  query: string;
  setQuery: (query: string) => void;
  onSearch: (searchTerm: string) => void;
}

export function Navbar({ query, setQuery, onSearch }: NavbarProps) {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSearch(query);
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md items-center gap-2 mx-auto">

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
                     text-gray-400 hover:text-primary transition-colors"
          >
            <X />
          </button>
        )}
      </div>
      <Button
        type="submit"
        className="bg-primary text-primary-foreground shadow rounded-full min-h-11 min-w-11"
      >
        <Search />
      </Button>
      <Link href="/settings">
        <Avatar className="text-primary min-h-11 min-w-11 shadow">
          <AvatarFallback>
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      </Link>

    </form >
  );
}