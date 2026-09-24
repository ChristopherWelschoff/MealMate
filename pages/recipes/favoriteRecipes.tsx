import RecipeList from "@/components/RecipeList";
import useFavorites from "@/hooks/useFavorites";
import { Recipe } from "@/types";

type FavoriteRecipesProps = {
  recipes?: Recipe[];
  error: boolean;
  isLoading: boolean;
};

export default function FavoriteRecipes({
  recipes,
  error,
  isLoading,
}: FavoriteRecipesProps) {
  const { favoriteIds } = useFavorites();

  const favoriteRecipes = recipes?.filter((recipe) =>
    favoriteIds.includes(recipe._id),
  );

  if (!isLoading && !error && favoriteRecipes?.length === 0) {
    return <p>No favorites yet – go find some tasty recipes!</p>;
  }

  return (
    <RecipeList recipes={favoriteRecipes} error={error} isLoading={isLoading} />
  );
}
