import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/db/connect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import User from "@/db/schemas/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    await dbConnect();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Database connection failed" });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email) {
    return res.status(401).json({ message: "Please login" });
  }

  if (req.method === "GET") {
    try {
      const user = await User.findOne({ email: session.user.email });

      return res.status(200).json(user?.favorites ?? []);
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
