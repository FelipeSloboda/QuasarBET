"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { KeyRound, ArrowLeft, Mail } from "lucide-react";
import TextField from "@/components/form/TextField";
import type { ValidationState } from "@/components/form/TextField";
import BaseButton from "@/components/ui/BaseButton";
import { isValidEmail } from "@/utils/validators";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const [focused, setFocused] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const isEmpty = email.trim().length === 0;
  const isValid = !isEmpty && isValidEmail(email.replace(/\s+/g, ""));

  const validationState: ValidationState = isEmpty
    ? "default"
    : isValid
      ? "success"
      : "error";

  const errorMessage = (touched || submitAttempted) && !isEmpty && !isValid
    ? "E-mail inválido"
    : undefined;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitAttempted(true);

    if (!isValid) {
      return;
    }

    // TODO: Integrar serviço de recuperação de senha.
  };

  return (
    <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
      <TextField
        icon={Mail}
        name="email"
        type="email"
        value={email}
        placeholder="E-mail"
        autoComplete="email"
        inputMode="email"
        maxLength={100}
        onValueChange={setEmail}
        onFocus={() => setFocused(true)}
        onBlur={() => { setTouched(true); setFocused(false); }}
        validationState={validationState}
        isFocused={focused}
        isEmpty={isEmpty}
        errorMessage={errorMessage}
      />

      <BaseButton
        type="submit"
        disabled={!isValid}
        className={`w-full mt-2 ${!isValid ? "opacity-55 cursor-not-allowed" : ""}`}
      >
        <KeyRound className="w-5 h-5" />
        Esqueci minha senha
      </BaseButton>

      <div className="text-center mt-1">
        <Link href="/login" className="link-focus text-sm flex items-center justify-center gap-1">
          <ArrowLeft className="w-4 h-4" style={{ color: "var(--color-primary)" }} />
          Voltar ao login
        </Link>
      </div>
    </form>
  );
}
