import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  CircleAlert,
  CircleCheckBig,
  LogIn,
  RotateCw,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

export default function ConfirmEmail() {
  const isSuccess = false; /* STATUS DO TOKEN */

  return (
    <div className="bg-page min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md px-8 py-10 flex flex-col items-center gap-6">
        <div className="mb-2">
          <Image
            src="/images/logoQB.png"
            alt="QuasarBet"
            width={360}
            height={90}
            priority
            className="w-full max-w-[280px] h-auto"
          />
        </div>

        <div className="flex justify-center">
          {isSuccess ? (
            <CircleCheckBig className="w-16 h-16 text-emerald-400" />
          ) : (
            <CircleAlert className="w-16 h-16 text-amber-400" />
          )}
        </div>

        <div className="text-center mb-2">
          <h1 className="text-white text-2xl font-bold uppercase tracking-widest">
            {isSuccess ? "Email Confirmado" : "Token Expirado"}
          </h1>
        </div>

        <div className="w-full space-y-4">
          {isSuccess ? (
            <div className="rounded-lg border border-emerald-500/20 bg-[var(--color-bg-secondary)] p-5 backdrop-blur-md">
              <div className="flex items-center justify-center gap-3 text-center">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-center">
                  <p className="text-xs uppercase tracking-wider text-emerald-300 font-semibold">
                    E-mail verificado
                  </p>
                  <p className="mt-2 text-sm text-white">
                    Agora você ja pode acessar sua conta e começar a apostar.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-lg border border-amber-500/20 bg-[var(--color-bg-secondary)] p-5 backdrop-blur-md">
              <div className="flex items-center justify-center gap-3 text-center">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-center">
                  <p className="text-xs uppercase tracking-wider text-amber-300 font-semibold">
                    token expirado
                  </p>
                  <p className="mt-2 text-sm text-white">
                    O token de validacao expirou. Solicite um novo e-mail de confirmacao para continuar.
                  </p>
                </div>
              </div>
            </div>
          )}

          {isSuccess ? (
            <Link
              href="/login"
              className="btn-primary w-full text-white font-bold py-3 rounded-lg uppercase tracking-widest mt-2 flex items-center justify-center gap-2 transition"
            >
              <LogIn className="w-5 h-5" />
              ENTRAR
            </Link>
          ) : (
            <Link
              href="/verify-email"
              className="btn-primary w-full text-white font-bold py-3 rounded-lg uppercase tracking-widest mt-2 flex items-center justify-center gap-2 transition"
            >
              <RotateCw className="w-5 h-5" />
              Reenviar e-mail
            </Link>
          )}

          {isSuccess ? null : (
          <Link
            href="/login"
            className="link-focus w-full text-center text-sm flex items-center justify-center gap-1 py-2 hover:text-blue-300 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao login
          </Link>
          )}
        </div>
      </div>
    </div>
  );
}