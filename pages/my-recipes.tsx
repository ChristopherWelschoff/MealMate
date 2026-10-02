import PageHeader from "@/components/PageHeader";
import useSWR from "swr";
import RecipeCard from "@/components/RecipeCard";
import type { Recipe } from "@/types";
import { Spinner } from "@/components/StateMessages";
import { useSession, signIn } from "next-auth/react";
import Button, { ButtonLink } from "@/components/Button";
import { Plus } from "lucide-react";

export default function MyRecipes() {
  const { data: session, status } = useSession();
  const { data: myRecipes } = useSWR<Recipe[]>(
    status === "authenticated" ? "/api/my-recipes" : null,
  );

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
        <h2 className="font-logo text-3xl text-primary">Your recipes</h2>
        <p className="mt-2 max-w-xs text-sm text-muted-foreground">
          Sign in to create recipes and save your own versions.
        </p>
        <Button onClick={() => signIn("google")} className="mt-6">
          Login
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center px-4">
      <PageHeader header="My recipes" subheader="Your own recipes" />

      <ButtonLink href="/recipes/createRecipe" className="mb-6 w-full max-w-xs">
        <Plus size={18} aria-hidden="true" />
        New recipe
      </ButtonLink>

      <section className="w-full max-w-md">
        {myRecipes?.length === 0 && (
          <p className="text-center text-sm text-muted-foreground">
            No recipes yet. Create one or customize a recipe you like.
          </p>
        )}

        <ul className="flex flex-col gap-3">
          {myRecipes?.map((recipe) => (
            <li key={recipe._id}>
              <RecipeCard {...recipe} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
