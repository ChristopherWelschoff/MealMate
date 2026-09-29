import imageCompression from "browser-image-compression";

export async function uploadImage(file: File): Promise<string> {
  const compressedFile = await imageCompression(file, {
    maxSizeMB: 1,
    maxWidthOrHeight: 1600,
    useWebWorker: true,
  });

  const uploadData = new FormData();
  uploadData.append("image", compressedFile, file.name);

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
