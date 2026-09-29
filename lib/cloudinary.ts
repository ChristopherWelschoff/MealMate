import { v2 as cloudinary } from "cloudinary";

export async function uploadToCloudinary(filepath: string): Promise<string> {
  const result = await cloudinary.uploader.upload(filepath, {
    folder: "mealmate",
  });
  return result.secure_url;
}
