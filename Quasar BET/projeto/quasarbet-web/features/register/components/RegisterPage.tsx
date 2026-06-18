"use client";

import RegisterForm from "@/features/register/components/register/RegisterForm";
import RegisterHero from "@/features/register/components/register/RegisterHero";

export default function RegisterPage() {
  return (
    <div className="bg-page min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm px-8 py-10 flex flex-col items-center">
        <RegisterHero />
        <RegisterForm />
      </div>
    </div>
  );
}