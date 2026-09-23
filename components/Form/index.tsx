import type { Category, Recipe } from "@/types";
import React, { useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";

export type RecipeFormData = Omit<Recipe, "_id" | "createdAt" | "updatedAt">;

type RecipeFormProps = {
  onSubmit: (data: RecipeFormData) => Promise<void>;
  categories: Category[];
  recipe?: Recipe;
};

export default function RecipeForm({
  recipe,
  onSubmit,
  categories,
}: RecipeFormProps) {
  const [category, setCategory] = useState<Category[]>(
    recipe ? recipe.category : [],
  );
  const [fieldError, setFieldErrors] = useState({
    title: false,
    category: false,
    ingredients: false,
    instructions: false,
    duration: false,
  });

  function handleBlur(value: string, field: string) {
    setFieldErrors({ ...fieldError, [field]: value.trim() === "" });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    //required Title,category, ingredients instructions and duration
    const data: RecipeFormData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      category,
      ingredients: formData.getAll("ingredients") as string[],
      instructions: formData.getAll("instructions") as string[],
      duration: Number(formData.get("duration")),
    };

    function removeEmpty(value: string[]) {
      return value.filter((value) => value.trim());
    }

    data.ingredients = removeEmpty(data.ingredients);
    data.instructions = removeEmpty(data.instructions);

    if (data.ingredients.length <= 1) {
      return toast.error("Please select at least 2 Ingredients ");
    }
    if (data.instructions.length === 0) {
      return toast.error("Please select your instructions ");
    }

    if (category.length === 0) {
      return toast.error("Please sleect at least one category");
    }

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
          Title*
        </label>
        <input
          minLength={2}
          onBlur={(event) => handleBlur(event.target.value, "title")}
          id="title"
          name="title"
          type="text"
          className={` ${fieldError.title ? "border-red-500" : ""} w-full rounded-md border p-2`}
          placeholder="Recipe title"
          required
          defaultValue={recipe?.title}
        />
        {fieldError.title && (
          <p className="text-sm text-red-500">This field is required</p>
        )}
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
          maxLength={200}
          defaultValue={recipe?.description}
        />
      </div>
      <label className="mb-1 block font-medium">
        Category* <small>(at least one)</small>
      </label>
      <Select
        instanceId="category-select"
        isMulti
        id="category"
        name="category"
        className="basic-multi-select"
        classNamePrefix="select"
        options={categories}
        getOptionLabel={(category) => category.name}
        getOptionValue={(category) => category._id}
        value={category}
        onChange={(selected) => setCategory([...selected])}
        placeholder="Please Select a Category"
        isOptionDisabled={() => category.length >= 2}
        onBlur={() =>
          setFieldErrors({ ...fieldError, category: category.length === 0 })
        }
      />
      {fieldError.category && (
        <p className="text-sm text-red-500">This field is required</p>
      )}

      <div>
        <label className="mb-1 block font-medium">
          Ingredients* <small>(at least two)</small>
        </label>

        <div className="flex flex-col gap-2">
          <input
            name="ingredients"
            type="text"
            className={` ${fieldError.ingredients ? "border-red-500" : ""} w-full rounded-md border p-2`}
            placeholder="Ingredient 1"
            required
            onBlur={(event) => handleBlur(event.target.value, "ingredients")}
            defaultValue={recipe?.ingredients[0]}
          />
          {fieldError.ingredients && (
            <p className="text-sm text-red-500">This field is required</p>
          )}

          <input
            name="ingredients"
            type="text"
            className={` ${fieldError.ingredients ? "border-red-500" : ""} w-full rounded-md border p-2`}
            placeholder="Ingredient 2"
            required
            onBlur={(event) => handleBlur(event.target.value, "ingredients")}
            defaultValue={recipe?.ingredients[1]}
          />
          {fieldError.ingredients && (
            <p className="text-sm text-red-500">This field is required</p>
          )}

          <input
            name="ingredients"
            type="text"
            className="w-full rounded-md border p-2"
            placeholder="Ingredient 3"
            defaultValue={recipe?.ingredients[2]}
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block font-medium">
          Instructions* <small>(at least one)</small>
        </label>

        <input
          name="instructions"
          type="text"
          className={` ${fieldError.instructions ? "border-red-500" : ""} w-full rounded-md border p-2`}
          placeholder="Instruction 1"
          required
          onBlur={(event) => handleBlur(event.target.value, "instructions")}
          defaultValue={recipe?.instructions[0]}
        />
        {fieldError.instructions && (
          <p className="text-sm text-red-500">This field is required</p>
        )}

        <input
          name="instructions"
          type="text"
          className="mt-2 w-full rounded-md border p-2"
          placeholder="Instruction 2"
          defaultValue={recipe?.instructions[1]}
        />

        <input
          name="instructions"
          type="text"
          className="mt-2 w-full rounded-md border p-2"
          placeholder="Instruction 3"
          defaultValue={recipe?.instructions[2]}
        />
      </div>

      <div>
        <label htmlFor="duration" className="mb-1 block font-medium">
          Duration*
        </label>
        <input
          id="duration"
          name="duration"
          type="number"
          className={` ${fieldError.duration ? "border-red-500" : ""} w-full rounded-md border p-2`}
          placeholder="30"
          required
          onBlur={(event) => handleBlur(event.target.value, "duration")}
          defaultValue={recipe?.duration}
        />
        {fieldError.duration && (
          <p className="text-sm text-red-500">This field is required</p>
        )}
      </div>

      <button
        type="submit"
        className="rounded-md bg-accent p-2 font-medium text-white"
      >
        {recipe ? "Edit Recipe" : "Save Recipe"}
      </button>
    </form>
  );
}
