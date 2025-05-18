import { Metadata } from "next";
import ResumeList from "@/components/dashboard/resumes/resume-list";

export const metadata: Metadata = {
  title: "Resumes - Portfolio Dashboard",
  description: "Manage your resume PDFs",
};

export default function ResumesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Resumes</h1>
        <p className="text-muted-foreground">
          Manage your resume PDFs and set which one displays on your site
        </p>
      </div>
      <ResumeList />
    </div>
  );
}