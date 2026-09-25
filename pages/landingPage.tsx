import RecipeList from "@/components/RecipeList";
import type { Category, Recipe } from "@/types";

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
    return <p>Loading Recipes...</p>;
  }

  if (error) {
    return <p>Error Loading Recipes</p>;
  }

  if (!recipes) {
    return <p>No Recipes Found</p>;
  }

  return (
    <RecipeList
      categories={categories}
      error={error}
      isLoading={isLoading}
      recipes={recipes}
    />
  );
}
