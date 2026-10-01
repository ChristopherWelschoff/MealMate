import type { Recipe } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Timer } from "lucide-react";
import { categoryColors } from "@/lib/utils";
import Link from "next/link";
import FavoriteButton from "../FavoriteButton";
import NutritionInfo from "../NutritionInfo";

export default function RecipeCard({ ...recipe }: Recipe) {
  return (
    <Link
      href={`/recipes/${recipe._id}`}
      className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Card
        size="sm"
        className="mx-auto grid w-full grid-cols-5 overflow-hidden rounded-2xl border border-border bg-card p-0 shadow-sm transition group-hover:-translate-y-0.5 group-hover:shadow-md"
      >
        <div className="relative col-span-2 min-h-40">
          <Image
            loading="eager"
            src={recipe.imageUrl || "/assets/placeholder.svg"}
            alt={recipe.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 40vw, 300px"
          />
        </div>

        <CardHeader className="col-span-3 flex flex-col items-start gap-3 p-3">
          <div className="flex w-full items-start justify-between gap-2">
            <CardTitle className="text-lg font-semibold leading-tight text-foreground">
              {recipe.title}
            </CardTitle>
            <div className="-mr-1 -mt-1 shrink-0">
              <FavoriteButton id={recipe._id} />
            </div>
          </div>
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
          <NutritionInfo nutrition={recipe.nutrition} />
          <div className="mt-auto flex items-center gap-1.5 text-xs text-muted-foreground">
            <Timer size={14} aria-hidden="true" />
            <span>{recipe.duration} min</span>
          </div>{" "}
          <small className="text-xs text-muted-foreground">
            by {recipe.ownerName || "MealMate"}
          </small>
        </CardHeader>
      </Card>
    </Link>
  );
}
