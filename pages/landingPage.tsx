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
        <Spinner />;
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
      <h1 className="text-center font-bold text-2xl">Recipes</h1>
      <RecipeList categories={categories} recipes={recipes} />
    </>
  );
}
