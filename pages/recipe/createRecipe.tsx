import RecipeForm from "@/components/Form";
import { Category } from "@/types";

export default function CreateRecipe({
  categories,
}: {
  categories: Category[];
}) {
  return <RecipeForm categories={categories} />;
}
