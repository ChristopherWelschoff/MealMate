import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/db/connect";
import Category from "@/db/schemas/Category";

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
    const categories = await Category.find();

    return res.status(200).json(categories);
  } else {
    return res.status(405).json({
      message: "Method not allowed",
    });
  }
}
