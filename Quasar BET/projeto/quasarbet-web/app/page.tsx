import Link from "next/link";
import Image from "next/image";
import { LogIn, UserPlus, Info, FileText } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-page min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm px-8 py-10 flex flex-col items-center">

        {/* Logo */}
        <div className="mb-8">
          <Image
            src="/images/logoQ.png"
            alt="QuasarBet"
            width={360}
            height={90}
            priority
            className="w-full max-w-[360px] h-auto"
          />
        </div>

        {/* Título e Subtítulo */}
        <div className="w-full text-center mb-8 flex flex-col gap-2">
          <h1 className="text-white text-2xl font-bold uppercase tracking-widest">
            QUASAR BET
          </h1>
          <p className="link-focus text-sm leading-relaxed">
            Odds imbatíveis, saques rápidos e emoção em cada aposta.{" "}
            <br />
            Faça login ou cadastre-se e comece a ganhar agora!
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
            Login
          </Link>

          {/* Cadastro */}
          <Link
            href="/register"
            className="btn-secondary w-full text-white font-bold py-3 rounded-md uppercase tracking-widest flex items-center justify-center gap-2"
          >
            <UserPlus className="w-5 h-5" />
            Cadastre-se agora
          </Link>

        </div>

        {/* Links de texto */}
        <div className="w-full flex flex-col items-center gap-3 mt-8">

          <Link href="/about" className="link-focus text-sm flex items-center gap-2 hover:text-white transition-colors">
            <Info className="w-4 h-4" style={{ color: "var(--color-secondary)" }} />
            Sobre nós
          </Link>

          <Link href="/terms" className="link-focus text-sm flex items-center gap-2 hover:text-white transition-colors">
            <FileText className="w-4 h-4" style={{ color: "var(--color-secondary)" }} />
            Termos e condições
          </Link>

        </div>

      </div>
    </div>
  );
}