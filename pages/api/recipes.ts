import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/db/connect";
import Recipe from "@/db/schemas/Recipe";
import { parseForm } from "@/lib/parseForm";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { calculateNutrition } from "@/lib/nutrition";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    await dbConnect();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database connection failed" });
    return;
  }

  if (req.method === "GET") {
    try {
      const recipes = await Recipe.find().sort({ createdAt: -1 }).populate({
        path: "category",
        model: "Category",
      });

      return res.status(200).json(recipes);
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  if (req.method === "POST") {
    try {
      const { fields, files } = await parseForm(req);

      const imageFile = files.image?.[0];
      const ingredients = fields.ingredients ?? [];

      const [imageUrl, nutrition] = await Promise.all([
        imageFile && imageFile.size > 0
          ? uploadToCloudinary(imageFile.filepath)
          : Promise.resolve(undefined),
        calculateNutrition(ingredients),
      ]);

      const recipeData = {
        title: fields.title?.[0],
        description: fields.description?.[0],
        ingredients,
        instructions: fields.instructions ?? [],
        category: fields.category ?? [],
        duration: Number(fields.duration?.[0]),
        imageUrl,
        nutrition: nutrition ?? undefined,
      };

      await Recipe.create(recipeData);

      return res.status(201).json({ status: "Recipe created" });
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
