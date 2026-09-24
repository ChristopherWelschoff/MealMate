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
      className="shrink-0 cursor-pointer"
    >
      <Heart
        className={`stroke-green-800 transition-colors ${
          favorite ? "fill-green-800" : "fill-none hover:fill-green-800/30"
        }`}
      />
    </button>
  );
}
