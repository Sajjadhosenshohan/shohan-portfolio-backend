"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  // FileText,
  FolderKanban,
  Newspaper,
  MessageSquare,
  LucideIcon,
  Wrench,
  FileText,
  // LayoutDashboard,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { logoutUser } from "@/services/authService";

interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  submenu?: { title: string; href: string }[];
}

interface DashboardNavProps {
  setOpen?: (open: boolean) => void;
}

const navItems: NavItem[] = [
  // {
  //   title: "Dashboard",
  //   href: "/dashboard",
  //   icon: LayoutDashboard,
  // },
  {
    title: "Resumes",
    href: "/dashboard/resumes",
    icon: FileText,
  },
  {
    title: "Projects",
    href: "/dashboard/projects",
    icon: FolderKanban,
  },
  {
    title: "Skills",
    href: "/dashboard/skills",
    icon: Wrench,
  },
  {
    title: "Blog Posts",
    href: "/dashboard/blog-posts",
    icon: Newspaper,
  },
  {
    title: "Messages",
    href: "/dashboard/messages",
    icon: MessageSquare,
  },
];

export default function DashboardNav({ setOpen }: DashboardNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const handleSignOut = async () => {
    await logoutUser();
    toast.success("Logged out successfully");
    router.push("/");
  };
  return (
    <nav className="flex flex-col  h-[calc(100vh-4rem)]  justify-between gap-2 px-2 text-sm font-medium ">
      <div>
        {navItems.map((item, index) => (
          <div key={index}>
            <Link
              href={item.href}
              onClick={() => {
                if (setOpen) setOpen(false);
              }}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                pathname === item.href
                  ? "bg-muted text-red-600 hover:bg-muted"
                  : "hover:bg-transparent hover:underline",
                "justify-start"
              )}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.title}
            </Link>

            {item.submenu && pathname.includes(item.href) ? (
              <div className="ml-4 mt-2 grid gap-1">
                {item.submenu.map((submenuItem, subIndex) => (
                  <Link
                    key={subIndex}
                    href={submenuItem.href}
                    onClick={() => {
                      if (setOpen) setOpen(false);
                    }}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "sm" }),
                      pathname === submenuItem.href
                        ? "bg-muted hover:bg-muted"
                        : "hover:bg-transparent hover:underline",
                      "justify-start"
                    )}
                  >
                    {submenuItem.title}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>

      <div>
        <Button
          className="cursor-pointer text-white w-full"
          variant="destructive"
          onClick={handleSignOut}
        >
          Log out
        </Button>
      </div>
    </nav>
  );
}
