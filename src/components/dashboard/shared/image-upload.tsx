import { useState } from "react";
import { Upload } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value: string | null;
  onChange: (file: File) => void;
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  return (
    <div className="relative">
      {preview ? (
        <Image src={preview} alt="Preview" width={50} height={50} className="h-40 w-full object-cover rounded-md" />
      ) : (
        <div className="h-40 w-full bg-secondary flex items-center justify-center rounded-md">
          <Upload className="h-8 w-8 text-muted-foreground" />
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="absolute inset-0 opacity-0 cursor-pointer"
      />
    </div>
  );
}