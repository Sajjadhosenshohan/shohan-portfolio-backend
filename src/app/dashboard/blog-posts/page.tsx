import { Metadata } from "next";
import BlogPostList from "@/components/dashboard/blog-posts/blog-post-list";
import { getAllBlog } from "@/services/blogs";

export const metadata: Metadata = {
  title: "Blog Posts - Portfolio Dashboard",
  description: "Manage your blog posts",
};

export default async function BlogPostsPage() {
  const res = await getAllBlog();
  const data = res?.data;
  return (
    <div className="space-y-6 px-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Blog Posts</h1>
        
      </div>
      <BlogPostList blogs={data}/>
    </div>
  );
}