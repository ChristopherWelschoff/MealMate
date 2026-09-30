import { Heart } from "lucide-react";
import useFavorites from "@/hooks/useFavorites";

type FavoriteButtonProps = {
  id: string;
};

export default function FavoriteButton({ id }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();

  const favorite = isFavorite(id);

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    toggleFavorite(id);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      aria-pressed={favorite}
      className="shrink-0 cursor-pointer rounded-full p-1.5 text-primary transition hover:bg-secondary active:scale-90"
    >
      <Heart
        size={20}
        className={`transition-colors ${favorite ? "fill-primary" : "fill-none"}`}
      />
    </button>
  );
}
