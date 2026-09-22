import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/db/connect";
import Recipe from "@/db/schemas/Recipe";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const recipes = await Recipe.find().populate({
        path: "category",
        model: "Category",
      });

      return res.status(200).json(recipes);
    } catch (error) {
      console.log(error);

      return res.status(400).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  if (req.method === "POST") {
    try {
      const recipeData = req.body;

      await Recipe.create(recipeData);

      return res.status(201).json({
        status: "Recipe created",
      });
    } catch (error) {
      console.log(error);

      return res.status(400).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  return res.status(405).json({
    message: "Method not allowed",
  });
}
