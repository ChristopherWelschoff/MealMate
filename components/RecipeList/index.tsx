import type { Category, Recipe } from "@/types";
import RecipeCard from "../RecipeCard";
import FilterCarousel from "../FilterCarousel";
import { SearchBar } from "../SearchBar";
import { useState } from "react";

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
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterTerm, setFilterTerm] = useState<string>("");

  const filteredRecipes = recipes?.filter((recipe) => {
    const matchesSearch = recipe.title
      .toLocaleLowerCase()
      .trim()
      .includes(searchTerm.toLocaleLowerCase().trim());
    const matchesCategory =
      filterTerm === "" ||
      recipe.category.some((category) => category.name === filterTerm);

    return matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return <p>Loading recipes...</p>;
  }

  if (error) {
    return <p>Error loading recipes.</p>;
  }

  return (
    <>
      <div className="flex mx-auto w-[95%]  flex-col">
        <SearchBar onSearch={setSearchTerm} searchTerm={searchTerm} />
        <FilterCarousel filterTerm={filterTerm} onFilter={setFilterTerm} categories={categories} />
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
    </>
  );
}
