import Image from "next/image";

export default function RegisterHero() {
  return (
    <>
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
    </>
  );
}