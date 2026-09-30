import { Info } from "lucide-react";
import type { Nutrition } from "@/types";

type NutritionInfoProps = {
  nutrition?: Nutrition;
};

export default function NutritionInfo({ nutrition }: NutritionInfoProps) {
  if (!nutrition) {
    return (
      <section>
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-gray-900">
          Nutrition:
        </h2>
        <p className="text-sm text-gray-500">No nutrition data available.</p>
      </section>
    );
  }

  const items = [
    { label: "kcal", value: `~${nutrition.calories}` },
    { label: "Protein", value: `${nutrition.protein} g` },
    { label: "Carbs", value: `${nutrition.carbs} g` },
    { label: "Fat", value: `${nutrition.fat} g` },
  ];

  return (
    <div>
      <h2 className="mb-3 text-xl font-semibold tracking-tight text-gray-900">
        Nutrition:
      </h2>

      <dl className="grid grid-cols-4 gap-2">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-center rounded-lg border border-green-200 bg-green-50 px-2 py-3"
          >
            <dd className="text-lg font-bold text-green-900">{item.value}</dd>
            <dt className="text-xs text-green-800">{item.label}</dt>
          </div>
        ))}
      </dl>

      <p className="mt-2 flex items-center gap-1 text-xs text-gray-500">
        <Info size={14} />
        Estimated values based on the ingredients
      </p>
    </div>
  );
}
