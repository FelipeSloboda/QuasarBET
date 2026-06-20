"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MailCheck, RotateCw, Clock3, ArrowLeft } from "lucide-react";
import { resendEmailVerification } from "@/features/verify-email/services/verify-email.service";

interface VerifyEmailData {
  id: number;
  email: string;
  password: string;
  token: string;
}

export default function VerifyEmail() {
  const router = useRouter();
  const hydrated = useRef(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [data, setData] = useState<VerifyEmailData | null>(null);
  const [resendError, setResendError] = useState<string | null>(null);
  const [resending, setResending] = useState(false);

  useLayoutEffect(() => {
    hydrated.current = true;
  }, []);

  useEffect(() => {
    const raw = sessionStorage.getItem("verifyEmail");
    if (raw) {
      setData(JSON.parse(raw) as VerifyEmailData);
    } else {
      router.replace("/"); //RETORNA PARA PAGINA HOME
    }
  }, [router]);

  useEffect(() => {
    if (!hydrated.current || timeLeft === 0) {
      return;
    }

    const timer = window.setTimeout(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [timeLeft]);

  async function handleResendEmail() {
    if (timeLeft > 0 || !data || resending) {
      return;
    }

    setResendError(null);
    setResending(true);

    try {
      await resendEmailVerification(data.token);
      setTimeLeft(60);
    } catch {
      setResendError("Não foi possível reenviar o e-mail. Tente novamente.");
    } finally {
      setResending(false);
    }
  }

  const display = timeLeft;
  const minutes = String(Math.floor(display / 60)).padStart(2, "0");
  const seconds = String(display % 60).padStart(2, "0");

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

        <div className="text-center mb-4">
          <h1 className="text-white text-2xl font-bold uppercase tracking-widest">
            Verifique seu E-mail
          </h1>
          <p className="link-focus text-sm leading-relaxed mt-2">
            Enviamos um link de confirmacao. Acesse sua caixa de entrada e confirme o cadastro.
          </p>
        </div>

        <div className="w-full space-y-4">
          <div className="rounded-lg border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-5 backdrop-blur-md">
            <div className="flex items-center justify-center gap-3">
              <MailCheck className="w-6 h-6 shrink-0" style={{ color: "var(--color-primary)" }} />
              <div className="text-center">
                <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                  E-mail enviado
                </p>
                <p className="mt-2 text-sm text-white break-all font-mono">
                  {data?.email ?? "seuemail@exemplo.com"}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-5 backdrop-blur-md">
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-2 text-slate-400">
                <Clock3 className="w-4 h-4" style={{ color: "var(--color-primary)" }} />
                <span className="text-xs uppercase tracking-wider font-semibold">
                  Proxima tentativa em
                </span>
              </div>
              <p className="text-3xl font-bold tracking-widest text-white tabular-nums">
                {minutes}:{seconds}
              </p>
              <p className="text-xs text-slate-500 text-center">
                Voce podera reenviar o e-mail apos este tempo
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleResendEmail}
            disabled={timeLeft > 0}
            suppressHydrationWarning
            className="btn-primary w-full text-white font-bold py-3 rounded-lg uppercase tracking-widest mt-6 flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-50 transition"
          >
            <RotateCw className="w-5 h-5" />
            Reenviar e-mail
          </button>

          <Link
            href="/login"
            className="link-focus w-full text-center text-sm flex items-center justify-center gap-1 py-2 hover:text-blue-300 transition"
          >
            <ArrowLeft className="w-4 h-4" style={{ color: "var(--color-primary)" }} />
            Voltar ao login
          </Link>
        </div>
      </div>
    </div>
  );
}