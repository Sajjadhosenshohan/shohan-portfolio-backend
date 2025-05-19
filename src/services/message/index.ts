"use server";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { TMessage } from "@/types/message.type";


export const getAllMessages = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/message`, {
      method: "GET",
      headers: {
        Authorization: (await cookies()).get("accessToken")?.value || "",
      },
      next: {
        tags: ["messages"],
      },
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const addMessage = async (messageData:TMessage) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/message/add-message`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageData)
      }
    );

    revalidateTag("messages");

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteMessage = async (messageId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/message/delete-message?id=${messageId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: (await cookies()).get("accessToken")?.value || "",
        },
      }
    );
    revalidateTag("messages");

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getMessageDetails = async (messageId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/message/get-single-message?id=${messageId}`,
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
