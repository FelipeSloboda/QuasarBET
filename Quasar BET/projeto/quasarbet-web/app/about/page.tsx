import Link from "next/link";
import Image from "next/image";
import {
  CircleCheck,
  LogIn,
  UserPlus,
  Lightbulb,
  ListChecks,
  Target,
} from "lucide-react";

export default function About() {
  return (
    <div className="bg-page min-h-screen text-white">
      <main className="mx-auto w-full max-w-3xl px-8 py-10 md:py-14">
        <div className="mb-8 flex justify-center">
          <Image
            src="/images/_QuasarBET.png"
            alt="QuasarBet"
            width={295}
            height={74}
            priority
            className="h-auto w-full max-w-[295px]"
          />
        </div>

        <section className="mt-8 space-y-6 text-sm leading-relaxed text-slate-300 md:text-base">
          
          <div>
              <h2 className="mb-2 flex items-center justify-center gap-2 text-center text-lg font-bold uppercase tracking-wide text-white">
                <Target className="h-5 w-5" style={{ color: "var(--color-primary)" }} />
                OBJETIVO E VISÃO
              </h2>
              <p>
                Queremos mudar a forma como as pessoas enxergam plataformas de
                apostas online, com mais chances justas e reais, e transparência.
              </p>
          </div>      

          <div>
            <h2 className="mb-2 flex items-center justify-center gap-2 text-center text-lg font-bold uppercase tracking-wide text-white">
              <Lightbulb className="h-5 w-5" style={{ color: "var(--color-primary)" }} />
              NOSSA PROPOSTA
            </h2>
            <p>
              A Quasar Bet nasceu para oferecer uma experiência com
              chances reais de lucro no mercado de apostas online. Nosso 
              compromisso é garantir que os usuários tenham acesso a plataforma 
              justa, confiavel, com saques rápidos e uma plataforma seguraça.
            </p>
          </div>

          <div>
            <h2 className="mb-2 flex items-center justify-center gap-2 text-center text-lg font-bold uppercase tracking-wide text-white">
              <ListChecks className="h-5 w-5" style={{ color: "var(--color-primary)" }} />
              DIFERENCIAIS
            </h2>
            <ul className="space-y-2">
              <li className="flex items-center justify-center gap-2 text-center"><CircleCheck className="h-4 w-4 shrink-0" style={{ color: "var(--color-primary)" }} />Probabilidades mais equilibradas</li>
              <li className="flex items-center justify-center gap-2 text-center"><CircleCheck className="h-4 w-4 shrink-0" style={{ color: "var(--color-primary)" }} />Chances reais de ganho</li>
              <li className="flex items-center justify-center gap-2 text-center"><CircleCheck className="h-4 w-4 shrink-0" style={{ color: "var(--color-primary)" }} />Plataforma transparente e confiavel</li>
            </ul>
          </div>
        </section>

        {/* Botões */}
        <div className="mt-8 w-full flex flex-col gap-4">

          {/* Login */}
          <Link
            href="/login"
            className="btn-primary w-full text-white font-bold py-3 rounded-md uppercase tracking-widest flex items-center justify-center gap-2"
          >
            <LogIn className="w-5 h-5" style={{ color: "var(--color-primary)" }} />
            ENTRAR
          </Link>

          {/* Cadastro */}
          <Link
            href="/register"
            className="w-full bg-transparent text-white font-bold py-3 rounded-md uppercase tracking-widest flex items-center justify-center gap-2 border border-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)]/10 transition-colors active:scale-95 active:bg-[color:var(--color-primary)]/20"
          >
            <UserPlus className="w-5 h-5" style={{ color: "var(--color-primary)" }} />
            CADASTRE-SE
          </Link>

        </div>
      </main>
    </div>
  );
}