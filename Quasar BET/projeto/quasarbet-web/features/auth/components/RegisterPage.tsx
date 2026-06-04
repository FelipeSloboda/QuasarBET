"use client";

import DateInput from "@/components/form/DateInput";
import Link from "next/link";
import Image from "next/image";
import { UserPlus, User, CreditCard, Mail, Phone, Calendar, Lock } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="bg-page min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm px-8 py-10 flex flex-col items-center">
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

        <div className="w-full text-center mb-6 flex flex-col gap-2">
          <h1 className="text-white text-xl font-bold uppercase tracking-widest">CRIE SUA CONTA</h1>
          <p className="link-focus text-sm leading-relaxed">Cadastre-se agora e comece a lucrar.</p>
        </div>

        <form className="w-full flex flex-col gap-4">
          <div className="relative w-full">
            <User className="icon-muted absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none" />
            <input type="text" placeholder="Nome completo" className="input-base w-full rounded-md pl-10 pr-4 py-3" />
          </div>

          <div className="relative w-full">
            <CreditCard className="icon-muted absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none" />
            <input type="text" placeholder="CPF" className="input-base w-full rounded-md pl-10 pr-4 py-3" />
          </div>

          <div className="relative w-full">
            <Mail className="icon-muted absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none" />
            <input type="email" placeholder="E-mail" className="input-base w-full rounded-md pl-10 pr-4 py-3" />
          </div>

          <div className="relative w-full">
            <Phone className="icon-muted absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none" />
            <input type="tel" placeholder="Telefone" className="input-base w-full rounded-md pl-10 pr-4 py-3" />
          </div>

          <div className="relative w-full">
            <Calendar className="icon-muted absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none z-10" />
            <DateInput />
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

          <div className="flex items-start gap-3 mt-4 mb-4">
            <input type="checkbox" id="terms-checkbox" className="w-5 h-5 mt-0.5 cursor-pointer accent-blue-500" />
            <label htmlFor="terms-checkbox" className="text-sm leading-relaxed cursor-pointer">
              Aceito com os{" "}
              <Link
                href="/terms"
                className="text-blue-500 hover:text-blue-600 hover:underline font-semibold transition"
                target="_blank"
              >
                termos e regulamentos
              </Link>
            </label>
          </div>

          <button
            type="submit"
            className="btn-primary w-full text-white font-bold py-3 rounded-md uppercase tracking-widest mt-2 flex items-center justify-center gap-2"
          >
            <UserPlus className="w-5 h-5" />
            Cadastrar
          </button>

          <div className="text-center mt-1">
            <Link href="/login" className="link-focus text-sm">
              Já tem uma conta? Faça login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}