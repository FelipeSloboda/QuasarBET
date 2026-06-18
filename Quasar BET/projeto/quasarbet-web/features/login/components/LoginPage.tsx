import LoginForm from "@/features/login/components/login/LoginForm";
import LoginHero from "@/features/login/components/login/LoginHero";

export default function LoginPage() {
  return (
    <div className="bg-page min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm px-8 py-10 flex flex-col items-center">
        <LoginHero />
        <LoginForm />
      </div>
    </div>
  );
}