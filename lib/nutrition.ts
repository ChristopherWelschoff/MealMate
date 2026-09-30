import { GoogleGenAI } from "@google/genai";
import type { Nutrition } from "@/types";

const ai = new GoogleGenAI({});

const nutritionSchema = {
  type: "object",
  properties: {
    calories: { type: "number", description: "Total calories in kcal" },
    protein: { type: "number", description: "Total protein in grams" },
    carbs: { type: "number", description: "Total carbohydrates in grams" },
    fat: { type: "number", description: "Total fat in grams" },
  },
  required: ["calories", "protein", "carbs", "fat"],
};

export async function calculateNutrition(
  ingredients: string[],
): Promise<Nutrition | null> {
  try {
    const prompt = `You are a nutrition expert. Estimate the TOTAL nutritional values
of a dish made from the following ingredients. Use typical average values.
If an amount is vague (e.g. "1 onion"), assume a common portion size.

Ingredients:
${ingredients.map((item) => `- ${item}`).join("\n")}`;

    const interaction = await ai.interactions.create({
      model: "gemini-3.5-flash-lite",
      input: prompt,
      response_format: {
        type: "text",
        mime_type: "application/json",
        schema: nutritionSchema,
      },
    });

    if (!interaction.output_text) {
      return null;
    }
    const data = JSON.parse(interaction.output_text);

    const values = [data.calories, data.protein, data.carbs, data.fat];
    const isValid = values.every(
      (value) => typeof value === "number" && value >= 0,
    );
    if (!isValid) return null;

    return {
      calories: Math.round(data.calories),
      protein: Math.round(data.protein),
      carbs: Math.round(data.carbs),
      fat: Math.round(data.fat),
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}
