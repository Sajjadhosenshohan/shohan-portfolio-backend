"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import { TResume } from "@/types/resume.type";

interface ResumeUpdateFormProps {
  onUpdate: (resume: Partial<TResume>) => Promise<void>;
  isUpdating: boolean;
  initialTitle: string;
  initialIsActive: boolean;
  initialLink: string;
  resume: TResume;
  onClose: () => void;
}

export function ResumeUpdateForm({
  onUpdate,
  isUpdating,
  initialTitle,
  initialLink,
  initialIsActive,
  onClose,
  resume,
}: ResumeUpdateFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [link, setLink] = useState(initialLink);
  const [isActive, setIsActive] = useState(initialIsActive);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedResume: Partial<TResume> = {
      ...resume,
      title,
      isActive,
      pdfUrl: link,
      updatedAt: new Date().toISOString(),
    };

    await onUpdate(updatedResume);
      resetForm();
      onClose();
  };

  const resetForm = () => {
    setTitle("");
    setIsActive(false);
    setLink("");
  };

  return (
    <form onSubmit={handleSubmit}  className="space-y-4">
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Resume title"
        required
      />

      <Input
        type="url"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="Resume URL (e.g., https://example.com/resume.pdf)"
        required
      />

      <div className="flex items-center gap-2">
        <Checkbox
          id="isActive"
          checked={isActive}
          onCheckedChange={(checked) => setIsActive(checked as boolean)}
        />
        <label htmlFor="isActive" className="text-sm text-muted-foreground">
          Set as Active Resume
        </label>
      </div>

      <div className="flex justify-end">
        <Button
          variant="outline"
          className="text-red-600 border border-red-600 hover:text-red-600 cursor-pointer"
          type="submit"
          disabled={isUpdating}
        >
          {isUpdating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating...
            </>
          ) : (
            "Update Resume"
          )}
        </Button>
      </div>
    </form>
  );
}