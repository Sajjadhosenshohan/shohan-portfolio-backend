"use client";

import { useState } from "react";
import { MessageSquare, Trash2, Mail, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
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
import { MessageDetail } from "./message-detail";
import { TMessage } from "@/types/message.type";
import { deleteMessage, getMessageDetails } from "@/services/message";

export default function MessageList({ messages }: { messages: TMessage[] }) {
  // const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<TMessage | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleDeleteMessage = async (id: string) => {
   try {
      const res = await deleteMessage(id);
      console.log("delete message", res?.data)
      if (res.success) {
        // setSelectedMessage(res?.data);
        setIsDetailOpen(false);
      } else {
        console.log(res?.message);
      }
    } catch (error: any) {
      console.log(error?.message || `Failed to delete message`);
    } finally {
      setLoading(false);
    }
  };

  const openMessageDetail = async (id:string) => {
    try {
      const res = await getMessageDetails(id);
      console.log("message", res?.data)
      if (res.success) {
        setSelectedMessage(res?.data);
        setIsDetailOpen(true);
      } else {
        console.log(res?.message);
      }
    } catch (error: any) {
      console.log(error?.message || `Failed to get message`);
    } finally {
      setLoading(false);
    }
  };

  // const unreadCount = messages.filter(message => !message.isRead).length;

  if(loading) return <div className="text center mx-auto">Loading....</div>
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold tracking-tight">Your Messages</h2>
        {/* {unreadCount > 0 && (
          <div className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs">
            {unreadCount} unread
          </div>
        )} */}
      </div>

      {messages.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10 space-y-4">
            <MessageSquare className="h-12 w-12 text-muted-foreground/50" />
            <div className="text-center space-y-2">
              <h3 className="text-lg font-medium">No messages yet</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                Messages sent through your contact form will appear here
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {messages?.map((message:TMessage) => (
            <Card
              key={message.id}
              className={`
                cursor-pointer hover:bg-muted/50 transition-colors border-l-4 border-l-primary
              `}
              onClick={() => openMessageDetail(message?.id)}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <h3 className="font-medium">
                        {message.name}
                        {/* {!message.isRead && (
                          <span className="ml-2 inline-block w-2 h-2 rounded-full bg-primary"></span>
                        )} */}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span>{message.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{format(new Date(message.createdAt), "PP")}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div>
                      <Button variant={'outline'} className="cursor-pointer">See details</Button>
                    </div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant={'outline'} onClick={(e) => {
                            e.stopPropagation();
                          }} className="cursor-pointer">Delete</Button>
                        {/* <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button> */}
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Message</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this message? This
                            action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel onClick={(e)=> {
                            e.stopPropagation();
                          }}>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            onClick={() => handleDeleteMessage(message.id)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
                <p className="text-sm mt-2 line-clamp-2">{message.message}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <MessageDetail
        message={selectedMessage}
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        onDelete={handleDeleteMessage}
      />
    </div>
  );
}
