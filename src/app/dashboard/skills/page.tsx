import SkillList from "@/components/skills/skill-list";
import { getAllSkill } from "@/services/skills";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skills - Portfolio Dashboard",
  description: "Manage your skills and expertise",
};

export default async function SkillsPage() {
  const skills = await getAllSkill();
  const data = skills?.data;

  return (
    <div className="space-y-6 px-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Skills</h1>
       
      </div>
      <SkillList skills={data}/>
    </div>
  );
}