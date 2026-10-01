import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/db/connect";
import Recipe from "@/db/schemas/Recipe";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

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

  if (req.method === "POST") {
    try {
      const session = await getServerSession(req, res, authOptions);
      if (!session?.user?.email) {
        return res.status(401).json({ message: "Please login" });
      }

      const original = await Recipe.findById(id);
      if (!original) {
        return res.status(404).json({ error: "Recipe not found" });
      }

      const copy = await Recipe.create({
        title: original.title,
        description: original.description,
        ingredients: original.ingredients,
        instructions: original.instructions,
        category: original.category,
        duration: original.duration,
        imageUrl: original.imageUrl,
        nutrition: original.nutrition,
        owner: session.user.email,
        ownerName: session.user.name,
        isPrivate: true,
        isApproved: true,
        copiedFrom: original._id,
      });

      return res.status(201).json({ id: copy._id });
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
