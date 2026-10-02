import { mutate } from "swr";
import { toast } from "react-toastify";

export async function approveRecipe(id: string) {
  const response = await fetch(`/api/recipe/${id}`, { method: "PATCH" });

  if (!response.ok) {
    toast.error("Could not approve recipe");
    return;
  }

  await mutate(`/api/recipe/${id}`);
  await mutate("/api/recipes");
  await mutate("/api/admin/pending");
  toast.success("Recipe approved");
}
