import type { NextApiRequest, NextApiResponse } from "next";
import { v2 as cloudinary } from "cloudinary";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method !== "POST") {
    return response.status(405).json({ message: "Method not allowed" });
  }

  try {
    const form = formidable();
    const [, files] = await form.parse(request);
    const file = files.image?.[0];

    if (!file) {
      return response.status(400).json({ message: "No image provided" });
    }

    const result = await cloudinary.uploader.upload(file.filepath, {
      folder: "mealmate",
    });

    return response.status(200).json({ imageUrl: result.secure_url });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Upload failed" });
  }
}
