"use server";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { revalidateTag } from "next/cache";
export const getAllProjects = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        tags: ["projects"],
      },
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const addProject = async (projectData: FormData) => {
  try {
    console.log("Form Data as Object:", Object.fromEntries(projectData.entries()));
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/projects/add-project`,
      {
        method: "POST",
        headers: {
          Authorization: (await cookies()).get("accessToken")?.value || "",
        },
        body: projectData,
      }
    );

    revalidateTag("projects");

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteProject = async (projectId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/projects/delete-project?projectId=${projectId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")?.value || "",
        },
      }
    );
    revalidateTag("projects");

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const updateProject = async (projectData: FormData) => {
  try {
     console.log("update as Object:", Object.fromEntries(projectData.entries()));
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/projects/update-project`,
      {
        method: "PUT",
        headers: {
          Authorization: (await cookies()).get("accessToken")?.value || "",
        },
        body: projectData,
      }
    );

    revalidateTag("projects");

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
