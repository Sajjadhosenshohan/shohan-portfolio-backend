import { Metadata } from "next";
import MessageList from "@/components/dashboard/messages/message-list";
import { getAllMessages } from "@/services/message";

export const metadata: Metadata = {
  title: "Messages - Portfolio Dashboard",
  description: "View and manage contact messages",
};

export default async function MessagesPage() {
  const messageList = await getAllMessages()
  const data = messageList?.data || [];
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
        <p className="text-muted-foreground">
          View and manage messages from your contact form
        </p>
      </div>
      <MessageList messages={data}/>
    </div>
  );
}