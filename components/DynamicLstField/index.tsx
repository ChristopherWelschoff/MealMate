import { useState } from "react";

type DynamicListFieldProps = {
  label: string;
  name: string;
  itemLabel: string;
  minFields: number;
  initialValues?: string[];
  hasError: boolean;
  errorMessage: string;
  onBlur: (value: string, field: string) => void;
};

type ListItem = {
  id: string;
  defaultValue: string;
};

export default function DynamicListField({
  label,
  name,
  itemLabel,
  minFields,
  initialValues,
  hasError,
  errorMessage,
  onBlur,
}: DynamicListFieldProps) {
  const [fields, setFields] = useState<ListItem[]>(() => {
    const values = initialValues ?? [];
    const missing = Math.max(minFields - values.length, 0);
    const start = [...values, ...Array(missing).fill("")];
    return start.map((value) => ({
      id: crypto.randomUUID(),
      defaultValue: value,
    }));
  });

  function addField() {
    setFields((prev) => [
      ...prev,
      { id: crypto.randomUUID(), defaultValue: "" },
    ]);
  }

  function removeField(fieldId: string) {
    setFields((prev) => prev.filter((field) => field.id !== fieldId));
  }

  return (
    <div>
      <label className="mb-1 block font-medium">
        {label}* <small>(at least {minFields})</small>
      </label>
      {fields.map((field, index) => (
        <div key={field.id} className="relative mt-2 first:mt-0">
          <input
            name={name}
            type="text"
            className={`w-full rounded-md border p-2 pr-9 ${hasError ? "border-red-500" : ""}`}
            placeholder={`${itemLabel} ${index + 1}`}
            required={index < minFields}
            onBlur={(event) => onBlur(event.target.value, name)}
            defaultValue={field.defaultValue}
          />
          {fields.length > minFields && (
            <button
              type="button"
              onClick={() => removeField(field.id)}
              aria-label={`Remove ${itemLabel.toLowerCase()} ${index + 1}`}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
            >
              ✕
            </button>
          )}
        </div>
      ))}
      {hasError && <p className="text-sm text-red-500">{errorMessage}</p>}
      <button
        type="button"
        onClick={addField}
        className="mt-2 text-sm font-medium text-accent hover:underline"
      >
        + Add {itemLabel}
      </button>
    </div>
  );
}
