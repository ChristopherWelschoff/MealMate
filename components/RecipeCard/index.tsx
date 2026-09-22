import type { Recipe } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Timer } from "lucide-react";
import { categoryColors } from "@/lib/utils";
import Link from "next/link";

export default function RecipeCard({ ...recipe }: Recipe) {
  return (
    <Link href={`recipe/${recipe._id}`}>
      <Card
        size="sm"
        className="mx-auto grid w-[95%] max-w-3xl grid-cols-5 overflow-hidden p-0"
      >
        <div className="relative col-span-2 ">
          <Image
            loading="eager"
            src="/assets/placeholder.jpg"
            alt={recipe.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>

        <CardHeader className="col-span-3 flex flex-col items-start justify-start gap-6 p-3">
          <div className="flex flex-col gap-3">
            <CardTitle className="text-2xl font-bold leading-tight">
              {recipe.title}
            </CardTitle>

            <div className="flex flex-wrap gap-2 mt-2">
              {recipe.category.map((category) => (
                <Badge
                  key={category._id}
                  variant="outline"
                  className={`border-gray-300 ${categoryColors[category.name.toLowerCase()] ?? "bg-gray-100 text-gray-900"}`}
                >
                  {category.name}
                </Badge>
              ))}
            </div>
          </div>

          <div className=" text-sm mt-5">
            <div className="flex items-center justify-center gap-2 text-sm ">
              <Timer size={16} className=" -translate-y-px" />
              <span>{recipe.duration} min</span>
            </div>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}
