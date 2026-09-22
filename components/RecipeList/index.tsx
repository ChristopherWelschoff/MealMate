import type { Recipe } from "@/types";
import RecipeCard from "../RecipeCard";

type RecipeListProps = {
  recipes?: Recipe[];
  error: boolean;
  isLoading: boolean;
};

export default function RecipeList({
  recipes,
  error,
  isLoading,
}: RecipeListProps) {
  if (isLoading) {
    return <p>Loading recipes...</p>;
  }

  if (error) {
    return <p>Error loading recipes.</p>;
  }

  if (!recipes) {
    return <p>No recipes found.</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      {recipes?.map((recipe) => (
        <RecipeCard key={recipe._id} {...recipe} />
      ))}
    </div>
  );
}
