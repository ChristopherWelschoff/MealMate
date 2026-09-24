import { useState } from "react";

type InstructionsFieldProps = {
  initialInstructions?: string[];
  hasError: boolean;
  onBlur: (value: string, field: string) => void;
};

// ein Feld = ID + eigener Startwert
type InstructionField = {
  id: string;
  defaultValue: string;
};

export default function InstructionsField({
  initialInstructions,
  hasError,
  onBlur,
}: InstructionsFieldProps) {
  // Objekte statt nur IDs
  const [instructionFields, setInstructionFields] = useState<
    InstructionField[]
  >(() => {
    const start = initialInstructions?.length ? initialInstructions : [""];
    return start.map((value) => ({
      id: crypto.randomUUID(),
      defaultValue: value,
    }));
  });

  function addInstructionField() {
    //neues Feld startet immer leer
    setInstructionFields((prev) => [
      ...prev,
      { id: crypto.randomUUID(), defaultValue: "" },
    ]);
  }

  function removeInstructionField(fieldId: string) {
   
    setInstructionFields((prev) =>
      prev.filter((field) => field.id !== fieldId),
    );
  }

  return (
    <div>
      <label className="mb-1 block font-medium">
        Instructions* <small>(at least one)</small>
      </label>
      {instructionFields.map((field, index) => {
        return (
          <div key={field.id} className="relative mt-2 first:mt-0">
            <input
              name="instructions"
              type="text"
              className={`w-full rounded-md border p-2 pr-9 ${hasError ? "border-red-500" : ""}`}
              placeholder={`Instruction ${index + 1}`}
              required={index < 1}
              onBlur={(event) => onBlur(event.target.value, "instructions")}
              defaultValue={field.defaultValue} 
            />
            {instructionFields.length > 1 && (
              <button
                type="button"
                onClick={() => removeInstructionField(field.id)} 
                aria-label={`Remove instruction ${index + 1}`} 
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
          At least 1 instruction is required
        </p>
      )}
      <button
        type="button"
        onClick={addInstructionField}
        className="mt-2 text-sm font-medium text-accent hover:underline"
      >
        + Add Instruction
      </button>
    </div>
  );
}
