import type { Category, Recipe } from "@/types";
import Link from "next/link";
import React, { useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import DynamicListField from "../DynamicLstField";
import ImageUploadField from "../ImageUploadField";
import { compressImage } from "@/lib/compressImage";

type RecipeFormProps = {
  onSubmit: (formData: FormData) => Promise<void>;
  categories: Category[];
  recipe?: Recipe;
};

export default function RecipeForm({
  recipe,
  onSubmit,
  categories,
}: RecipeFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [letterCount, setLetterCount] = useState(
    recipe?.description?.length ?? 0,
  );
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

    const ingredients = (formData.getAll("ingredients") as string[]).filter(
      (value) => value.trim(),
    );
    const instructions = (formData.getAll("instructions") as string[]).filter(
      (value) => value.trim(),
    );

    if (ingredients.length <= 1) {
      return toast.error("Please add at least 2 ingredients");
    }
    if (instructions.length === 0) {
      return toast.error("Please add your instructions");
    }
    if (category.length === 0) {
      return toast.error("Please select at least one category");
    }

    formData.delete("ingredients");
    ingredients.forEach((item) => formData.append("ingredients", item));

    formData.delete("instructions");
    instructions.forEach((item) => formData.append("instructions", item));

    formData.delete("category");
    category.forEach((item) => formData.append("category", item._id));

    setIsSubmitting(true);

    try {
      const imageFile = formData.get("image") as File;
      if (imageFile.size > 0) {
        const compressedFile = await compressImage(imageFile);
        formData.set("image", compressedFile, imageFile.name);
      }

      await onSubmit(formData);
    } catch (error) {
      console.log(error);
      toast.error("Could not save recipe. Please try again.");
    } finally {
      setIsSubmitting(false);
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
          className={`${fieldError.title ? "border-red-500" : ""} w-full rounded-md border p-2`}
          placeholder="Recipe title"
          required
          defaultValue={recipe?.title}
        />
        {fieldError.title && (
          <p className="text-sm text-red-500">This field is required</p>
        )}
      </div>

      <div className="flex flex-col items-end justify-center">
        <label
          htmlFor="description"
          className="mb-1 block self-start font-medium"
        >
          Description
        </label>
        <textarea
          onChange={(event) => setLetterCount(event.target.value.length)}
          rows={5}
          id="description"
          name="description"
          className="w-full rounded-md border p-2"
          placeholder="Recipe description"
          maxLength={150}
          defaultValue={recipe?.description}
        />

        <small className="m-2">{150 - letterCount} letters left</small>
      </div>

      <ImageUploadField initialImageUrl={recipe?.imageUrl} />

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
      />
      {fieldError.category && (
        <p className="text-sm text-red-500">This field is required</p>
      )}
      <small className="text-gray-500">
        {
          'Tip: Enter amounts in grams (e.g. "200 g spaghetti") for more accurate nutrition values.'
        }
      </small>
      <DynamicListField
        label="Ingredients"
        name="ingredients"
        itemLabel="Ingredient"
        minFields={2}
        initialValues={recipe?.ingredients}
        hasError={fieldError.ingredients}
        errorMessage="At least 2 ingredients are required"
        onBlur={handleBlur}
      />

      <DynamicListField
        label="Instructions"
        name="instructions"
        itemLabel="Instruction"
        minFields={1}
        initialValues={recipe?.instructions}
        hasError={fieldError.instructions}
        errorMessage="At least 1 instruction is required"
        onBlur={handleBlur}
      />

      <div>
        <label htmlFor="duration" className="mb-1 block font-medium">
          Duration*
        </label>
        <input
          id="duration"
          name="duration"
          type="number"
          className={`${fieldError.duration ? "border-red-500" : ""} w-full rounded-md border p-2`}
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
        disabled={isSubmitting}
        className="rounded-md bg-accent p-2 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting
          ? "Saving & calculating nutrition..."
          : recipe
            ? "Save changes"
            : "Save Recipe"}
      </button>

      {recipe && (
        <Link
          href={`/recipes/${recipe._id}`}
          className="w-full rounded-md bg-accent p-2 text-center font-medium text-white"
        >
          Back
        </Link>
      )}
    </form>
  );
}
