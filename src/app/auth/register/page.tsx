import { Metadata } from 'next';
import RegisterForm from '@/components/auth/register-form';

export const metadata: Metadata = {
  title: 'Register - Portfolio Dashboard',
  description: 'Create a new account for your portfolio dashboard',
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen grid place-items-center">
      <div className="w-full max-w-md mx-auto p-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Create an Account</h1>
          <p className="text-muted-foreground">
            Register to manage your portfolio content
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}