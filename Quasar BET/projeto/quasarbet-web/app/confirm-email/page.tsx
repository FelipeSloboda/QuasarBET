"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
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
  Loader2,
} from "lucide-react";
import { confirmEmail } from "@/features/confirm-email/services/confirm-email.service";

type Status = "loading" | "success" | "error";

function ConfirmEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      return;
    }

    confirmEmail(token)
      .then(() => {
        setStatus("success");
        setTimeout(() => router.replace("/login"), 2000);
      })
      .catch(() => setStatus("error"));
  }, [searchParams, router]);

  return (
    <div className="bg-page min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md px-8 py-10 flex flex-col items-center gap-6">
        <div className="mb-2">
          <Image
            src="/images/_QuasarBET.png"
            alt="QuasarBet"
            width={295}
            height={74}
            priority
            className="w-full max-w-[295px] h-auto"
          />
        </div>

        <div className="flex justify-center">
          {status === "loading" && (
            <Loader2 className="w-16 h-16 animate-spin" style={{ color: "var(--color-primary)" }} />
          )}
          {status === "success" && (
            <CircleCheckBig className="w-16 h-16" style={{ color: "var(--color-primary)" }} />
          )}
          {status === "error" && (
            <CircleAlert className="w-16 h-16 text-amber-400" />
          )}
        </div>

        <div className="text-center mb-2">
          <h1 className="text-white text-2xl font-bold uppercase tracking-widest">
            {status === "loading" && "Verificando..."}
            {status === "success" && "Email Confirmado"}
            {status === "error" && "Token Expirado"}
          </h1>
        </div>

        <div className="w-full space-y-4">
          {status === "loading" && (
            <div className="rounded-lg border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-5 backdrop-blur-md">
              <p className="text-sm text-slate-400 text-center">
                Aguarde enquanto confirmamos seu e-mail...
              </p>
            </div>
          )}

          {status === "success" && (
            <>
              <div className="rounded-lg border border-[color:var(--color-primary)]/20 bg-[var(--color-bg-secondary)] p-5 backdrop-blur-md">
                <div className="flex items-center justify-center gap-3 text-center">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "var(--color-primary)" }} />
                  <div className="text-center">
                    <p className="text-xs uppercase tracking-wider font-semibold" style={{ color: "var(--color-primary)" }}>
                      E-mail verificado
                    </p>
                    <p className="mt-2 text-sm text-white">
                      Agora você já pode acessar sua conta e começar a apostar.
                    </p>
                  </div>
                </div>
              </div>
              <Link
                href="/login"
                className="btn-primary w-full text-white font-bold py-3 rounded-lg uppercase tracking-widest mt-2 flex items-center justify-center gap-2 transition"
              >
                <LogIn className="w-5 h-5" />
                ENTRAR
              </Link>
            </>
          )}

          {status === "error" && (
            <>
              <div className="rounded-lg border border-amber-500/20 bg-[var(--color-bg-secondary)] p-5 backdrop-blur-md">
                <div className="flex items-center justify-center gap-3 text-center">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div className="text-center">
                    <p className="text-xs uppercase tracking-wider text-amber-300 font-semibold">
                      Token expirado
                    </p>
                    <p className="mt-2 text-sm text-white">
                      O token de validacao expirou. Solicite um novo e-mail de confirmacao para continuar.
                    </p>
                  </div>
                </div>
              </div>
              <Link
                href="/verify-email"
                className="btn-primary w-full text-white font-bold py-3 rounded-lg uppercase tracking-widest mt-2 flex items-center justify-center gap-2 transition"
              >
                <RotateCw className="w-5 h-5" />
                Reenviar e-mail
              </Link>
              <Link
                href="/login"
                className="link-focus w-full text-center text-sm flex items-center justify-center gap-1 py-2 hover:text-blue-300 transition"
              >
                <ArrowLeft className="w-4 h-4" style={{ color: "var(--color-primary)" }} />
                Voltar ao login
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ConfirmEmail() {
  return (
    <Suspense>
      <ConfirmEmailContent />
    </Suspense>
  );
}
