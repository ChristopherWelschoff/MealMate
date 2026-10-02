import useSWR from "swr";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

export default function useFavorites() {
  const { status } = useSession();
  const { data: favoriteIds = [], mutate } = useSWR<string[]>(
    status === "authenticated" ? "/api/favorites" : null,
  );

  function isFavorite(id: string) {
    return favoriteIds.includes(id);
  }

  async function toggleFavorite(id: string) {
    if (status !== "authenticated") {
      toast.error("You are not logged in");
      return;
    }

    const response = await fetch(`/api/favorites/${id}`, {
      method: "POST",
    });

    if (!response.ok) {
      toast.error("Something went wrong");
      return;
    }

    await mutate();
  }

  return { favoriteIds, isFavorite, toggleFavorite };
}
