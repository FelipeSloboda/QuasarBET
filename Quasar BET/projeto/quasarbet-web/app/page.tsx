import Link from "next/link";
import Image from "next/image";
import { LogIn, UserPlus, Info, FileText } from "lucide-react";
import { Footer } from "@/components/ui/Footer";

export default function Home() {
  return (
    <div className="bg-page min-h-screen flex flex-col">
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-sm px-8 py-10 flex flex-col items-center">

        {/* Logo */}
        <div className="mb-20">
          <Image
            src="/images/_QuasarBET.png"
            alt="QuasarBet"
            width={295}
            height={74}
            priority
            className="w-full max-w-[295px] h-auto"
          />
        </div>

        {/* Título e Subtítulo */}
        <div className="w-full text-center mb-8 flex flex-col gap-2">
          <p className="link-focus text-sm leading-relaxed">
            Chances reais de vitória, saques rápidos e emoção em cada aposta.{" "}
            <br /><br />
            Faça login ou cadastre-se e comece a apostar!
          </p>
        </div>

        {/* Botões */}
        <div className="w-full flex flex-col gap-4">

          {/* Login */}
          <Link
            href="/login"
            className="btn-primary w-full text-white font-bold py-3 rounded-md uppercase tracking-widest flex items-center justify-center gap-2"
          >
            <LogIn className="w-5 h-5" />
            ENTRAR
          </Link>

          {/* Cadastro */}
          <Link
            href="/register"
            className="w-full bg-transparent text-white font-bold py-3 rounded-md uppercase tracking-widest flex items-center justify-center gap-2 border border-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)]/10 transition-colors active:scale-95 active:bg-[color:var(--color-primary)]/20"
          >
            <UserPlus className="w-5 h-5" />
            CADASTRE-SE
          </Link>

        </div>

        {/* Divider */}
        <div className="mt-14 mb-6 flex justify-center">
          <div className="h-px w-50 bg-white/50" />
        </div>

        {/* Links de texto */}
        <div className="w-full flex flex-col items-center gap-3 mt-4">
          <Link href="/terms" className="link-focus text-sm flex items-center gap-2 hover:text-white transition-colors">
            <FileText className="w-4 h-4" style={{ color: "var(--color-primary)" }} />
            Termos e regulamentos
          </Link>

          <Link href="/about" className="link-focus text-sm flex items-center gap-2 hover:text-white transition-colors">
            <Info className="w-4 h-4" style={{ color: "var(--color-primary)" }} />
            Sobre nós
          </Link>
          
        </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}