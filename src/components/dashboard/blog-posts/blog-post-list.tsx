"use client";

import { useState } from "react";
import {
  PlusCircle,
  Newspaper,
  Pencil,
  Trash2,
  Eye,
  CalendarIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { BlogPostForm } from "./blog-post-form";
import { useToast } from "@/hooks/use-toast";
import { TBlog } from "@/types/blog.type";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  imageUrl: string;
  publishedAt: string;
  status: "draft" | "published";
  tags: string[];
}

export default function BlogPostList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [postToEdit, setPostToEdit] = useState<BlogPost | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { toast } = useToast();

  const handleCreatePost = (post: TBlog) => {};

  const handleUpdatePost = (updatedPost: BlogPost) => {
    setPosts(
      posts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );

    toast({
      title:
        updatedPost.status === "published" ? "Post updated" : "Draft updated",
      description: "Your blog post has been updated successfully.",
    });

    setPostToEdit(null);
    setIsFormOpen(false);
  };

  const handleDeletePost = (id: string) => {
    setPosts(posts.filter((post) => post.id !== id));

    toast({
      title: "Post deleted",
      description: "The blog post has been deleted successfully.",
    });
  };

  const openEditForm = (post: BlogPost) => {
    setPostToEdit(post);
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold tracking-tight">
          Your Blog Posts
        </h2>
        <Button
          onClick={() => {
            setPostToEdit(null);
            setIsFormOpen(true);
          }}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          New Post
        </Button>
      </div>

      {posts.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10 space-y-4">
            <Newspaper className="h-12 w-12 text-muted-foreground/50" />
            <div className="text-center space-y-2">
              <h3 className="text-lg font-medium">No blog posts yet</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                Create your first blog post to share your thoughts and ideas
              </p>
            </div>
            <Button
              onClick={() => {
                setPostToEdit(null);
                setIsFormOpen(true);
              }}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Blog Post
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-4">
                <div className="aspect-video md:aspect-square w-full overflow-hidden bg-muted">
                  {post.imageUrl ? (
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-secondary">
                      <Newspaper className="h-10 w-10 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex gap-2">
                      <span
                        className={`px-2 py-1 text-xs rounded-full uppercase font-medium ${
                          post.status === "published"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                            : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100"
                        }`}
                      >
                        {post.status}
                      </span>
                      {post.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-xs bg-secondary rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <CalendarIcon className="h-3 w-3 mr-1" />
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </div>
                  </div>

                  <h3 className="font-semibold text-lg">{post.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                    {post.excerpt}
                  </p>

                  <div className="flex gap-2 mt-4 pt-4 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => openEditForm(post)}
                    >
                      <Pencil className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-1" />
                      Preview
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="flex-1"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Blog Post</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this blog post? This
                            action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            onClick={() => handleDeletePost(post.id)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <BlogPostForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        post={postToEdit}
        onSubmit={postToEdit ? handleUpdatePost : handleCreatePost}
      />
    </div>
  );
}
