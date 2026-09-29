import type { NextApiRequest } from "next";
import formidable from "formidable";

export async function parseForm(request: NextApiRequest) {
  const form = formidable();
  const [fields, files] = await form.parse(request);
  return { fields, files };
}
