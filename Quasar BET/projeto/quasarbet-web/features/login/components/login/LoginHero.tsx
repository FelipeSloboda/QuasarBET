import Image from "next/image";

export default function LoginHero() {
  return (
    <>
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

      <div className="w-full text-center mb-6 flex flex-col gap-2">
        <p className="link-focus text-sm leading-relaxed">Acesse sua conta e continue lucrando.</p>
      </div>
    </>
  );
}
