import type { Recipe } from "@/types";

export type RecipeFormData = Omit<
  Recipe,
  "_id" | "createdAt" | "updatedAt" | "category"
>;

type RecipeFormProps = {
  onSubmit: (data: RecipeFormData) => Promise<void>;
};

export default function RecipeForm({ onSubmit }: RecipeFormProps) {
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data: RecipeFormData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      ingredients: formData.getAll("ingredients") as string[],
      instructions: formData.getAll("instructions") as string[],
      duration: Number(formData.get("duration")),
    };

    try {
      await onSubmit(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-[95%] max-w-md flex-col gap-4"
    >
      <div>
        <label htmlFor="title" className="mb-1 block font-medium">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          className="w-full rounded-md border p-2"
          placeholder="Recipe title"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="mb-1 block font-medium">
          Description
        </label>
        <textarea
          rows={5}
          id="description"
          name="description"
          className="w-full rounded-md border p-2"
          placeholder="Recipe description"
        />
      </div>

      <div>
        <label className="mb-1 block font-medium">Ingredients</label>

        <div className="flex flex-col gap-2">
          <input
            name="ingredients"
            type="text"
            className="w-full rounded-md border p-2"
            placeholder="Ingredient 1"
            required
          />

          <input
            name="ingredients"
            type="text"
            className="w-full rounded-md border p-2"
            placeholder="Ingredient 2"
          />

          <input
            name="ingredients"
            type="text"
            className="w-full rounded-md border p-2"
            placeholder="Ingredient 3"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block font-medium">Instructions</label>

        <input
          name="instructions"
          type="text"
          className="w-full rounded-md border p-2"
          placeholder="Instruction 1"
        />

        <input
          name="instructions"
          type="text"
          className="mt-2 w-full rounded-md border p-2"
          placeholder="Instruction 2"
        />

        <input
          name="instructions"
          type="text"
          className="mt-2 w-full rounded-md border p-2"
          placeholder="Instruction 3"
        />
      </div>

      <div>
        <label htmlFor="duration" className="mb-1 block font-medium">
          Duration
        </label>
        <input
          id="duration"
          name="duration"
          type="number"
          className="w-full rounded-md border p-2"
          placeholder="30"
          required
        />
      </div>

      <button
        type="submit"
        className="rounded-md bg-accent p-2 font-medium text-white"
      >
        Save Recipe
      </button>
    </form>
  );
}
