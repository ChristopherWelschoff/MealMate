import RecipeList from "@/components/RecipeList";
import type { Category, Recipe } from "@/types";
import { AlertDestructive, Spinner } from "@/components/StateMessages";

type LandingPageProps = {
  recipes: Recipe[];
  error: boolean;
  isLoading: boolean;
  categories: Category[];
};

export default function LandingPage({
  recipes,
  isLoading,
  error,
  categories,
}: LandingPageProps) {
  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <AlertDestructive />
      </div>
    );
  }

  return (
    <>
      <header className="mb-4 mt-2 text-center">
        <h1 className="font-logo text-4xl text-primary">Recipes</h1>
        <p className="mt-1 text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Find your next favorite
        </p>
      </header>
      <RecipeList categories={categories} recipes={recipes} />
    </>
  );
}
