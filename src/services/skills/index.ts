"use server";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

export const getAllSkill = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/skills`, {
      method: "GET",
      next: {
        tags: ["skills"],
      },
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const addSkill = async (skillData: FormData) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/skills/add-skill`,
      {
        method: "POST",
        headers: {
          Authorization: (await cookies()).get("accessToken")?.value || "",
        },
        body: skillData,
      }
    );

    revalidateTag("skills");

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteSkill = async (skillId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/skills/delete-skill?id=${skillId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: (await cookies()).get("accessToken")?.value || "",
        },
      }
    );
    revalidateTag("skills");

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// export const updateResume = async (resume:Partial<TResume>, file?: File) => {
//   const formData = new FormData();
//   formData.append("data", JSON.stringify({ ...resume }));
//   if (file) {
//     formData.append("file", file);
//   }

//   console.log(Object.fromEntries(formData.entries()));
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_API}/resume/update-resume`,
//       {
//         method: "PUT",
//         headers: {
//           Authorization: (await cookies()).get("accessToken")?.value || "",
//         },
//         body: formData,
//       }
//     );

//     const result = await res.json();
//     console.log("result", result);
//     return result;
//   } catch (error: any) {
//     return Error(error);
//   }
// };

// export const getResumeDetails = async (resumeId: string) => {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_API}/resume/get-single-resume?id=${resumeId}`,
//       {
//         method: "GET",
//         headers: {
//           Authorization: (await cookies()).get("accessToken")?.value || "",
//         },
//       }
//     );

//     const result = await res.json();
//     return result;
//   } catch (error: any) {
//     return Error(error);
//   }
// };
