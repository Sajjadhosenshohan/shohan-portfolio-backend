"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import { TResume } from "@/types/resume.type";

interface ResumeUpdateFormProps {
  onUpdate: (resume: TResume, file?: File) => Promise<void>;
  isUpdating: boolean;
  initialTitle: string;
  initialIsActive: boolean;
  resume: TResume; // Pass the entire resume to preserve other fields
}

export function ResumeUpdateForm({ onUpdate, isUpdating, initialTitle, initialIsActive, resume }: ResumeUpdateFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [isActive, setIsActive] = useState(initialIsActive);
  const [file, setFile] = useState<File | undefined>(undefined);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Construct the updated resume object
    const updatedResume: TResume = {
      ...resume, // Preserve existing fields like id, pdfUrl, createdAt, etc.
      title: title, // Updated title
      isActive: isActive, // Updated isActive
      updatedAt: new Date().toISOString(), // Update the updatedAt timestamp
    };

    await onUpdate(updatedResume, file);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex gap-2 items-center">
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Resume title"
          className="w-40"
          required
        />
        <Input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files?.[0])}
          className="w-40"
        />
      </div>
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
      <Button type="submit" disabled={isUpdating}>
        {isUpdating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Updating...
          </>
        ) : (
          "Update Resume"
        )}
      </Button>
    </form>
  );
}