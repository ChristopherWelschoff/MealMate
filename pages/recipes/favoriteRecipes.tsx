import PageHeader from "@/components/PageHeader";
import RecipeList from "@/components/RecipeList";
import useFavorites from "@/hooks/useFavorites";
import { Category, Recipe } from "@/types";
import { Heart } from "lucide-react";
import Link from "next/link";

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

  const hasNoFavorites = !isLoading && !error && favoriteRecipes?.length === 0;

  return (
    <>
      <PageHeader header="Favorites" subheader="Your saved recipes" />

      {hasNoFavorites ? (
        <div className="flex min-h-[50vh] flex-col items-center justify-center px-6 text-center">
          <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-secondary">
            <Heart size={40} strokeWidth={1.5} className="stroke-primary" />
          </div>

          <h2 className="font-logo text-3xl text-primary">No favorites yet</h2>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">
            Tap the heart on any recipe to save it here.
          </p>

          <Link
            href="/landingPage"
            className="mt-6 rounded-full bg-primary px-6 py-3 text-sm font-medium uppercase tracking-[0.15em] text-primary-foreground shadow-md transition hover:bg-primary/90"
          >
            Find recipes
          </Link>
        </div>
      ) : (
        <RecipeList categories={categories} recipes={favoriteRecipes} />
      )}
    </>
  );
}
