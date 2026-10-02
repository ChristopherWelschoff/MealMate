import { Recipe } from "@/types";
import { useRouter } from "next/router";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { categoryColors } from "@/lib/utils";
import Link from "next/link";
import { Leaf, Lock, Pencil, Timer } from "lucide-react";
import DeleteRecipe from "./deleteRecipe";
import FavoriteButton from "@/components/FavoriteButton";
import NutritionInfo from "@/components/NutritionInfo";
import useSWR from "swr";
import { Spinner } from "@/components/StateMessages";
import { useSession } from "next-auth/react";
import Button from "@/components/Button";
import { toast } from "react-toastify";
import { approveRecipe } from "@/lib/approveRecipe";

export default function RecipeDetails() {
  const router = useRouter();
  const { id } = router.query;
  const {
    data: recipe,
    error,
    isLoading,
  } = useSWR<Recipe>(id ? `/api/recipe/${id}` : null);
  const { data: session } = useSession();

  async function handleCustomize() {
    const response = await fetch(`/api/recipe/${id}/copy`, { method: "POST" });

    if (!response.ok) {
      toast.error("Could not create your copy");
      return;
    }

    const data = await response.json();
    toast.success("This recipe is now in your own Recipes ");
    router.push(`/recipes/${data.id}/editRecipe`);
  }

  if (isLoading || !id) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <p className="mt-10 text-center text-muted-foreground">
        Recipe not found.
      </p>
    );
  }

  const isAdmin = session?.user?.isAdmin === true;
  const isOwner = !!session && recipe.owner === session.user?.email;
  const isPrivate = recipe.isPrivate === true;
  const isPending = recipe.isApproved === false;

  const canEdit = isAdmin || (isOwner && (isPrivate || isPending));
  const canApprove = isAdmin && isPending;
  const canCustomize = !!session && !isPrivate;

  return (
    <Card className="mx-auto mb-8 w-[95%] max-w-md gap-0 overflow-hidden rounded-2xl border border-border bg-card p-0 shadow-sm">
      {/* IMAGE */}
      <div className="relative aspect-video">
        <Image
          loading="eager"
          src={recipe.imageUrl || "/assets/placeholder.svg"}
          alt={recipe.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 448px"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
      </div>

      <CardHeader className="gap-4 p-5">
        {/* STATUS */}
        {(isPrivate || isPending) && (
          <div className="flex flex-wrap gap-1.5">
            {isPrivate && (
              <Badge className="rounded-full bg-secondary px-2.5 text-xs text-secondary-foreground">
                <Lock size={12} aria-hidden="true" />
                Your private copy
              </Badge>
            )}
            {isPending && (
              <Badge className="rounded-full bg-amber-50 px-2.5 text-xs text-amber-700">
                Waiting for approval
              </Badge>
            )}
          </div>
        )}

        {/* CATEGORIES + ACTIONS */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {recipe.category.map((category) => (
              <Badge
                key={category._id}
                variant="outline"
                className={`rounded-full border-transparent px-2.5 text-xs ${
                  categoryColors[category.name.toLowerCase()] ??
                  "bg-secondary text-secondary-foreground"
                }`}
              >
                {category.name}
              </Badge>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-3">
            {canEdit && (
              <>
                <Link
                  aria-label="Edit recipe"
                  href={`/recipes/${recipe._id}/editRecipe`}
                  className="rounded-full p-1.5 text-primary transition hover:bg-secondary"
                >
                  <Pencil size={20} />
                </Link>
                <DeleteRecipe
                  redirectTo={
                    isPrivate || isPending ? "/my-recipes" : "/landingPage"
                  }
                />
              </>
            )}
            <FavoriteButton id={recipe._id} />
          </div>
        </div>

        {/* TITLE + CREATOR */}
        <div>
          <CardTitle className="text-3xl font-semibold leading-tight tracking-tight text-foreground">
            {recipe.title}
          </CardTitle>
        </div>

        {/* DESCRIPTION + DURATION */}
        {recipe.description && (
          <p className="text-sm leading-relaxed text-muted-foreground">
            {recipe.description}
          </p>
        )}
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Timer size={16} aria-hidden="true" />
          <span>{recipe.duration} min</span>
        </div>

        <NutritionInfo nutrition={recipe.nutrition} />
        <small className="text-xs text-muted-foreground">
          by {recipe.ownerName || "MealMate"}
        </small>

        {/* ACTION BUTTONS */}
        {(canApprove || canCustomize) && (
          <div className="flex flex-col gap-3">
            {canApprove && (
              <Button
                onClick={() => approveRecipe(recipe._id)}
                className="w-full"
              >
                Approve
              </Button>
            )}
            {canCustomize && (
              <Button
                variant="outline"
                onClick={handleCustomize}
                className="w-full"
              >
                Customize for me
              </Button>
            )}
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-8 px-5 pb-6">
        {/* INGREDIENTS */}
        <section>
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="font-logo text-3xl text-primary">Ingredients</h2>
            <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
              {recipe.ingredients.length} items
            </span>
          </div>

          <ul className="divide-y divide-border/70 rounded-xl border border-border bg-background">
            {recipe.ingredients.map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-3 px-4 py-3 text-sm leading-relaxed text-foreground"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary">
                  <Leaf
                    size={12}
                    aria-hidden="true"
                    className="fill-primary stroke-primary"
                  />
                </span>
                <span className="pt-0.5">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* INSTRUCTIONS */}
        <section>
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="font-logo text-3xl text-primary">Instructions</h2>
            <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
              {recipe.instructions.length} steps
            </span>
          </div>

          <ol className="divide-y divide-border/70 rounded-xl border border-border bg-background">
            {recipe.instructions.map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-3 px-4 py-3 text-sm leading-relaxed text-foreground"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                  {index + 1}
                </span>
                <span className="pt-0.5">{item}</span>
              </li>
            ))}
          </ol>
        </section>
      </CardContent>
    </Card>
  );
}
