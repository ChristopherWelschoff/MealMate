import type { RecipeFormData } from "@/components/Form";
import { mutate } from "swr";
import { useRouter } from "next/router";
import RecipeForm from "@/components/Form";
import { Category } from "@/types";
import { toast } from "react-toastify";
import useSWR from "swr";
import type { Recipe } from "@/types";

export default function UpdateRecipe({
  categories,
}: {
  categories: Category[];
}) {
  const router = useRouter();
  const { id } = router.query;
  const { data: recipe } = useSWR<Recipe>( id? `/api/recipe/${id}`: null);

  async function handleUpdate(data: RecipeFormData) {
    const response = await fetch(`/api/recipe/${id}`, {
      method: "PUT",
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
    await mutate(`/api/recipe/${id}`);
    await router.push(`/recipes/${id}`);
    toast.success("Your recipe was successfully updated");
  }

  return (
    <RecipeForm
      key={recipe?._id}
      recipe={recipe}
      onSubmit={handleUpdate}
      categories={categories}
    />
  );
}
