import { Recipe } from "@/types";
import { useRouter } from "next/router";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { categoryColors } from "@/lib/utils";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { Timer } from "lucide-react";

export default function RecipeDetails({ recipes }: { recipes: Recipe[] }) {
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
          src="/assets/placeholder.jpg"
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
              className={`border-gray-300 font-medium ${categoryColors[category.name.toLowerCase()] ?? "bg-gray-100 text-gray-900"}`}
            >
              {category.name}
            </Badge>
          ))}
          <div className="mt-8">
            <Link href={`/recipes/${recipe._id}/editRecipe`}>
              <Pencil
                size={24}
                className="stroke-gray-500 hover:fill-green-900 hover:stroke-black"
              />
            </Link>
          </div>
        </CardAction>

        <CardTitle className="text-3xl font-bold tracking-tight text-gray-900">
          {recipe.title}
        </CardTitle>
        <CardDescription className="text-base leading-relaxed tracking-wide text-gray-600">
          <div className="flex flex-col">
            {recipe.description}
            <div className="flex mt-3">
              <Timer size={16} className="mt-0.75" />
              <span>{recipe.duration} min</span>
            </div>
          </div>
        </CardDescription>

        {/* INGREDIENTS */}
        <div className="mt-6 space-y-8">
          <section>
            <h2 className="mb-3 text-xl font-semibold tracking-tight text-gray-900">
              Ingredients:
            </h2>
            <ul className="space-y-2">
              {recipe.ingredients.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 rounded-md px-2 py-1 text-sm leading-relaxed text-gray-700 transition-colors hover:bg-gray-50"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-bg-button" />
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
                  className="flex items-start gap-4 rounded-lg border border-gray-200 bg-gray-50/50 p-4 text-sm leading-relaxed text-gray-700 shadow-sm transition-all duration-200 hover:border-gray-300 hover:bg-white hover:shadow-md"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-white shadow-sm">
                    {index + 1}
                  </span>
                  <span className="-mt-1 leading-6 tracking-wide">{item}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </CardHeader>
    </Card>
  );
}
