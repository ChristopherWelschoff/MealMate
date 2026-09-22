import type { RecipeFormData } from "@/components/Form";
import { mutate } from "swr";
import { useRouter } from "next/router";
import RecipeForm from "@/components/Form";
import { Category } from "@/types";

export default function CreateRecipe({
  categories,
}: {
  categories: Category[];
}) {
  const router = useRouter();

  async function handleCreate(data: RecipeFormData) {
    const response = await fetch("/api/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      await mutate("/api/recipes");
      router.push("/");
    }
  }

  return <RecipeForm onSubmit={handleCreate} categories={categories} />;
}
