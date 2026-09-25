import RecipeList from "@/components/RecipeList";
import useFavorites from "@/hooks/useFavorites";
import { Category, Recipe } from "@/types";

type FavoriteRecipesProps = {
  recipes?: Recipe[];
  error: boolean;
  isLoading: boolean;
  categories: Category[];
};

export default function FavoriteRecipes({
  recipes,
  error,
  isLoading,
  categories,
}: FavoriteRecipesProps) {
  const { favoriteIds } = useFavorites();

  const favoriteRecipes = recipes?.filter((recipe) =>
    favoriteIds.includes(recipe._id),
  );

  if (!isLoading && !error && favoriteRecipes?.length === 0) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <p className="text-xl">No favorites yet- go find some tasty ones!</p>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-center font-bold text-2xl">Favorites</h1>
      <RecipeList categories={categories} recipes={favoriteRecipes} />
    </>
  );
}
