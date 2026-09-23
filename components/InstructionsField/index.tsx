import { useState } from "react";

type InstructionsFieldProps = {
  initialInstructions?: string[];
  hasError: boolean;
  onBlur: (value: string, field: string) => void;
};

export default function InstructionsField({
  initialInstructions,
  hasError,
  onBlur,
}: InstructionsFieldProps) {
  const [instructionFields, setInstructionFields] = useState<number[]>(
    Array.from(
      { length: initialInstructions?.length ?? 1 },
      (_, index) => index,
    ),
  );

  function addInstructionField() {
    setInstructionFields([...instructionFields, instructionFields.length]);
  }

  function removeInstructionField(fieldId: number) {
    setInstructionFields(instructionFields.filter((id) => id !== fieldId));
  }

  return (
    <div>
      <label className="mb-1 block font-medium">
        Instructions* <small>(at least one)</small>
      </label>
      {instructionFields.map((fieldId, index) => {
        return (
          <div key={fieldId} className="relative mt-2 first:mt-0">
            <input
              name="instructions"
              type="text"
              className={`w-full rounded-md border p-2 pr-9 ${hasError ? "border-red-500" : ""}`}
              placeholder={`Instruction ${index + 1}`}
              required={index < 1}
              onBlur={(event) => onBlur(event.target.value, "instructions")}
              defaultValue={initialInstructions?.[index]}
            />
            {instructionFields.length > 1 && (
              <button
                type="button"
                onClick={() => removeInstructionField(fieldId)}
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