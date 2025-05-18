"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Mail, Calendar, User, Trash2 } from "lucide-react";
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

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  receivedAt: string;
  isRead: boolean;
}

interface MessageDetailProps {
  message: Message | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: (id: string) => void;
}

export function MessageDetail({ message, open, onOpenChange, onDelete }: MessageDetailProps) {
  if (!message) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Message from {message.name}</DialogTitle>
          <DialogDescription>
            Received on {format(new Date(message.receivedAt), "PPP 'at' p")}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-2 text-sm">
            <div className="flex items-center text-muted-foreground">
              <User className="h-4 w-4 mr-2" />
              From:
            </div>
            <div className="font-medium">{message.name}</div>
            
            <div className="flex items-center text-muted-foreground">
              <Mail className="h-4 w-4 mr-2" />
              Email:
            </div>
            <div>
              <a 
                href={`mailto:${message.email}`} 
                className="text-primary underline-offset-4 hover:underline"
              >
                {message.email}
              </a>
            </div>
            
            <div className="flex items-center text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2" />
              Date:
            </div>
            <div>{format(new Date(message.receivedAt), "PPP 'at' p")}</div>
          </div>
          
          <div className="border-t pt-4">
            <h4 className="font-medium mb-2">Message:</h4>
            <div className="bg-muted/50 p-4 rounded-md whitespace-pre-wrap">
              {message.message}
            </div>
          </div>
        </div>
        
        <DialogFooter className="gap-2 sm:justify-between">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
          
          <div className="flex gap-2">
            <Button asChild>
              <a href={`mailto:${message.email}`}>
                Reply via Email
              </a>
            </Button>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Message</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this message? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    onClick={() => {
                      onDelete(message.id);
                    }}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}