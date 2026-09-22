import RecipeList from "@/components/RecipeList";
import type { Recipe } from "@/types";

type LandingPageProps = {
  recipes: Recipe[];
  error: boolean;
  isLoading: boolean;
};

export default function LandingPage({
  recipes,
  isLoading,
  error,
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

  return <RecipeList error={error} isLoading={isLoading} recipes={recipes} />;
}
