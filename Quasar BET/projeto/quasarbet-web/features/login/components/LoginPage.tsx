import Link from "next/link";
import Image from "next/image";
import { LogIn, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="bg-page min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm px-8 py-10 flex flex-col items-center">
        <div className="mb-8">
          <Image
            src="/images/logoQB.png"
            alt="QuasarBet"
            width={360}
            height={90}
            priority
            className="w-full max-w-[360px] h-auto"
          />
        </div>

        <div className="w-full text-center mb-6 flex flex-col gap-2">
          <h1 className="text-white text-xl font-bold uppercase tracking-widest">BEM VINDO DE VOLTA</h1>
          <p className="link-focus text-sm leading-relaxed">Acesse sua conta e continue lucrando.</p>
        </div>

        <form className="w-full flex flex-col gap-4">
          <div className="relative w-full">
            <Mail className="icon-muted absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none" />
            <input type="text" placeholder="E-mail ou CPF" className="input-base w-full rounded-md pl-10 pr-4 py-3" />
          </div>

          <div className="relative w-full">
            <Lock className="icon-muted absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none" />
            <input type="password" placeholder="Senha" className="input-base w-full rounded-md pl-10 pr-10 py-3" />
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

          <button
            type="submit"
            className="btn-primary w-full text-white font-bold py-3 rounded-md uppercase tracking-widest mt-2 flex items-center justify-center gap-2"
          >
            <LogIn className="w-5 h-5" />
            ENTRAR
          </button>

          <div className="text-center mt-1">
            <Link href="/register" className="link-focus text-sm">
              Novo por aqui? Cadastre-se
            </Link>
          </div>

          <div className="text-center mt-1">
            <Link href="/forgot-password" className="link-focus text-sm">
              Esqueceu a senha?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}