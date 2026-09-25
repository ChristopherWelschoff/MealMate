import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

type SearchBarProps = {
  searchTerm: string;
  onSearch: (value: string) => void;
};

export function SearchBar({ searchTerm, onSearch }: SearchBarProps) {
  return (
    <Field className="my-2 border-2 rounded-sm border-gray-400 flex">
      <FieldLabel htmlFor="search" className="sr-only">
        Search recipe
      </FieldLabel>
      <Input
        type="search"
        id="search"
        name="search"
        value={searchTerm}
        onChange={(event) => onSearch(event.target.value)}
        placeholder="search recipe..."
      />
    </Field>
  );
}
