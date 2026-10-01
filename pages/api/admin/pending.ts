import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/db/connect";
import Recipe from "@/db/schemas/Recipe";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

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
      const session = await getServerSession(req, res, authOptions);
      if (!session?.user?.email) {
        return res.status(401).json({ message: "Please login" });
      }

      const isAdmin = session.user.email === process.env.ADMIN_EMAIL;
      if (!isAdmin) {
        return res.status(403).json({ message: "Not allowed" });
      }

      const recipes = await Recipe.find({ isApproved: false })
        .sort({ createdAt: -1 })
        .populate({
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

  return res.status(405).json({ message: "Method not allowed" });
}
