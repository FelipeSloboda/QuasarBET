// app/not-found.tsx
import Link from "next/link";
import Image from "next/image";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="bg-page min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm px-8 py-10 flex flex-col items-center text-center">

        {/* Logo */}
        <div className="mb-8">
          <Image
            src="/images/logo.png"
            alt="QuasarBet"
            width={360}
            height={90}
            priority
            className="w-full max-w-[360px] h-auto"
          />
        </div>

        {/* Erro */}
        <h1 className="text-white text-6xl font-bold mb-2">404</h1>
        <h2 className="text-white text-lg font-semibold uppercase tracking-widest mb-3">
          Página não encontrada
        </h2>
        <p className="link-focus text-sm leading-relaxed mb-8">
          A página que você tentou acessar não existe.
        </p>

        {/* Botão voltar */}
        <Link
          href="/"
          className="btn-primary w-full text-white font-bold py-3 rounded-md uppercase tracking-widest flex items-center justify-center gap-2"
        >
          <Home className="w-5 h-5" />
          Voltar ao início
        </Link>

      </div>
    </div>
  );
}