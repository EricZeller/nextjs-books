"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X, UserRoundX } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export function NavbarContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query") || "";
  const [query, setQuery] = useState(initialQuery);

  const [user, setUser] = useState<User | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [initials, setInitials] = useState<string>("?");

  // Funktion, um User-State zu setzen
  const updateUserState = (u: User | null) => {
    setUser(u);

    if (!u) {
      setAvatarUrl(null);
      setInitials("?");
      return;
    }

    const meta = u.user_metadata;
    const rawUrl =
      meta?.avatar_url ||
      meta?.picture || // Google verwendet meist "picture"
      null;

    // Leerstring verhindern → immer null statt ""
    const cleanUrl = rawUrl && rawUrl.trim() !== "" ? rawUrl : null;
    setAvatarUrl(cleanUrl);

    let name = meta?.full_name || u.email || "";
    let parts = name.trim().split(" ");
    let ini = parts.length >= 2 ? parts[0][0] + parts[1][0] : parts[0]?.[0] || "?";
    setInitials(ini.toUpperCase());
  };

  // useEffect für initialen User + Auth-Listener
  useEffect(() => {
    async function initUser() {
      const { data: { session } } = await supabase.auth.getSession();
      updateUserState(session?.user ?? null);
    }

    initUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      updateUserState(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);


  // Search
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md items-center gap-2 mx-auto p-2 pt-3"
    >
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
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
          >
            <X />
          </button>
        )}
      </div>

      <Button type="submit" className="bg-primary text-primary-foreground shadow rounded-full min-h-11 min-w-11">
        <Search />
      </Button>

      <Link href="/settings">
        <Avatar className="min-h-11 min-w-11 shadow bg-secondary">
          
            <AvatarImage src={avatarUrl||undefined} alt="Avatar" />
          
            <AvatarFallback className="text-primary flex items-center justify-center">
              {user ? (
                initials
              ) : (
                <span className="flex items-center justify-center">
                  <UserRoundX />
                </span>
              )}
            </AvatarFallback>
          
        </Avatar>
      </Link>


    </form>
  );
}

export function Navbar() {
  return (
    <Suspense fallback={<div className="w-full text-center py-2">Laden...</div>}>
      <NavbarContent />
    </Suspense>
  );
}
