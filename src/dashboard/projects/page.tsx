import { Metadata } from "next";
import ProjectList from "@/components/dashboard/projects/project-list";
import { getAllProjects } from "@/services/project";

export const metadata: Metadata = {
  title: "Projects - Portfolio Dashboard",
  description: "Manage your portfolio projects",
};

export default async function ProjectsPage() {
  const projectList = await getAllProjects()
    const data = projectList?.data || [];
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <p className="text-muted-foreground">
          Manage your portfolio projects and skills
        </p>
      </div>
      <ProjectList AllProject={data}/>
    </div>
  );
}