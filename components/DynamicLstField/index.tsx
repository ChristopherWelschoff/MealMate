import { Plus, X } from "lucide-react";
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
    <fieldset>
      <legend className="mb-1 block text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
        {label}*{" "}
        <span className="normal-case tracking-normal">
          (at least {minFields})
        </span>
      </legend>

      <div className="flex flex-col gap-2">
        {fields.map((field, index) => (
          <div key={field.id} className="relative">
            <input
              name={name}
              type="text"
              aria-label={`${itemLabel} ${index + 1}`}
              className={`w-full rounded-lg border bg-card p-2.5 pr-10 text-sm text-foreground shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                hasError ? "border-destructive" : "border-border"
              }`}
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
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground transition hover:bg-muted hover:text-destructive"
              >
                <X size={16} />
              </button>
            )}
          </div>
        ))}
      </div>

      {hasError && (
        <p className="mt-1 text-xs text-destructive">{errorMessage}</p>
      )}

      <button
        type="button"
        onClick={addField}
        className="mt-3 flex items-center gap-1 rounded-full border border-dashed border-primary/40 px-4 py-1.5 text-sm font-medium text-primary transition hover:border-primary hover:bg-secondary"
      >
        <Plus size={16} />
        Add {itemLabel}
      </button>
    </fieldset>
  );
}
