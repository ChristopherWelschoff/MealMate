import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Category } from "@/types";

type FilterCarouselProps = {
  categories: Category[];
  onFilter: (value: string) => void;
};

export default function FilterCarousel({
  categories,
  onFilter,
}: FilterCarouselProps) {
  return (
    <Carousel
      opts={{ align: "start", dragFree: true }}
      className="w-full px-12"
    >
      <CarouselContent className="-ml-2 my-3">
        <CarouselItem key="all" className="basis-auto pl-2">
          <button
            onClick={() => onFilter("")}
            type="button"
            className="cursor-pointer whitespace-nowrap rounded-full border border-gray-400 px-4 py-1 text-sm hover:bg-green-800 hover:text-white"
          >
            All
          </button>
        </CarouselItem>
        {categories?.map((category) => (
          <CarouselItem key={category._id} className="basis-auto pl-2">
            <button
              onClick={() => onFilter(category.name)}
              type="button"
              className="cursor-pointer whitespace-nowrap rounded-full border border-gray-400 px-4 py-1 text-sm hover:bg-green-800 hover:text-white"
            >
              {category.name}
            </button>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-0" />
      <CarouselNext className="right-0" />
    </Carousel>
  );
}
