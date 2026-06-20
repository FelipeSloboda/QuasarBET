"use client";

import { useMemo, useState } from "react";
import type { FormEvent, KeyboardEvent } from "react";
import Link from "next/link";
import { ArrowLeft, Eye, EyeOff, KeyRound, Lock } from "lucide-react";
import BaseButton from "@/components/ui/BaseButton";
import TextField from "@/components/form/TextField";
import type { ValidationState } from "@/components/form/TextField";
import { hasLowercase, hasMinLength, hasNumber, hasUppercase } from "@/utils/validators";

type FieldName = "password" | "confirmPassword";

const fields: FieldName[] = ["password", "confirmPassword"];

const emptyTouchedState: Record<FieldName, boolean> = {
  password: false,
  confirmPassword: false,
};

function validatePassword(value: string): string | null {
  if (!value) return "Senha é obrigatória";
  if (value.length > 64 || !hasMinLength(value, 6)) return "Senha deve conter entre 6 e 64 caracteres";
  if (!hasUppercase(value) || !hasLowercase(value) || !hasNumber(value)) {
    return "Senha deve conter letra maiúscula, minúscula e número";
  }
  return null;
}

function validateConfirmPassword(value: string, password: string): string | null {
  if (!value) return "Confirmação de senha é obrigatória";
  if (value !== password) return "As senhas não coincidem";
  return null;
}

export default function ResetPasswordForm() {
  const [values, setValues] = useState({ password: "", confirmPassword: "" });
  const [touchedFields, setTouchedFields] = useState<Record<FieldName, boolean>>(emptyTouchedState);
  const [focusedField, setFocusedField] = useState<FieldName | null>(null);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const fieldErrors = useMemo<Record<FieldName, string | null>>(() => ({
    password: validatePassword(values.password),
    confirmPassword: validateConfirmPassword(values.confirmPassword, values.password),
  }), [values]);

  const getFieldIsEmpty = (field: FieldName) => values[field].trim().length === 0;

  const getFieldValidationState = (field: FieldName): ValidationState => {
    if (getFieldIsEmpty(field)) return "default";
    return fieldErrors[field] ? "error" : "success";
  };

  const getFieldErrorMessage = (field: FieldName): string | undefined => {
    if (!touchedFields[field] && !submitAttempted) return undefined;
    return fieldErrors[field] ?? undefined;
  };

  const isFormValid = fields.every((field) => !getFieldIsEmpty(field) && !fieldErrors[field]);

  const handleFieldChange = (field: FieldName, value: string) => {
    setValues((prev) => ({
      ...prev,
      [field]: value.replace(/\s+/g, "").slice(0, 64),
    }));
  };

  const handleFieldBlur = (field: FieldName) => {
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
    setFocusedField((prev) => (prev === field ? null : prev));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitAttempted(true);

    if (!isFormValid) return;

    // TODO: Integrar serviço de redefinição de senha.
  };

  const blockSpace = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === " ") event.preventDefault();
  };

  return (
    <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
      <TextField
        icon={Lock}
        name="password"
        type={showPassword ? "text" : "password"}
        value={values.password}
        placeholder="Nova senha"
        autoComplete="new-password"
        maxLength={64}
        onValueChange={(value) => handleFieldChange("password", value)}
        onKeyDown={blockSpace}
        onFocus={() => setFocusedField("password")}
        onBlur={() => handleFieldBlur("password")}
        validationState={getFieldValidationState("password")}
        isFocused={focusedField === "password"}
        isEmpty={getFieldIsEmpty("password")}
        errorMessage={getFieldErrorMessage("password")}
        rightSlot={(
          <button
            type="button"
            aria-label={showPassword ? "Ocultar senha" : "Exibir senha"}
            onClick={() => setShowPassword((prev) => !prev)}
            className="icon-muted hover:text-white transition"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      />

      <TextField
        icon={Lock}
        name="confirmPassword"
        type={showConfirmPassword ? "text" : "password"}
        value={values.confirmPassword}
        placeholder="Confirme a nova senha"
        autoComplete="new-password"
        maxLength={64}
        onValueChange={(value) => handleFieldChange("confirmPassword", value)}
        onKeyDown={blockSpace}
        onFocus={() => setFocusedField("confirmPassword")}
        onBlur={() => handleFieldBlur("confirmPassword")}
        validationState={getFieldValidationState("confirmPassword")}
        isFocused={focusedField === "confirmPassword"}
        isEmpty={getFieldIsEmpty("confirmPassword")}
        errorMessage={getFieldErrorMessage("confirmPassword")}
        rightSlot={(
          <button
            type="button"
            aria-label={showConfirmPassword ? "Ocultar senha" : "Exibir senha"}
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="icon-muted hover:text-white transition"
          >
            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      />

      <BaseButton
        type="submit"
        disabled={!isFormValid}
        className={`w-full mt-2 ${!isFormValid ? "opacity-55 cursor-not-allowed pointer-events-none" : ""}`}
      >
        <KeyRound className="w-5 h-5" />
        Redefinir senha
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
