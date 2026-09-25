import type { Category, Recipe } from "@/types";
import RecipeCard from "../RecipeCard";
import FilterCaoursel from "../FilterCarousel";

type RecipeListProps = {
  recipes?: Recipe[];
  error: boolean;
  isLoading: boolean;
  categories: Category[];
};

export default function RecipeList({
  recipes,
  error,
  isLoading,
  categories,
}: RecipeListProps) {

  function handleFilter(name: string) {


  }
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
    <>
      <FilterCaoursel onFilter={handleFilter} categories={categories} />
      <div className="flex flex-col gap-3">
        {recipes?.map((recipe) => (
          <RecipeCard key={recipe._id} {...recipe} />
        ))}
      </div>
    </>
  );
}
