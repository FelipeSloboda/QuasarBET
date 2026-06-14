import Link from "next/link";
import Image from "next/image";
import { KeyRound, ArrowLeft, Lock } from "lucide-react";

export default function ResetPassword() {
  return (
    <div className="bg-page min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm px-8 py-10 flex flex-col items-center">

        {/* Logo */}
        <div className="mb-8">
          <Image
            src="/images/QuasarBET.png"
            alt="QuasarBet"
            width={295}
            height={74}
            priority
            className="w-full max-w-[295px] h-auto"
          />
        </div>

        {/* Título */}
        <div className="w-full text-center mb-6 flex flex-col gap-2">
          <h1 className="text-white text-xl font-bold uppercase tracking-widest">
            Redefinir senha
          </h1>
          <p className="link-focus text-sm leading-relaxed">
            Digite e confirme sua nova senha<br />
            para concluir a recuperação.
          </p>
        </div>

        {/* Formulário */}
        <form className="w-full flex flex-col gap-4">

          {/* Campo Senha 1 com ícone */}
          <div className="relative w-full">
            <Lock className="icon-muted absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none" />
            <input
              type="password"
              placeholder="Senha"
              className="input-base w-full rounded-md pl-10 pr-10 py-3"
            />
            <button
              type="button"
              className="icon-muted absolute right-3 top-1/2 -translate-y-1/2 hover:text-white transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>

          {/* Campo Senha 2 com ícone */}
          <div className="relative w-full">
            <Lock className="icon-muted absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none" />
            <input
              type="password"
              placeholder="Confirme a senha"
              className="input-base w-full rounded-md pl-10 pr-10 py-3"
            />
            <button
              type="button"
              className="icon-muted absolute right-3 top-1/2 -translate-y-1/2 hover:text-white transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>

          {/* Botão Redefinir */}
          <button
            type="submit"
            className="btn-primary w-full text-white font-bold py-3 rounded-md uppercase tracking-widest mt-2 flex items-center justify-center gap-2"
          >
            <KeyRound className="w-5 h-5" />
            REDEFINIR SENHA
          </button>

          {/* Voltar ao login */}
          <div className="text-center mt-1">
            <Link href="/login" className="link-focus text-sm flex items-center justify-center gap-1">
              <ArrowLeft className="w-4 h-4" style={{ color: "var(--color-primary)" }} />
              Voltar ao login
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
}