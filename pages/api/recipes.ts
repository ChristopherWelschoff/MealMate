import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/db/connect";
import Recipe from "@/db/schemas/recipes";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).json({
      message: "Method not allowed",
    });
  }

  try {
    await dbConnect();

    console.log("SCHEMA:", Object.keys(Recipe.schema.paths));

    const recipes = await Recipe.find().populate("category");

    return res.status(200).json(recipes);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch recipes",
    });
  }
}
