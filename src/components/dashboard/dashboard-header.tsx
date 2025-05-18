"use client";

import Link from "next/link";
import { UserCheck, Menu,  } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import DashboardNav from "./dashboard-nav";
import { UserNav } from "./user-nav";
export function DashboardHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-4 md:gap-2">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <div className="flex items-center gap-2 px-2 py-2">
                <UserCheck className="h-5 w-5" />
                <span className="font-medium">Portfolio Dashboard</span>
              </div>
              <div className="py-4">
                <DashboardNav setOpen={setOpen} />
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/dashboard" className="flex items-center gap-2">
            <UserCheck className="h-5 w-5" />
            <span className="hidden font-medium md:inline-block">
              Portfolio Dashboard
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <UserNav />
        </div>
      </div>
    </header>
  );
}