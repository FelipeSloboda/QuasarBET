import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Scale,
  ListChecks,
  CircleCheck,
  LogIn,
  UserPlus,
} from "lucide-react";

export default function Terms() {
  return (
    <div className="bg-page min-h-screen text-white">
      <main className="mx-auto w-full max-w-4xl px-8 py-10 md:py-14">
        <div className="mb-8 flex justify-center">
          <Image
            src="/images/logo.png"
            alt="QuasarBet"
            width={360}
            height={90}
            priority
            className="w-full max-w-[360px] h-auto"
          />
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-bold uppercase tracking-widest text-white md:text-3xl">
            Termos, Regulamento e Regras
          </h1>
          <p className="link-focus mt-3 text-sm leading-relaxed md:text-base">
            Leia com atencao as condicoes que orientam o uso da plataforma
            Quasar Bet.
          </p>
        </div>

        <section className="mt-10 space-y-10 text-sm leading-relaxed text-slate-300 md:text-base">
          <article className="space-y-4">
            <h2 className="mb-4 flex items-center justify-center gap-2 text-center text-lg font-bold uppercase tracking-wide text-white">
              <ShieldCheck className="h-5 w-5" />
              Termos de Uso
            </h2>
            <div className="space-y-4 text-center">
              <p>
                Ao acessar e utilizar a plataforma Quasar Bet, o usuario
                declara estar de acordo com as condicoes de uso, com a politica
                interna da plataforma e com a legislacao aplicavel.
              </p>
              <p>
                O cadastro e permitido somente para maiores de 18 anos, com
                dados reais, atualizados e de titularidade do proprio usuario.
                Informacoes incorretas, incompletas ou inconsistentes podem
                resultar em bloqueio preventivo da conta.
              </p>
              <p>
                A utilizacao da plataforma deve ocorrer de forma pessoal, licita
                e responsavel. E vedado o uso de contas de terceiros, qualquer
                tentativa de fraude, manipulacao de resultados ou pratica que
                comprometa a seguranca do sistema.
              </p>
            </div>
          </article>

          <article className="space-y-4">
            <h2 className="mb-4 flex items-center justify-center gap-2 text-center text-lg font-bold uppercase tracking-wide text-white">
              <Scale className="h-5 w-5" />
              Regulamento da Plataforma
            </h2>
            <div className="space-y-4 text-center">
              <p>
                As apostas sao processadas com base nas cotacoes exibidas no
                momento da confirmacao. Em caso de instabilidade tecnica, falha
                operacional evidente ou erro manifesto de odd, a Quasar Bet
                podera revisar, corrigir ou cancelar a operacao para preservar a
                integridade da plataforma.
              </p>
              <p>
                Depositos, saques e validacoes cadastrais podem passar por
                procedimentos de analise e seguranca. A liberacao de
                movimentacoes financeiras pode depender da confirmacao de
                identidade, titularidade dos meios de pagamento e cumprimento de
                exigencias legais.
              </p>
              <p>
                A plataforma podera aplicar limites operacionais, suspensoes
                temporarias ou encerramento de contas quando identificar
                comportamento de risco, descumprimento das regras internas ou
                necessidade de adequacao regulatoria.
              </p>
            </div>
          </article>

          <article className="space-y-4">
            <h2 className="mb-4 flex items-center justify-center gap-2 text-center text-lg font-bold uppercase tracking-wide text-white">
              <ListChecks className="h-5 w-5" />
              Regras Essenciais
            </h2>
            <ul className="mx-auto max-w-3xl space-y-3">
              <li className="flex items-start gap-3">
                <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-slate-300" />
                <span>Manter seus dados cadastrais corretos e sempre atualizados.</span>
              </li>
              <li className="flex items-start gap-3">
                <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-slate-300" />
                <span>Nao compartilhar conta, senha, codigo de acesso ou qualquer credencial.</span>
              </li>
              <li className="flex items-start gap-3">
                <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-slate-300" />
                <span>Utilizar apenas metodos de pagamento de sua propria titularidade.</span>
              </li>
              <li className="flex items-start gap-3">
                <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-slate-300" />
                <span>Respeitar os limites da plataforma e praticar jogo responsavel.</span>
              </li>
              <li className="flex items-start gap-3">
                <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-slate-300" />
                <span>Nao utilizar automacoes, scripts ou mecanismos que interfiram nas operacoes.</span>
              </li>
              <li className="flex items-start gap-3">
                <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-slate-300" />
                <span>Aceitar que verificacoes adicionais podem ser solicitadas por seguranca.</span>
              </li>
              <li className="flex items-start gap-3">
                <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-slate-300" />
                <span>Consultar periodicamente esta pagina para acompanhar eventuais atualizacoes.</span>
              </li>
            </ul>
          </article>

          <article className="text-center text-xs leading-relaxed text-slate-400 md:text-sm">
            <p>
              O uso continuado da plataforma apos atualizacoes nesta pagina sera
              interpretado como concordancia com os termos vigentes. Em caso de
              duvidas, consulte nossos canais oficiais de atendimento antes de
              prosseguir com apostas ou movimentacoes financeiras.
            </p>
          </article>
        </section>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/login"
            className="btn-primary flex w-full items-center justify-center gap-2 rounded-md py-3 font-bold uppercase tracking-widest text-white"
          >
            <LogIn className="h-5 w-5" />
            ENTRAR
          </Link>
          <Link
            href="/register"
            className="btn-secondary flex w-full items-center justify-center gap-2 rounded-md py-3 font-bold uppercase tracking-widest text-white"
          >
            <UserPlus className="h-5 w-5" />
            CADASTRE-SE
          </Link>
        </div>
      </main>
    </div>
  );
}