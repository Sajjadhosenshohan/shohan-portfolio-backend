import { Metadata } from "next";
import ProjectList from "@/components/dashboard/projects/project-list";

export const metadata: Metadata = {
  title: "Projects - Portfolio Dashboard",
  description: "Manage your portfolio projects",
};

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <p className="text-muted-foreground">
          Manage your portfolio projects and skills
        </p>
      </div>
      <ProjectList />
    </div>
  );
}