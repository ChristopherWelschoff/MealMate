import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import type { Category } from "@/types";

type FilterCarouselProps = {
  categories: Category[];
  onFilter: (value: string) => void;
  filterTerm: string;
};

function getChipClasses(isActive: boolean) {
  const base =
    "whitespace-nowrap rounded-full border px-4 py-1.5 text-sm font-medium transition";

  return isActive
    ? `${base} border-primary bg-primary text-primary-foreground shadow-sm`
    : `${base} border-border bg-card text-muted-foreground hover:border-primary/40 hover:bg-secondary hover:text-primary`;
}

export default function FilterCarousel({
  categories,
  onFilter,
  filterTerm,
}: FilterCarouselProps) {
  const isAllActive = filterTerm === "";

  return (
    <Carousel
      opts={{ align: "start", dragFree: true }}
      className="w-full px-12"
    >
      <CarouselContent className="-ml-2 my-3">
        <CarouselItem className="basis-auto pl-2">
          <button
            type="button"
            onClick={() => onFilter("")}
            aria-pressed={isAllActive}
            className={getChipClasses(isAllActive)}
          >
            All
          </button>
        </CarouselItem>

        {categories?.map((category) => {
          const isActive = filterTerm === category.name;

          return (
            <CarouselItem key={category._id} className="basis-auto pl-2">
              <button
                type="button"
                onClick={() => onFilter(category.name)}
                aria-pressed={isActive}
                className={getChipClasses(isActive)}
              >
                {category.name}
              </button>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="left-0" />
      <CarouselNext className="right-0" />
    </Carousel>
  );
}
