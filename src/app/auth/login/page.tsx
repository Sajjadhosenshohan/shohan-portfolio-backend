import { Metadata } from 'next';
import LoginForm from '@/components/auth/login-form';

export const metadata: Metadata = {
  title: 'Login - Portfolio Dashboard',
  description: 'Login to your portfolio dashboard',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen grid place-items-center">
      <div className="w-full max-w-md mx-auto p-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-muted-foreground">
            Enter your credentials to access your dashboard
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}