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
  return `cursor-pointer whitespace-nowrap rounded-full border px-4 py-1 text-sm transition-colors ${
    isActive
      ? "border-green-800 bg-green-800 text-white"
      : "border-gray-400 hover:bg-green-800/10"
  }`;
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
