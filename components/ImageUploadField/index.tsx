import { useState } from "react";

type ImageUploadFieldProps = {
  initialImageUrl?: string;
};

export default function ImageUploadField({
  initialImageUrl,
}: ImageUploadFieldProps) {
  const [imagePreview, setImagePreview] = useState<string>(
    initialImageUrl ?? "",
  );

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));
  }

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="image" className="mb-1 block font-medium">
        Upload Image
      </label>
      <input
        id="image"
        name="image"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="file:mr-3 file:rounded-md file:border-0 file:bg-green-800 file:px-3 file:py-1 file:text-white"
      />

      {imagePreview && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imagePreview}
          alt="Preview of selected image"
          className="mt-2 h-40 w-full rounded-md object-cover"
        />
      )}
    </div>
  );
}
