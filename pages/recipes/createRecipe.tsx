import { mutate } from "swr";
import { useRouter } from "next/router";
import RecipeForm from "@/components/Form";
import type { Category } from "@/types";
import { toast } from "react-toastify";

export default function CreateRecipe({
  categories,
}: {
  categories: Category[];
}) {
  const router = useRouter();

  async function handleCreate(formData: FormData) {
    const response = await fetch("/api/recipes", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      toast.error("Something went wrong");
      return;
    }

    await mutate("/api/recipes");
    await router.push("/landingPage");
    toast.success("Your recipe was successfully created");
  }

  return (
    <>
      <div className="mb-4 text-center">
        <h1 className="font-logo text-4xl text-primary">New Recipe</h1>
        <p className="mt-1 text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Share your favorite dish
        </p>
      </div>

      <RecipeForm onSubmit={handleCreate} categories={categories} />
    </>
  );
}
