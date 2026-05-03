"use client";

import DateInput from "@/components/DateInput";
import Link from "next/link";
import Image from "next/image";
import { UserPlus } from "lucide-react";

export default function Register() {
  return (
    <div className="bg-page min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm px-8 py-10 flex flex-col items-center">

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

        {/* Formulário */}
        <form className="w-full flex flex-col gap-4">

          {/* Nome Completo */}
          <input
            type="text"
            placeholder="Nome completo"
            className="input-base w-full rounded-md px-4 py-3"
          />

          {/* CPF */}
          <input
            type="text"
            placeholder="CPF"
            className="input-base w-full rounded-md px-4 py-3"
          />

          {/* E-mail */}
          <input
            type="email"
            placeholder="E-mail"
            className="input-base w-full rounded-md px-4 py-3"
          />

          {/* Telefone */}
          <input
            type="tel"
            placeholder="Telefone"
            className="input-base w-full rounded-md px-4 py-3"
          />

          {/* Data de Nascimento */}
          <DateInput />

          {/* Senha com ícone */}
          <div className="relative w-full">
            <input
              type="password"
              placeholder="Senha"
              className="input-base w-full rounded-md px-4 py-3"
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

          {/* Botão Cadastrar */}
          <button
            type="submit"
            className="btn-secondary w-full text-white font-bold py-3 rounded-md uppercase tracking-widest mt-2 flex items-center justify-center gap-2"
          >
            <UserPlus className="w-5 h-5" />
            Cadastrar
          </button>

          {/* Voltar para login */}
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