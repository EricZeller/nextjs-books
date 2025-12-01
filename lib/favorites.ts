import { supabase } from "@/lib/supabase/client";

export async function addFavorite(isbn: string) {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;

    if (!user) return { error: "Nicht eingeloggt" };

    const { error } = await supabase.from("favorites").insert({
        user_id: user.id,
        isbn,
    });

    return { error };
}


export async function removeFavorite(isbn: string) {
  const { data: userData } = await supabase.auth.getUser();
  const user = userData?.user;

  if (!user) return { error: "Nicht eingeloggt" };

  const { error } = await supabase
    .from("favorites")
    .delete()
    .match({ user_id: user.id, isbn });

  return { error };
}

export async function getFavorites() {
  const { data: userData } = await supabase.auth.getUser();
  const user = userData?.user;

  if (!user) return [];

  const { data, error } = await supabase
    .from("favorites")
    .select("isbn")
    .eq("user_id", user.id);

  if (error) return [];

  return data.map((f) => f.isbn);
}

