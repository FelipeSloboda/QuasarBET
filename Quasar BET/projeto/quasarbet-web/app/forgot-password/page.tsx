import Link from "next/link";
import Image from "next/image";
import { KeyRound, ArrowLeft, User } from "lucide-react";

export default function ForgotPassword() {
  return (
    <div className="bg-page min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm px-8 py-10 flex flex-col items-center">

        {/* Logo */}
        <div className="mb-8">
          <Image
            src="/images/_QuasarBET.png"
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
            Esqueceu a senha?
          </h1>
          <p className="link-focus text-sm leading-relaxed">
            Informe seu e-mail ou CPF cadastrado.<br />
            Enviaremos as instruções para redefinir sua senha.
          </p>
        </div>

        {/* Formulário */}
        <form className="w-full flex flex-col gap-4">

          {/* Campo E-mail ou CPF */}
          <div className="relative w-full">
            <User className="icon-muted absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none" />
            <input
              type="text"
              placeholder="E-mail ou CPF"
              className="input-base w-full rounded-md pl-10 pr-4 py-3"
            />
          </div>

          {/* Botão Redefinir */}
          <button
            type="submit"
            className="btn-primary w-full text-white font-bold py-3 rounded-md uppercase tracking-widest mt-2 flex items-center justify-center gap-2"
          >
            <KeyRound className="w-5 h-5" />
            ESQUECI MINHA SENHA
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