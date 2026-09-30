import { useState } from "react";
import { ImagePlus, RefreshCw } from "lucide-react";

type ImageUploadFieldProps = {
  initialImageUrl?: string;
};

export default function ImageUploadField({
  initialImageUrl,
}: ImageUploadFieldProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialImageUrl ?? null,
  );

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));
  }

  return (
    <div>
      <p className="mb-1 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
        Image
      </p>

      <input
        id="image"
        name="image"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="peer sr-only"
      />

      <label
        htmlFor="image"
        className="group relative block h-44 w-full cursor-pointer overflow-hidden rounded-xl peer-focus-visible:ring-2 peer-focus-visible:ring-primary/40"
      >
        {imagePreview ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imagePreview}
              alt="Preview of selected image"
              className="h-full w-full object-cover"
            />
            <span className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 text-sm font-medium text-white opacity-0 transition group-hover:opacity-100">
              <RefreshCw size={16} aria-hidden="true" />
              Change image
            </span>
          </>
        ) : (
          <span className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-primary/30 bg-secondary/40 text-muted-foreground transition group-hover:border-primary group-hover:bg-secondary">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-card shadow-sm">
              <ImagePlus
                size={22}
                className="text-primary"
                aria-hidden="true"
              />
            </span>
            <span className="text-sm font-medium text-primary">
              Upload image
            </span>
            <span className="text-xs">Tap to choose a photo</span>
          </span>
        )}
      </label>
    </div>
  );
}
