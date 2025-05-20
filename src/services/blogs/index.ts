/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
export const getAllBlog = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs`, {
      method: "GET",
      next: {
        tags: ["blogs"],
      },
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const addBlog = async (blogData: FormData) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/blogs/add-blog`,
      {
        method: "POST",
        headers: {
          Authorization: (await cookies()).get("accessToken")?.value || "",
        },
        body: blogData,
      }
    );

    revalidateTag("blogs");

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteBlog = async (blogId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/blogs/delete-blog?id=${blogId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: (await cookies()).get("accessToken")?.value || "",
        },
      }
    );
    revalidateTag("blogs");

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const updateBlog = async (formData:FormData) => {

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/blogs/update-blog`,
      {
        method: "PUT",
        headers: {
          Authorization: (await cookies()).get("accessToken")?.value || "",
        },
        body: formData,
      }
    );
    revalidateTag("blogs");

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

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
