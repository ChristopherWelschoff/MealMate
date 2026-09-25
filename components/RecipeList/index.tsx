import type { Recipe } from "@/types";
import RecipeCard from "../RecipeCard";
import { SearchBar } from "../SearchBar";
import { useState } from "react";

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
  const [searchTerm, setSearchTerm] = useState<string>("");
  const filteredRecipes = recipes?.filter((recipe) =>
    recipe.title
      .toLocaleLowerCase()
      .trim()
      .includes(searchTerm.toLocaleLowerCase().trim()),
  );

  if (isLoading) {
    return <p>Loading recipes...</p>;
  }

  if (error) {
    return <p>Error loading recipes.</p>;
  }

  return (
    <div className="flex mx-auto w-[95%]  flex-col">
      <SearchBar onSearch={setSearchTerm} searchTerm={searchTerm} />
      {filteredRecipes?.length === 0 ? (
        <p>No recipe found</p>
      ) : (
        <div className="flex flex-col gap-3">
          {filteredRecipes?.map((recipe) => (
            <RecipeCard key={recipe._id} {...recipe} />
          ))}
        </div>
      )}
    </div>
  );
}
