import { Metadata } from "next";
import ResumeList from "@/components/dashboard/resumes/resume-list";
import { getAllResume } from "@/services/resume";

export const metadata: Metadata = {
  title: "Resumes - Portfolio Dashboard",
  description: "Manage your resume PDFs",
};

export default async function ResumesPage() {
  const response = await getAllResume()
  const data = response?.data;
  return (
    <div className="space-y-6 px-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Resumes</h1>
       
      </div>
      <ResumeList resumes={data}/>
    </div>
  );
}