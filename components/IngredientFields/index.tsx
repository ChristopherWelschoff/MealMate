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
          <div key={fieldId} className="relative">
            <input
              name="ingredients"
              type="text"
              className={`w-full rounded-md border p-2 pr-9 ${hasError ? "border-red-500" : ""}`}
              placeholder={`Ingredient ${index + 1}`}
              required={index < 2}
              onBlur={(event) => onBlur(event.target.value, "ingredients")}
              defaultValue={initialIngredients?.[index]}
            />
            {ingredientFields.length > 2 && (
              <button
                type="button"
                onClick={() => removeIngredientField(fieldId)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
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
