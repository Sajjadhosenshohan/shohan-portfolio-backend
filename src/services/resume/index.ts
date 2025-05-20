/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { TResume } from "@/types/resume.type";

export const getAllResume = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/resume`, {
      method: "GET",
      next: {
        tags: ["resume"],
      },
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const addResume = async (resumeData:Partial<TResume>) => {
  try {
    
    console.log(resumeData)
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/resume/add-resume`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")?.value || "",
        },
        body: JSON.stringify(resumeData),
      }
    );

    revalidateTag("resume");

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteResume = async (resumeId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/resume/delete-resume?id=${resumeId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: (await cookies()).get("accessToken")?.value || "",
        },
      }
    );
    revalidateTag("resume");

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const updateResume = async (resume:Partial<TResume>) => {

  try {
    console.log(resume)
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/resume/update-resume`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")?.value || "",
        },
        body: JSON.stringify(resume),
      }
    );

    const result = await res.json();
    console.log("result", result);
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getResumeDetails = async (resumeId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/resume/get-single-resume?id=${resumeId}`,
      {
        method: "GET",
        headers: {
          Authorization: (await cookies()).get("accessToken")?.value || "",
        },
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
