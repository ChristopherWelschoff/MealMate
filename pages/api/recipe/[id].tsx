import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/db/connect";
import Recipe from "@/db/schemas/Recipe";
import { parseForm } from "@/lib/parseForm";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { calculateNutrition } from "@/lib/nutrition";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

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

  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const recipe = await Recipe.findById(id).populate({
        path: "category",
        model: "Category",
      });

      return res.status(200).json(recipe);
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  if (req.method === "PUT") {
    try {
      const session = await getServerSession(req, res, authOptions);
      if (!session) {
        return res.status(401).json({ message: "Please login" });
      }
      const { fields, files } = await parseForm(req);
      const existingRecipe = await Recipe.findById(id);

      if (!existingRecipe) {
        return res.status(404).json({ error: "Recipe not found" });
      }
      const newIngredients = fields.ingredients ?? [];
      const ingredientsChanged =
        JSON.stringify(newIngredients) !==
        JSON.stringify(existingRecipe.ingredients);

      const updateData: Record<string, unknown> = {
        title: fields.title?.[0],
        description: fields.description?.[0],
        ingredients: newIngredients,
        instructions: fields.instructions ?? [],
        category: fields.category ?? [],
        duration: Number(fields.duration?.[0]),
      };

      if (ingredientsChanged) {
        const nutrition = await calculateNutrition(newIngredients);

        if (nutrition) {
          updateData.nutrition = nutrition;
        }
      }

      const imageFile = files.image?.[0];
      if (imageFile && imageFile.size > 0) {
        updateData.imageUrl = await uploadToCloudinary(imageFile.filepath);
      }

      await Recipe.findByIdAndUpdate(id, updateData);

      return res.status(200).json({ status: `Recipe ${id} updated` });
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  if (req.method === "DELETE") {
    try {
      const session = await getServerSession(req, res, authOptions);
      if (!session) {
        return res.status(401).json({ message: "Please login" });
      }
      await Recipe.findByIdAndDelete(id);
      return res.status(200).json({ status: `Recipe ${id} deleted` });
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
