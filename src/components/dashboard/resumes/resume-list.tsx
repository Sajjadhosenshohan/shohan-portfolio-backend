"use client";

import { useState } from "react";
import { FileText,  Trash2, Check } from "lucide-react";
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

// Demo data - in a real app this would come from your API
const demoResumes = [
  // Empty initially
];

interface Resume {
  id: string;
  filename: string;
  uploaded: string;
  isActive: boolean;
}

export default function ResumeList() {
  const [resumes, setResumes] = useState<Resume[]>(demoResumes);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = (file: File) => {
    setIsUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      const newResume: Resume = {
        id: Math.random().toString(36).substr(2, 9),
        filename: file.name,
        uploaded: new Date().toLocaleString(),
        isActive: resumes.length === 0, // First resume is active by default
      };
      
      setResumes([...resumes, newResume]);
      
      toast({
        title: "Resume uploaded",
        description: `${file.name} has been uploaded successfully.`,
      });
      
      setIsUploading(false);
    }, 1500);
  };

  const handleDelete = (id: string) => {
    const updatedResumes = resumes.filter(resume => resume.id !== id);
    
    // If the active resume was deleted, set the first remaining resume as active
    if (resumes.find(r => r.id === id)?.isActive && updatedResumes.length > 0) {
      updatedResumes[0].isActive = true;
    }
    
    setResumes(updatedResumes);
    
    toast({
      title: "Resume deleted",
      description: "The resume has been deleted successfully.",
    });
  };

  const setActive = (id: string) => {
    setResumes(resumes.map(resume => ({
      ...resume,
      isActive: resume.id === id,
    })));
    
    toast({
      title: "Active resume updated",
      description: "Your active resume has been updated.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold tracking-tight">Your Resumes</h2>
        <ResumeUploadForm onUpload={handleFileUpload} isUploading={isUploading} />
      </div>
      
      {resumes.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10 space-y-4">
            <FileText className="h-12 w-12 text-muted-foreground/50" />
            <div className="text-center space-y-2">
              <h3 className="text-lg font-medium">No resumes uploaded</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                Upload your first resume PDF to display on your portfolio site
              </p>
            </div>
            <ResumeUploadForm onUpload={handleFileUpload} isUploading={isUploading} />
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resumes.map((resume) => (
            <Card key={resume.id} className={cn(
              "relative group",
              resume.isActive && "ring-2 ring-primary"
            )}>
              <CardContent className="pt-6">
                <div className="flex flex-col h-full">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span className="font-medium truncate max-w-[150px]" title={resume.filename}>
                        {resume.filename}
                      </span>
                    </div>
                    {resume.isActive && (
                      <div className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full flex items-center">
                        <Check className="h-3 w-3 mr-1" />
                        Active
                      </div>
                    )}
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-4">
                    Uploaded: {resume.uploaded}
                  </p>
                  
                  <div className="flex gap-2 mt-auto">
                    {!resume.isActive && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => setActive(resume.id)}
                      >
                        Set as Active
                      </Button>
                    )}
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Resume</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this resume? This action cannot be undone.
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

// Helper for conditional class names
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}