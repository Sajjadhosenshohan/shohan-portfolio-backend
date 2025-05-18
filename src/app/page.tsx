import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { UserCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Portfolio Dashboard',
  description: 'Manage your portfolio content',
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center px-4 sm:px-6">
          <div className="flex gap-2 items-center font-semibold text-lg">
            <UserCheck className="h-6 w-6" />
            <span>Portfolio Dashboard</span>
          </div>
          <div className="ml-auto flex gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/auth/register">Register</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 container max-w-5xl py-16 grid place-items-center">
        <div className="text-center space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Welcome to your Portfolio Dashboard
          </h1>
          <p className="text-muted-foreground text-lg max-w-[42rem] mx-auto">
            Manage your portfolio content with ease. Upload resumes, create projects, write blogs, and manage messages all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button asChild size="lg">
              <Link href="/auth/login">
                Login to Dashboard
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/auth/register">
                Create an Account
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 md:h-16">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Portfolio Dashboard. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}