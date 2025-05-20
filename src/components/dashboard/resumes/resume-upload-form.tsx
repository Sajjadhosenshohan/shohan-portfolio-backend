"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ResumeUploadFormProps {
  onUpload: (title: string, isActive: boolean, link: string) => Promise<void>;
  isUploading: boolean;
}

export function ResumeUploadForm({ onUpload, isUploading }: ResumeUploadFormProps) {
  const [title, setTitle] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [link, setLink] = useState("");
  const [open, setOpen] = useState(false);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (link) {
      await onUpload(title, isActive, link);
      setOpen(false);
      resetForm();
    }
  };

  const resetForm = () => {
    setTitle("");
    setIsActive(false);
    setLink("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="text-white" variant={"destructive"}>
          <Upload className="mr-2 h-4 w-4" />
          Add Resume Link
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Resume Link</DialogTitle>
          <DialogDescription>
            Add a new resume link to your portfolio
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleUpload} className="space-y-4">
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
            // required
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

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              type="button"
              onClick={() => {
                setOpen(false);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button 
              variant={"destructive"}
              className="text-white"
              type="submit" 
              disabled={isUploading || !link || !title}
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Resume Link"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}