import { Recipe } from "@/types";
import { useRouter } from "next/router";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { categoryColors } from "@/lib/utils";
import Link from "next/link";
import { Pencil, Timer } from "lucide-react";
import DeleteRecipe from "./deleteRecipe";
import FavoriteButton from "@/components/FavoriteButton";
import NutritionInfo from "@/components/NutritionInfo";

type RecipeDetailsProps = {
  recipes: Recipe[];
};

export default function RecipeDetails({ recipes }: RecipeDetailsProps) {
  const router = useRouter();
  const { id } = router.query;
  const recipe = recipes?.find((recipe) => recipe._id === id);

  if (!recipe) {
    return <p>Recipe not found.</p>;
  }

  return (
    <Card className="relative mx-auto w-[95%] max-w-sm overflow-hidden border-gray-200 bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl">
      <div className="relative aspect-video">
        <div className="absolute inset-0 z-30 bg-black/25" />
        <Image
          loading="eager"
          src={recipe.imageUrl || "/assets/placeholder.svg"}
          alt={recipe.title}
          fill
          className="z-20 object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>

      <CardHeader className="space-y-4">
        <CardAction className="flex flex-col flex-wrap gap-2">
          {recipe.category.map((category) => (
            <Badge
              key={category._id}
              variant="outline"
              className={`border-gray-300 font-medium ${
                categoryColors[category.name.toLowerCase()] ??
                "bg-gray-100 text-gray-900"
              }`}
            >
              {category.name}
            </Badge>
          ))}
          <div className="mt-8 flex gap-4">
            <Link
              aria-label="edit-recipe"
              href={`/recipes/${recipe._id}/editRecipe`}
            >
              <Pencil
                size={24}
                className="stroke-green-800 hover:fill-green-900 hover:stroke-black"
              />
            </Link>
            <DeleteRecipe />
            <FavoriteButton id={recipe._id} />
          </div>
        </CardAction>

        <CardTitle className="text-3xl font-bold tracking-tight text-gray-900">
          {recipe.title}
        </CardTitle>
        <NutritionInfo />

        <CardDescription className="text-base leading-relaxed tracking-wide text-gray-600">
          <div className="flex flex-col">
            {recipe.description}
            <div className="mt-3 flex items-center gap-1">
              <Timer size={16} />
              <span>{recipe.duration} min</span>
            </div>
          </div>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-8 pb-6">
        {/* INGREDIENTS */}
        <section>
          <h2 className="mb-3 text-xl font-semibold tracking-tight text-gray-900">
            Ingredients:
          </h2>
          <ul className="space-y-2">
            {recipe.ingredients.map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-3 rounded-md px-2 py-1 text-sm leading-relaxed text-gray-700 transition-colors hover:bg-gray-50"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-bg-button" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* INSTRUCTIONS */}
        <section>
          <h2 className="mb-4 text-xl font-semibold tracking-tight text-gray-900">
            Instructions:
          </h2>
          <ol className="space-y-3">
            {recipe.instructions.map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-4 rounded-lg border border-gray-200 bg-gray-50/50 p-4 text-sm leading-relaxed text-gray-700 shadow-sm transition-all duration-200 hover:border-gray-300 hover:bg-white hover:shadow-md"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-white shadow-sm">
                  {index + 1}
                </span>
                <span className="leading-6 tracking-wide">{item}</span>
              </li>
            ))}
          </ol>
        </section>
      </CardContent>
    </Card>
  );
}
