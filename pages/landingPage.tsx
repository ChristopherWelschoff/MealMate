import PageHeader from "@/components/PageHeader";
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
      <PageHeader header="Recipes" subheader="Find your next favorite" />
      <RecipeList categories={categories} recipes={recipes} />
    </>
  );
}
