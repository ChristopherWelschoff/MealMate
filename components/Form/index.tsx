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

const labelClass =
  "mb-1 block text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground";
const inputClass =
  "w-full rounded-lg border border-border bg-card p-2.5 text-sm text-foreground shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

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
      className="mx-auto mb-8 flex w-[95%] max-w-md flex-col gap-5 rounded-2xl bg-card p-5 shadow-sm"
    >
      {/* Title */}
      <div>
        <label htmlFor="title" className={labelClass}>
          Title*
        </label>
        <input
          minLength={2}
          onBlur={(event) => handleBlur(event.target.value, "title")}
          id="title"
          name="title"
          type="text"
          className={`${inputClass} ${fieldError.title ? "border-destructive" : ""}`}
          placeholder="Recipe title"
          required
          defaultValue={recipe?.title}
        />
        {fieldError.title && (
          <p className="mt-1 text-xs text-destructive">
            This field is required
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className={labelClass}>
          Description
        </label>
        <textarea
          onChange={(event) => setLetterCount(event.target.value.length)}
          rows={4}
          id="description"
          name="description"
          className={inputClass}
          placeholder="Recipe description"
          maxLength={150}
          defaultValue={recipe?.description}
        />
        <small className="mt-1 block text-right text-xs text-muted-foreground">
          {150 - letterCount} letters left
        </small>
      </div>

      {/* Image */}
      <ImageUploadField initialImageUrl={recipe?.imageUrl} />

      {/* Category */}
      <div>
        <label htmlFor="category" className={labelClass}>
          Category*{" "}
          <span className="normal-case tracking-normal">(max. 2)</span>
        </label>
        <Select
          instanceId="category-select"
          inputId="category"
          isMulti
          name="category"
          options={categories}
          getOptionLabel={(category) => category.name}
          getOptionValue={(category) => category._id}
          value={category}
          onChange={(selected) => setCategory([...selected])}
          placeholder="Select a category"
          isOptionDisabled={() => category.length >= 2}
          theme={(theme) => ({
            ...theme,
            borderRadius: 8,
            colors: {
              ...theme.colors,
              primary: "#14532d",
              primary25: "#f0fdf4",
              primary50: "#dcfce7",
              neutral20: "#e5e7eb",
            },
          })}
          styles={{
            menu: (base) => ({
              ...base,
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              zIndex: 50,
            }),
            option: (base, state) => ({
              ...base,
              color: state.isDisabled
                ? "var(--muted-foreground)"
                : "var(--foreground)",
              backgroundColor: state.isFocused
                ? "var(--secondary)"
                : "transparent",
              cursor: state.isDisabled ? "not-allowed" : "pointer",
            }),
          }}
        />
        {fieldError.category && (
          <p className="mt-1 text-xs text-destructive">
            This field is required
          </p>
        )}
      </div>

      {/* Ingredients */}
      <div>
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
        <small className="mt-1 block text-xs text-muted-foreground">
          Tip: Enter amounts in grams (e.g. “200 g spaghetti”) for more accurate
          nutrition values. Calculating them takes a few seconds when saving.
        </small>
      </div>

      {/* Instructions */}
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

      {/* Duration */}
      <div>
        <label htmlFor="duration" className={labelClass}>
          Duration (min)*
        </label>
        <input
          id="duration"
          name="duration"
          type="number"
          min={1}
          className={`${inputClass} ${fieldError.duration ? "border-destructive" : ""}`}
          placeholder="30"
          required
          onBlur={(event) => handleBlur(event.target.value, "duration")}
          defaultValue={recipe?.duration}
        />
        {fieldError.duration && (
          <p className="mt-1 text-xs text-destructive">
            This field is required
          </p>
        )}
      </div>

      {/* Buttons */}
      <div className="mt-2 flex flex-col gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-primary px-6 py-3 text-sm font-medium uppercase tracking-[0.15em] text-primary-foreground shadow-md transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting
            ? "Saving & calculating nutrition..."
            : recipe
              ? "Save changes"
              : "Save recipe"}
        </button>

        {recipe && (
          <Link
            href={`/recipes/${recipe._id}`}
            className="rounded-full border border-primary px-6 py-3 text-center text-sm font-medium uppercase tracking-[0.15em] text-primary transition hover:bg-secondary"
          >
            Back
          </Link>
        )}
      </div>
    </form>
  );
}
