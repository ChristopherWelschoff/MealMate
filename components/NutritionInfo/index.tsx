import { Info } from "lucide-react";
import type { Nutrition } from "@/types";

type NutritionInfoProps = {
  nutrition?: Nutrition;
};

export default function NutritionInfo({ nutrition }: NutritionInfoProps) {
  if (!nutrition) {
    return (
      <p className="flex items-center gap-1 text-xs text-muted-foreground">
        <Info size={14} aria-hidden="true" />
        No nutrition data available
      </p>
    );
  }

  const items = [
    { label: "kcal", value: `~${nutrition.calories}` },
    { label: "Protein", value: `${nutrition.protein} g` },
    { label: "Carbs", value: `${nutrition.carbs} g` },
    { label: "Fat", value: `${nutrition.fat} g` },
  ];

  return (
    <div className="w-full">
      <dl className="grid grid-cols-4 divide-x divide-border">
        {items.map((item, index) => (
          <div key={item.label} className="flex flex-col-reverse items-center">
            <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">
              {item.label}
            </dt>
            <dd
              className={`text-sm font-semibold ${
                index === 0 ? "text-primary" : "text-foreground"
              }`}
            >
              {item.value}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-2 flex items-center gap-1 text-[11px] text-muted-foreground">
        <Info size={12} aria-hidden="true" />
        Estimated values based on the ingredients
      </p>
    </div>
  );
}
