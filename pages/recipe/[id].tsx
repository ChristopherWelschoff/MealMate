import { Recipe } from "@/types";
import { useRouter } from "next/router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { categoryColors } from "@/lib/utils";
import Link from "next/link";

export default function RecipeDetails({ recipes }: { recipes: Recipe[] }) {
  const router = useRouter();
  const { id } = router.query;

  const recipe = recipes?.find((recipe) => recipe._id === id);

  if (!recipe) {
    return <p>Recipe not found.</p>;
  }

  return (
    <Card className="relative mx-auto w-[95%] max-w-sm pt-0">
      <div className="relative aspect-video">
        <div className="absolute inset-0 z-30 bg-black/35" />

        <Image
          loading="eager"
          src="/assets/placeholder.jpg"
          alt={recipe.title}
          fill
          className="z-20 object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>

      <CardHeader>
        <CardAction className="flex flex-wrap gap-2">
          {recipe.category.map((category) => (
            <Badge
              key={category._id}
              variant="outline"
              className={`border-gray-300 ${categoryColors[category.name.toLowerCase()] ?? "bg-gray-100 text-gray-900"}`}
            >
              {category.name}
            </Badge>
          ))}
        </CardAction>
        <CardTitle className="text-3xl font-bold tracking-tight">
          {recipe.title}
        </CardTitle>
        <CardDescription className="text-base leading-relaxed text-muted-foreground">
          {recipe.description}
        </CardDescription>
        {/* INGREDIENTS */}
        <div className="mt-6 space-y-8">
          <section>
            <h2 className="mb-3 text-xl font-semibold"> Ingredients </h2>
            <ul className="space-y-2">
              {recipe.ingredients.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-sm leading-relaxed text-gray-700"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-bg-button" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* INSTRUCTIONS */}

          <section>
            <h2 className="mb-4 text-xl font-semibold"> Instructions </h2>
            <ol className="space-y-4">
              {recipe.instructions.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-4 text-sm leading-relaxed text-gray-700"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-bg-button text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <span className="pt-0.5">{item}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>{" "}
      </CardHeader>

      <CardFooter>
        <Link className="w-full" href="../landingPage">
          <Button className="w-full bg-accent">Back</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
