import type { Recipe } from "@/types";
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

type RecipeCardProps = Recipe & {
  error: boolean;
  isLoading: boolean;
};

export default function RecipeCard({
  isLoading,
  error,
  ...recipe
}: RecipeCardProps) {
  if (isLoading) {
    return <p>Loading Recipes...</p>;
  }

  if (error) {
    return <p>Error Loading Recipes</p>;
  }

  console.log(recipe);

  return (
    <Card className="relative mx-auto w-full max-w-sm overflow-hidden pt-0">
      <div className="relative aspect-video">
        <Image
          src={recipe.imageUrl || "/assets/placeholder.jpg"}
          alt={recipe.title}
          fill
          className="object-cover"
        />
      </div>

      <CardHeader>
        <CardAction>
          <Badge variant="secondary">{recipe.category.name}</Badge>
        </CardAction>

        <CardTitle>{recipe.title}</CardTitle>

        <CardDescription>{recipe.description}</CardDescription>

        <CardDescription>
          Zubereitungszeit: {recipe.duration} Minuten
        </CardDescription>
      </CardHeader>

      <CardFooter>
        <Button className="w-full">View Recipe</Button>
      </CardFooter>
    </Card>
  );
}
