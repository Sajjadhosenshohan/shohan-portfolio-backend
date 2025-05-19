"use client";

import { useState } from "react";
import { PlusCircle, Wrench, Trash2 } from "lucide-react";
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
import { SkillForm, SkillFormValues } from "./skill-form"; // Ensure path is correct
import { TSkill } from "@/types/skill.type"; // Make sure this type is defined
import { addSkill, deleteSkill } from "@/services/skills";
import { toast } from "sonner";

export default function SkillList({ skills }: { skills: TSkill[] }) {
  // const [skills, setSkills] = useState<TSkill[]>(initialSkills);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleCreateSkill = async (values: SkillFormValues) => {
    const formData = new FormData();

    const data = {
      name: values.name,
      category: values.category,
    };
    formData.append("data", JSON.stringify(data));
    if (values.image) {
      formData.append("file", values.image);
    }

    try {
      const res = await addSkill(formData);
      if (res.success) {
        toast.success(res?.message || `Skill added successfully`);
        setIsFormOpen?.(false);
      } else {
        toast.error(res?.message || `Failed to add skill`);
      }
    } catch (error: any) {
      console.log(error.message || "Failed to add skill");
    }
  };

  const handleDeleteSkill = async (skillId: string) => {
    
    try {
      const res = await deleteSkill(skillId);
      if (res.success) {
        toast.success(res?.message || `Skill deleted successfully`);
        setIsFormOpen?.(false);
      } else {
        toast.error(res?.message || `Failed delete skill`);
      }
    } catch (error: any) {
      console.log(error.message || "Failed delete skill");
    }
  };

  // // Optional: Cleanup all object URLs when the component unmounts
  // useEffect(() => {
  //   return () => {
  //     skills.forEach((skill) => {
  //       if (skill.image && skill.image.startsWith("blob:")) {
  //         URL.revokeObjectURL(skill.image);
  //       }
  //     });
  //   };
  // }, [skills]); // Re-run if skills array changes, to correctly capture all URLs for cleanup

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold tracking-tight">Your Skills</h2>
        <Button
          onClick={() => {
            // setEditingSkill(null); // Clear any editing state
            setIsFormOpen(true);
          }}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Skill
        </Button>
      </div>

      {skills.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10 space-y-4">
            <Wrench className="h-12 w-12 text-muted-foreground/50" />
            <div className="text-center space-y-2">
              <h3 className="text-lg font-medium">No skills added</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                Add your first skill to showcase your expertise.
              </p>
            </div>
            <Button
              onClick={() => {
                // setEditingSkill(null);
                setIsFormOpen(true);
              }}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Skill
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill) => (
            <Card key={skill.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    {skill.image ? (
                      <img
                        src={skill?.image}
                        alt={skill?.name}
                        className="h-12 w-12 object-cover rounded-md"
                      />
                    ) : (
                      <div className="h-12 w-12 bg-secondary rounded-md flex items-center justify-center">
                        <Wrench className="h-6 w-6 text-muted-foreground" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-medium">{skill.name}</h3>
                      <p className="text-sm text-muted-foreground capitalize">
                        {skill.category}
                      </p>
                    </div>
                  </div>
                  {/* TODO: Add Edit Button here if needed */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Skill</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete the skill "
                          {skill.name}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          onClick={() => handleDeleteSkill(skill?.id)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <SkillForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleCreateSkill}
        // initialData={editingSkill ? { ...editingSkill, imageUrl: editingSkill.image } : undefined} // For edit
      />
    </div>
  );
}
