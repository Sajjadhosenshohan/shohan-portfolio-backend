"use client";

import { useEffect, useState } from "react";
import { FileText, Trash2, Check, Edit2 } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";
import { TResume } from "@/types/resume.type";
import { addResume, updateResume } from "@/services/resume";
import { ResumeUpdateForm } from "./ResumeUpdateForm";

export default function ResumeList({ resumes }: { resumes: TResume[] }) {
  const [isUploading, setIsUploading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    const title = "new resume";
    const formData = new FormData();
    formData.append("data", JSON.stringify({ title }));
    formData.append("file", file);

    try {
      const result = await addResume(formData);

      if (result.success) {
        const newResume: TResume = {
          id: result.data.id || Math.random().toString(36).substr(2, 9),
          title: title,
          pdfUrl: result.data.pdfUrl || "",
          publicId: result.data.publicId || null,
          createdAt: result.data.createdAt || new Date().toLocaleString(),
          updatedAt: result.data.updatedAt || new Date().toLocaleString(),
          isActive: resumes.length === 0,
        };

        toast({
          title: "Resume uploaded",
          description: `${file.name} has been uploaded successfully.`,
        });

        // Ideally, update the resume list in the parent state
      } else {
        toast({
          title: "Upload failed",
          description: result.message || "Failed to upload resume.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while uploading the resume.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = (id: string) => {
    // Ideally, delete from the database here
    toast({
      title: "Resume deleted",
      description: "The resume has been deleted successfully.",
    });
  };

  const setActive = (id: string) => {
    toast({
      title: "Active resume updated",
      description: "Your active resume has been updated.",
    });
  };

  const handleUpdate = async (resume: Partial<TResume>, file?: File) => {
    try {
      const result = await updateResume(resume, file);

      if (result.success) {
        // const updatedResume: TResume = {
        //   id: result.data.id,
        //   title: result.data.title,
        //   pdfUrl: result.data.pdfUrl,
        //   publicId: result.data.publicId || null,
        //   createdAt: result.data.createdAt,
        //   updatedAt: result.data.updatedAt || new Date().toLocaleString(),
        //   isActive: resumes.find((r) => r.id === id)?.isActive || false,
        // };

        // onUpdate(updatedResume);

        toast({
          title: "Resume updated",
          description: "The resume has been updated successfully.",
        });
      } else {
        toast({
          title: "Update failed",
          description: result.message || "Failed to update resume.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while updating the resume.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  // Base URL for the backend server
  const BASE_URL = "http://localhost:5000";

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold tracking-tight">Your Resumes</h2>
        <ResumeUploadForm
          onUpload={handleFileUpload}
          isUploading={isUploading}
        />
      </div>

      {resumes?.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10 space-y-4">
            <FileText className="h-12 w-12 text-muted-foreground/50" />
            <div className="text-center space-y-2">
              <h3 className="text-lg font-medium">No resumes uploaded</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                Upload your first resume PDF to display on your portfolio site
              </p>
            </div>
            <ResumeUploadForm
              onUpload={handleFileUpload}
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
                resume.isActive && "ring-2 ring-primary"
              )}
            >
              <CardContent className="pt-6">
                <div className="flex flex-col h-full">
                  {resume?.pdfUrl ? (
                    <div className="mb-2 w-[400px] h-[400px] overflow-hidden">
                      <iframe
                        src={`${BASE_URL}${resume.pdfUrl}`}
                        width="100%"
                        height="100%"
                        style={{ border: "none" }}
                        title={`Preview of ${resume?.title}`}
                      />
                    </div>
                  ) : (
                    <div className="mb-2 h-[60px] w-[60px] bg-gray-200 flex items-center justify-center">
                      <span className="text-xs text-gray-500">No Preview</span>
                    </div>
                  )}

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
                      <div className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full flex items-center">
                        <Check className="h-3 w-3 mr-1" />
                        Active
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-muted-foreground mb-4">
                    Uploaded: {new Date(resume?.createdAt).toLocaleString()}
                  </p>

                  <div className="flex gap-2 mt-auto">
                    {!resume.isActive && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        // onClick={() => handleSetActive(resume?.id)}
                      >
                        Set as Active
                      </Button>
                    )}

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="icon">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Update Resume</AlertDialogTitle>
                          <AlertDialogDescription>
                            Update the title or upload a new PDF for this
                            resume.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <ResumeUpdateForm
                          onUpdate={(updatedResume, file) =>
                            handleUpdate(updatedResume, file)
                          }
                          isUpdating={isUpdating}
                          initialTitle={resume.title}
                          initialIsActive={resume.isActive || false}
                          resume={resume} // Pass the entire resume object
                        />
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
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
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            onClick={() => handleDelete(resume.id)}
                          >
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
