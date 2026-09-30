import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

type SearchBarProps = {
  searchTerm: string;
  onSearch: (value: string) => void;
};

export function SearchBar({ searchTerm, onSearch }: SearchBarProps) {
  return (
    <Field className="my-2">
      <FieldLabel htmlFor="search" className="sr-only">
        Search recipe
      </FieldLabel>

      <div className="relative">
        <Search
          size={18}
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
        />

        <Input
          type="search"
          id="search"
          name="search"
          value={searchTerm}
          onChange={(event) => onSearch(event.target.value)}
          placeholder="Search recipes..."
          className="h-11 rounded-full border-border bg-card pl-11 shadow-sm focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
        />
      </div>
    </Field>
  );
}
