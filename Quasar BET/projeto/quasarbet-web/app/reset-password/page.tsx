import Image from "next/image";
import ResetPasswordForm from "./ResetPasswordForm";

export default function ResetPassword() {
  return (
    <div className="bg-page min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm px-8 py-10 flex flex-col items-center">

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
          <h1 className="text-white text-xl font-bold uppercase tracking-widest">
            Redefinir senha
          </h1>
          <p className="link-focus text-sm leading-relaxed">
            Digite e confirme sua nova senha<br />
            para concluir a recuperação.
          </p>
        </div>

        <ResetPasswordForm />
      </div>
    </div>
  );
}
