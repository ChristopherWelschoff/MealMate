import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/db/connect";
import Recipe from "@/db/schemas/Recipe";

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
      const recipes = await Recipe.findById(id).populate({
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

  if (req.method === "PUT") {
    try {
      const recipeData = req.body;

      await Recipe.findByIdAndUpdate(id, recipeData);

      return res.status(200).json({ status: `Recipe${id} updated` });
    } catch (error) {
      console.error(error);

      return res.status(400).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  if (req.method === "DELETE") {
    try {
      await Recipe.findByIdAndDelete(id);

      return res.status(200).json({ status: `Recipe${id} deleted` });
    } catch (error) {
      console.error(error);

      return res.status(400).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  return res.status(405).json({
    message: "Method not allowed",
  });
}
