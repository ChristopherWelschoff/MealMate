import type { Category, Recipe } from "@/types";
import RecipeCard from "../RecipeCard";
import FilterCarousel from "../FilterCarousel";
import { SearchBar } from "../SearchBar";
import { useState } from "react";
import { SearchX } from "lucide-react";

type RecipeListProps = {
  recipes?: Recipe[];

  categories: Category[];
};

export default function RecipeList({ recipes, categories }: RecipeListProps) {
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

  return (
    <>
      <div className="flex mx-auto w-[95%]  flex-col">
        <SearchBar onSearch={setSearchTerm} searchTerm={searchTerm} />
        <FilterCarousel
          filterTerm={filterTerm}
          onFilter={setFilterTerm}
          categories={categories}
        />
        {filteredRecipes?.length === 0 ? (
          <div className="flex min-h-[40vh] flex-col items-center justify-center px-6 text-center">
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
              <SearchX
                size={34}
                strokeWidth={1.5}
                className="text-primary"
                aria-hidden="true"
              />
            </div>

            <h2 className="font-logo text-3xl text-primary">
              No recipes found
            </h2>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">
              Try another search term or category.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setFilterTerm("");
              }}
              className="mt-6 rounded-full border border-primary px-6 py-2.5 text-sm font-medium uppercase tracking-[0.15em] text-primary transition hover:bg-secondary"
            >
              Clear filters
            </button>
          </div>
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
