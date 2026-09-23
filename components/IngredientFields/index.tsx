import { useState } from "react";

type IngredientsFieldProps = {
  initialIngredients?: string[];
  hasError: boolean;
  onBlur: (value: string, field: string) => void;
};

export default function IngredientsField({
  initialIngredients,
  hasError,
  onBlur,
}: IngredientsFieldProps) {
  const [ingredientFields, setIngredientFields] = useState<number[]>(
    Array.from(
      { length: initialIngredients?.length ?? 2 },
      (_, index) => index,
    ),
  );

  function addIngredientField() {
    setIngredientFields([...ingredientFields, ingredientFields.length]);
  }

  function removeIngredientField(fieldId: number) {
    setIngredientFields(ingredientFields.filter((id) => id !== fieldId));
  }

  return (
    <div>
      <label className="mb-1 block font-medium">
        Ingredients* <small>(at least two)</small>
      </label>
      {ingredientFields.map((fieldId, index) => {
        return (
          <div key={fieldId} className="flex flex-col gap-2">
            <input
              name="ingredients"
              type="text"
              className={` ${hasError ? "border-red-500" : ""} w-full rounded-md border p-2`}
              placeholder={`Ingredient ${index + 1}`}
              required={index < 2}
              onBlur={(event) => onBlur(event.target.value, "ingredients")}
              defaultValue={initialIngredients?.[index]}
            />
            {ingredientFields.length > 2 && (
              <button
                type="button"
                onClick={() => removeIngredientField(fieldId)}
                className="text-accent hover:text-red-800"
              >
                ✕
              </button>
            )}
          </div>
        );
      })}
      {hasError && (
        <p className="text-sm text-red-500">
          At least 2 ingredients are required
        </p>
      )}
      <button
        type="button"
        onClick={addIngredientField}
        className="text-sm font-medium text-accent hover:underline"
      >
        + Add Ingredient
      </button>
    </div>
  );
}
