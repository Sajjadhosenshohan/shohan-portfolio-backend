"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { 
  FileText, 
  FolderKanban, 
  Newspaper, 
  MessageSquare, 
  LayoutDashboard,
  LucideIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

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
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
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

  return (
    <nav className="grid items-start gap-2 px-2 text-sm font-medium">
      {navItems.map((item, index) => (
        <div key={index}>
          <Link
            href={item.href}
            onClick={() => {
              if (setOpen) setOpen(false);
            }}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              pathname === item.href ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline",
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
    </nav>
  );
}