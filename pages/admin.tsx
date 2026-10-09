import PageHeader from "@/components/PageHeader";
import useSWR from "swr";
import type { Recipe } from "@/types";
import { Spinner } from "@/components/StateMessages";

import RecipeCard from "@/components/RecipeCard";
import { approveRecipe } from "@/lib/approveRecipe";

export default function AdminPage() {
  const {
    data: pendingRecipes,
    error,
    isLoading,
  } = useSWR<Recipe[]>("/api/admin/pending");

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <p className="mt-10 text-center text-muted-foreground">
        You are not allowed to see this page.
      </p>
    );
  }

  return (
    <div className="mx-auto w-[95%] max-w-md">
      <PageHeader header="Admin" subheader="Pending recipes" />

      <ul className="flex flex-col gap-6">
        {pendingRecipes?.map((recipe) => (
          <li key={recipe._id} className="flex flex-col gap-2">
            <RecipeCard {...recipe} />
            <button
              type="button"
              onClick={() => approveRecipe(recipe._id)}
              className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium uppercase tracking-[0.15em] text-primary-foreground shadow-md transition hover:bg-primary/90"
            >
              Approve
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
