/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  FileText,
  Trash2,
  Check,
  Edit2,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ResumeUploadForm } from "./resume-upload-form";
import { TResume } from "@/types/resume.type";
import { addResume, deleteResume, updateResume } from "@/services/resume";
import { ResumeUpdateForm } from "./ResumeUpdateForm";
import { toast } from "sonner";
import LoadingPage from "@/app/loading";

export default function ResumeList({ resumes }: { resumes: TResume[] }) {
  const [isUploading, setIsUploading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [open, setOpen] = useState(false);

  const handleFileUpload = async (
    title: string,
    isActive: boolean,
    link: string
  ) => {
    setIsUploading(true);
    const data = { title, isActive, pdfUrl: link };

    try {
      const res = await addResume(data);
      if (res.success) {
        toast.success(res?.message || `Resume added successfully`);
      } else {
        toast.error(res?.message || `Failed to add Resume`);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to add Resume");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setIsDeleting(true);
    try {
      const res = await deleteResume(id);
      if (res.success) {
        toast.success(res?.message || `Resume deleted successfully`);
      } else {
        toast.error(res?.message || `Failed to delete Resume`);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to delete Resume");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdate = async (resume: Partial<TResume>) => {
    setIsUpdating(true);
    try {
      const res = await updateResume(resume);
      if (res.success) {
        toast.success(res?.message || `Resume updated successfully`);
      } else {
        toast.error(res?.message || `Failed to update Resume`);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update Resume");
    } finally {
      setIsUpdating(false);
    }
  };

  if (!resumes) {
    return <LoadingPage />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <ResumeUploadForm
          onUpload={async (title, isActive, link) => {
            await handleFileUpload(title, isActive, link);
          }}
          isUploading={isUploading}
        />
      </div>

      {resumes?.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10 space-y-4">
            <FileText className="h-12 w-12 text-muted-foreground/50" />
            <div className="text-center space-y-2">
              <h3 className="text-lg font-medium">No resumes added</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                Add your first resume link to display on your portfolio site
              </p>
            </div>
            <ResumeUploadForm
              onUpload={async (title, isActive, link) => {
                await handleFileUpload(title, isActive, link);
              }}
              isUploading={isUploading}
            />
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resumes?.map((resume: TResume) => (
            <Card
              key={resume.id}
              className={cn(
                "relative group",
                resume.isActive ? "border-2 border-red-500" : ""
              )}
            >
              <CardContent className="pt-6">
                <div className="flex flex-col h-full">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span
                        className="font-medium truncate max-w-[150px]"
                        title={resume?.title}
                      >
                        {resume?.title}
                      </span>
                    </div>
                    {resume?.isActive && (
                      <div className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full flex items-center">
                        <Check className="h-3 w-3 mr-1" />
                        Active
                      </div>
                    )}
                  </div>

                  <a
                    href={resume.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-blue-600 hover:underline mb-4"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    View Resume
                  </a>

                  <p className="text-xs text-muted-foreground mb-4">
                    Added: {new Date(resume?.createdAt).toLocaleDateString()}
                  </p>

                  <div className="flex gap-2 justify-center items-center">
                    <AlertDialog>
                      <AlertDialogTrigger onClick={()=> setOpen(true)} asChild>
                        <Button variant="outline" size="icon">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      {open && (
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Update Resume</AlertDialogTitle>
                            <AlertDialogDescription>
                              Update the title or change the link for this
                              resume.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <ResumeUpdateForm
                            onUpdate={(updatedResume) =>
                              handleUpdate(updatedResume)
                            }
                            onClose={() => setOpen(false)}
                            isUpdating={isUpdating}
                            initialTitle={resume.title}
                            initialIsActive={resume.isActive || false}
                            initialLink={resume.pdfUrl}
                            resume={resume}
                          />
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      )}
                    </AlertDialog>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          className="text-white"
                          variant="destructive"
                          size="icon"
                          disabled={isDeleting}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Resume</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this resume? This
                            action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-destructive !text-white text-destructive-foreground hover:bg-destructive/90"
                            onClick={() => handleDelete(resume?.id)}
                          >
                            {isDeleting ? (
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : null}
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
