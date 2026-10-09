import PageHeader from "@/components/PageHeader";
import { mutate } from "swr";
import { useRouter } from "next/router";
import RecipeForm from "@/components/Form";
import type { Category } from "@/types";
import { toast } from "react-toastify";
import { useSession, signIn } from "next-auth/react";
import { Spinner } from "@/components/StateMessages";

export default function CreateRecipe({
  categories,
}: {
  categories: Category[];
}) {
  const router = useRouter();
  const { data: session, status } = useSession();

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
    await mutate("/api/my-recipes");
    await router.push("/my-recipes");
    toast.success("Your recipe was submitted and is waiting for approval");
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
        <h2 className="font-logo text-3xl text-primary">Share your recipes</h2>
        <p className="mt-2 max-w-xs text-sm text-muted-foreground">
          Sign in to create your own tasty recipes.
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
      <PageHeader header="New Recipe" subheader="Share your favorite dish" />

      <RecipeForm onSubmit={handleCreate} categories={categories} />
    </>
  );
}
