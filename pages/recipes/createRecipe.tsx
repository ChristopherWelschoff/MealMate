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
      <h1 className="text-center text-2xl font-bold">Create Recipe</h1>
      <RecipeForm onSubmit={handleCreate} categories={categories} />
    </>
  );
}
