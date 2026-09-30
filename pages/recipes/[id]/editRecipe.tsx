import { mutate } from "swr";
import { useRouter } from "next/router";
import RecipeForm from "@/components/Form";
import type { Category, Recipe } from "@/types";
import { toast } from "react-toastify";
import useSWR from "swr";

export default function UpdateRecipe({
  categories,
}: {
  categories: Category[];
}) {
  const router = useRouter();
  const { id } = router.query;
  const { data: recipe } = useSWR<Recipe>(id ? `/api/recipe/${id}` : null);

  async function handleUpdate(formData: FormData) {
    const response = await fetch(`/api/recipe/${id}`, {
      method: "PUT",
      body: formData,
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
    <>
      <div className="mb-4 text-center">
        <h1 className="font-logo text-4xl text-primary">Edit Recipe</h1>
        <p className="mt-1 text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Update your dish
        </p>
      </div>

      <RecipeForm
        onSubmit={handleUpdate}
        categories={categories}
        recipe={recipe}
      />
    </>
  );
}
