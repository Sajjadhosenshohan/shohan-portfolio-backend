"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "../shared/image-upload";
import { TProject } from "@/types/project.type";

type ProjectFormValues = {
  id?: string;
  title: string;
  description: string;
  project_image?: File | string | null;
  client_link?: string;
  server_link?: string;
  live_link?: string;
  technologies: string[];
};

interface ProjectFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: TProject | null;
  onSubmit: (formData: FormData) => void;
  loading: boolean;
  user: any;
}

export function ProjectForm({
  open,
  onOpenChange,
  project,
  onSubmit,
  loading,
  user,
}: ProjectFormProps) {
  const [skillInput, setSkillInput] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(
    project?.project_image || null
  );

  const form = useForm<ProjectFormValues>({
    defaultValues: {
      id: project?.id || "",
      title: project?.title || "",
      description: project?.description || "",
      project_image: project?.project_image || null,
      client_link: project?.client_link || "",
      server_link: project?.server_link || "",
      live_link: project?.live_link || "",
      technologies: project?.technologies || [],
    },
  });

  useEffect(() => {
    if (project) {
      form.reset({
        id: project.id || "",
        title: project.title || "",
        description: project.description || "",
        project_image: project.project_image || null,
        client_link: project.client_link || "",
        server_link: project.server_link || "",
        live_link: project.live_link || "",
        technologies: project.technologies || [],
      });
      setPreviewImage(project.project_image || null);
    } else {
      form.reset({
        id: "",
        title: "",
        description: "",
        project_image: null,
        client_link: "",
        server_link: "",
        live_link: "",
        technologies: [],
      });
      setPreviewImage(null);
    }
  }, [project, form]);

  const handleImageUpload = (file: File) => {
    form.setValue("project_image", file);
    const previewUrl = URL.createObjectURL(file);
    setPreviewImage(previewUrl);
    return () => URL.revokeObjectURL(previewUrl);
  };

  const addSkill = () => {
    if (
      skillInput.trim() &&
      !form.getValues().technologies.includes(skillInput.trim())
    ) {
      form.setValue("technologies", [
        ...form.getValues().technologies,
        skillInput.trim(),
      ]);
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    form.setValue(
      "technologies",
      form.getValues().technologies.filter((skill) => skill !== skillToRemove)
    );
  };

  const handleSubmit = (values: ProjectFormValues) => {
    const formData = new FormData();

    const data = {
      id: project?.id || "",
      title: values.title,
      authorId: user?.id,
      description: values.description,
      client_link: values.client_link || "",
      server_link: values.server_link || "",
      live_link: values.live_link || "",
      technologies: values.technologies,
    };

    formData.append("data", JSON.stringify(data));

    if (values.project_image instanceof File) {
      formData.append("file", values.project_image);
    }

    // console.log("Submitting FormData:");
    // for (const pair of formData.entries()) {
    //   console.log(pair[0], pair[1]);
    // }

    onSubmit(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{project ? "Edit Project" : "Add Project"}</DialogTitle>
          <DialogDescription>
            {project
              ? "Update your project details"
              : "Add a new project to your portfolio"}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="title"
              rules={{ required: "Title is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Title</FormLabel>
                  <FormControl>
                    <Input placeholder="My Amazing Project" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              rules={{ required: "Description is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your project..."
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="project_image"
              render={() => (
                <FormItem>
                  <FormLabel>Project Image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={previewImage}
                      onChange={handleImageUpload}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="live_link"
              rules={{
                pattern: {
                  value: /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/i,
                  message: "Please enter a valid URL",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Live Project URL (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://myproject.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="client_link"
              rules={{
                pattern: {
                  value: /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/i,
                  message: "Please enter a valid URL",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Repository URL (optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://github.com/username/client"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="server_link"
              rules={{
                pattern: {
                  value: /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/i,
                  message: "Please enter a valid URL",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Server Repository URL (optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://github.com/username/server"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="technologies"
              render={() => (
                <FormItem>
                  <FormLabel>Technologies</FormLabel>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a technology (e.g., React)"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addSkill();
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={addSkill}
                    >
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {form.watch("technologies").map((skill, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1 px-2 py-1 bg-secondary rounded-md"
                      >
                        <span className="text-sm">{skill}</span>
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">Remove {skill}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="pt-4">
              <Button
                variant="outline"
                type="button"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading
                  ? "Processing..."
                  : project
                  ? "Update Project"
                  : "Create Project"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}