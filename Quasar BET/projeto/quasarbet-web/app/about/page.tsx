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
            src="/images/logo.png"
            alt="QuasarBet"
            width={420}
            height={120}
            priority
            className="h-auto w-full max-w-[320px]"
          />
        </div>

        <h1 className="text-center text-2xl font-bold uppercase tracking-widest text-white md:text-3xl">
          Sobre Nos
        </h1>

        <p className="link-focus mt-3 text-center text-sm leading-relaxed">
          Uma nova experiencia em apostas online.
        </p>

        <section className="mt-8 space-y-6 text-sm leading-relaxed text-slate-300 md:text-base">
          <div>
            <h2 className="mb-2 flex items-center justify-center gap-2 text-center text-lg font-bold uppercase tracking-wide text-white">
              <Lightbulb className="h-5 w-5" />
              Nossa Proposta
            </h2>
            <p>
              A Quasar Bet nasceu para oferecer uma experiencia mais
              transparente, equilibrada e confiavel no mercado de apostas
              online. Nosso compromisso e criar um ambiente em que o usuario
              encontre oportunidades mais justas quando comparadas as
              plataformas tradicionais.
            </p>
          </div>

          <div>
            <h2 className="mb-2 flex items-center justify-center gap-2 text-center text-lg font-bold uppercase tracking-wide text-white">
              <ListChecks className="h-5 w-5" />
              O que nos diferencia
            </h2>
            <ul className="space-y-2">
              <li className="flex items-center justify-center gap-2 text-center"><CircleCheck className="h-4 w-4 shrink-0 text-slate-300" />Probabilidades mais equilibradas</li>
              <li className="flex items-center justify-center gap-2 text-center"><CircleCheck className="h-4 w-4 shrink-0 text-slate-300" />Chances reais de ganho</li>
              <li className="flex items-center justify-center gap-2 text-center"><CircleCheck className="h-4 w-4 shrink-0 text-slate-300" />Plataforma moderna e intuitiva</li>
              <li className="flex items-center justify-center gap-2 text-center"><CircleCheck className="h-4 w-4 shrink-0 text-slate-300" />Ambiente transparente e confiavel</li>
              <li className="flex items-center justify-center gap-2 text-center"><CircleCheck className="h-4 w-4 shrink-0 text-slate-300" />Experiencia rapida e simples</li>
              <li className="flex items-center justify-center gap-2 text-center"><CircleCheck className="h-4 w-4 shrink-0 text-slate-300" />Seguranca e estabilidade</li>
              <li className="flex items-center justify-center gap-2 text-center"><CircleCheck className="h-4 w-4 shrink-0 text-slate-300" />Foco total na experiencia do usuario</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-2 flex items-center justify-center gap-2 text-center text-lg font-bold uppercase tracking-wide text-white">
              <Target className="h-5 w-5" />
              Objetivo e Visao
            </h2>
            <p>
              Queremos mudar a forma como as pessoas enxergam plataformas de
              apostas online, com mais transparencia, confianca e melhores
              oportunidades para todos.
            </p>
          </div>
        </section>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/login"
            className="btn-primary w-full text-white font-bold py-3 rounded-md uppercase tracking-widest flex items-center justify-center gap-2"
          >
            <LogIn className="w-5 h-5" />
            ENTRAR
          </Link>
          <Link
            href="/register"
            className="btn-secondary w-full text-white font-bold py-3 rounded-md uppercase tracking-widest flex items-center justify-center gap-2"
          >
            <UserPlus className="w-5 h-5" />
            CADASTRE-SE
          </Link>
        </div>
      </main>
    </div>
  );
}