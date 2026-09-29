export async function uploadImage(file: File): Promise<string> {
  const uploadData = new FormData();
  uploadData.append("image", file);

  const response = await fetch("/api/uploadImage", {
    method: "POST",
    body: uploadData,
  });

  if (!response.ok) {
    throw new Error("Image upload failed");
  }

  const { imageUrl } = await response.json();
  return imageUrl;
}