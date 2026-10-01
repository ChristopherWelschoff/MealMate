import { Spinner } from "@/components/StateMessages";
import { useSession, signIn, signOut } from "next-auth/react";
import Button, { ButtonLink } from "@/components/Button";
import type { Recipe } from "@/types";
import useSWR from "swr";
import RecipeCard from "@/components/RecipeCard";

export default function ProfilePage() {
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
        <h2 className="font-logo text-3xl text-primary">
          You are not logged in
        </h2>
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
    <div className="flex min-h-[80vh] flex-col px-4">
      <div className="mb-4 text-center">
        <h1 className="font-logo text-4xl text-primary">
          {session.user?.name}
        </h1>
        <p className="mt-1 text-xs uppercase tracking-[0.25em] text-muted-foreground">
          {session.user?.email}
        </p>
      </div>

      <section className="mx-auto mt-6 w-full max-w-md">
        <h2 className="text-center mb-3 font-logo text-3xl text-primary">
          My recipes
        </h2>

        {myRecipes?.length === 0 && (
          <p className="text-sm text-muted-foreground">
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

      <div className="mx-auto mt-3 flex w-full max-w-xs flex-col gap-3 pb-6">
        {session.user?.isAdmin && (
          <ButtonLink href="/admin" variant="outline">
            Admin
          </ButtonLink>
        )}
        <Button variant="primary" onClick={() => signOut()}>
          Logout
        </Button>
      </div>
    </div>
  );
}
