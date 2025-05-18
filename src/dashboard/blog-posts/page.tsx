import { Metadata } from "next";
import BlogPostList from "@/components/dashboard/blog-posts/blog-post-list";

export const metadata: Metadata = {
  title: "Blog Posts - Portfolio Dashboard",
  description: "Manage your blog posts",
};

export default function BlogPostsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Blog Posts</h1>
        <p className="text-muted-foreground">
          Create and manage your blog content
        </p>
      </div>
      <BlogPostList />
    </div>
  );
}