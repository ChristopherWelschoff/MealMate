import PageHeader from "@/components/PageHeader";
import { mutate } from "swr";
import { useRouter } from "next/router";
import RecipeForm from "@/components/Form";
import type { Category, Recipe } from "@/types";
import { toast } from "react-toastify";
import useSWR from "swr";
import { Spinner } from "@/components/StateMessages";
import { useSession, signIn } from "next-auth/react";

export default function UpdateRecipe({
  categories,
}: {
  categories: Category[];
}) {
  const { data: session, status } = useSession();
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
  if (!recipe) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (status === "unauthenticated" || !session) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center px-6 text-center">
        <h2 className="font-logo text-3xl text-primary">Edit your recipes</h2>
        <p className="mt-2 max-w-xs text-sm text-muted-foreground">
          Sign in to edit your own tasty recipes.
        </p>
        <button
          onClick={() => signIn("google")}
          type="button"
          className="my-5 rounded-full bg-primary px-6 py-3 text-sm font-medium uppercase tracking-[0.15em] text-primary-foreground shadow-md transition hover:bg-primary/90"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <>
      <PageHeader header="Edit Recipe" subheader="Update your dish" />

      <RecipeForm
        onSubmit={handleUpdate}
        categories={categories}
        recipe={recipe}
      />
    </>
  );
}
