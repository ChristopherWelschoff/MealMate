import type { NextApiRequest, NextApiResponse } from "next";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const interaction = await ai.interactions.create({
      model: "gemini-3.8-flash",
      input: "Say hello to the MealMate app in one short sentence.",
    });

    return res.status(200).json({ text: interaction.output_text });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Gemini request failed" });
  }
}