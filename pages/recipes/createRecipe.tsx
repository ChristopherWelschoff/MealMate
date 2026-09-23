import type { RecipeFormData } from "@/components/Form";
import { mutate } from "swr";
import { useRouter } from "next/router";
import RecipeForm from "@/components/Form";
import { Category } from "@/types";
import { toast } from "react-toastify";

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

    if (!response.ok) {
      toast.error("Something went wrong");
      return;
    }

    await mutate("/api/recipes");
    await router.push("/landingPage");
    toast.success("Your recipe was successfully created");
  }

  return <RecipeForm onSubmit={handleCreate} categories={categories} />;
}
