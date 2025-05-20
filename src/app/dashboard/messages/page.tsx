import { Metadata } from "next";
import MessageList from "@/components/dashboard/messages/message-list";
import { getAllMessages } from "@/services/message";

export const metadata: Metadata = {
  title: "Messages - Portfolio Dashboard",
  description: "View and manage contact messages",
};

export default async function MessagesPage() {
  const response = await getAllMessages()
  const data = response?.data;
  return (
    <div className="space-y-6 px-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
        
      </div>
      <MessageList messages={data}/>
    </div>
  );
}