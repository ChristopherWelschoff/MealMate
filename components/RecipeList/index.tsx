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
  return (
    <div>
      {recipes?.map((recipe) => (
        <RecipeCard
          key={recipe._id}
          {...recipe}
          error={error}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
}
