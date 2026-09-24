import { useState } from "react";

type IngredientsFieldProps = {
  initialIngredients?: string[];
  hasError: boolean;
  onBlur: (value: string, field: string) => void;
};

//  ein Feld = ID + eigener Startwert
type IngredientField = {
  id: string;
  defaultValue: string;
};

export default function IngredientsField({
  initialIngredients,
  hasError,
  onBlur,
}: IngredientsFieldProps) {
  // Objekte statt nur IDs
  const [ingredientFields, setIngredientFields] = useState<IngredientField[]>(
    () => {
      const start = initialIngredients?.length ? initialIngredients : ["", ""];
      return start.map((value) => ({
        id: crypto.randomUUID(),
        defaultValue: value,
      }));
    },
  );

  function addIngredientField() {
    // neues Feld startet immer leer
    setIngredientFields((prev) => [
      ...prev,
      { id: crypto.randomUUID(), defaultValue: "" },
    ]);
  }

  function removeIngredientField(fieldId: string) {
    
    setIngredientFields((prev) => prev.filter((field) => field.id !== fieldId));
  }

  return (
    <div>
      <label className="mb-1 block font-medium">
        Ingredients* <small>(at least two)</small>
      </label>
      {ingredientFields.map((field, index) => {
        return (
          <div key={field.id} className="relative">
            <input
              name="ingredients"
              type="text"
              className={`w-full rounded-md border p-2 pr-9 ${hasError ? "border-red-500" : ""}`}
              placeholder={`Ingredient ${index + 1}`}
              required={index < 2}
              onBlur={(event) => onBlur(event.target.value, "ingredients")}
              defaultValue={field.defaultValue} 
            />
            {ingredientFields.length > 2 && (
              <button
                type="button"
                onClick={() => removeIngredientField(field.id)} 
                aria-label={`Remove ingredient ${index + 1}`} 
                className="absolute right-2 top-1/2 -translate-y-1/2 text-accent hover:text-red-500"
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
