import { Recipe } from "@/types";
import { useRouter } from "next/router";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { categoryColors } from "@/lib/utils";
import Link from "next/link";
import { Pencil, Timer } from "lucide-react";
import DeleteRecipe from "./deleteRecipe";
import FavoriteButton from "@/components/FavoriteButton";
import NutritionInfo from "@/components/NutritionInfo";
import { Leaf } from "lucide-react";

type RecipeDetailsProps = {
  recipes: Recipe[];
};

export default function RecipeDetails({ recipes }: RecipeDetailsProps) {
  const router = useRouter();
  const { id } = router.query;
  const recipe = recipes?.find((recipe) => recipe._id === id);

  if (!recipe) {
    return (
      <p className="mt-10 text-center text-muted-foreground">
        Recipe not found.
      </p>
    );
  }

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
            <Link
              aria-label="Edit recipe"
              href={`/recipes/${recipe._id}/editRecipe`}
              className="rounded-full p-1.5 text-primary transition hover:bg-secondary"
            >
              <Pencil size={20} />
            </Link>
            <DeleteRecipe />
            <FavoriteButton id={recipe._id} />
          </div>
        </div>

        {/* TITLE */}
        <CardTitle className="text-3xl font-semibold leading-tight tracking-tight text-foreground">
          {recipe.title}
        </CardTitle>

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
