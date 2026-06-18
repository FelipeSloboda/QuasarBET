"use client";

import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { CreditCard, Eye, EyeOff, KeyRound, Lock, LogIn, Mail, UserPlus } from "lucide-react";
import BaseButton from "@/components/ui/BaseButton";
import TextField from "@/components/form/TextField";
import type { ValidationState } from "@/components/form/TextField";
import { validateLoginField } from "@/features/login/schemas/login.schemas";
import type { LoginFieldName, LoginFormValues } from "@/features/login/types/login.types";
import { formatCpf, normalizeEmail } from "@/utils/formatters";

const initialValues: LoginFormValues = {
  emailOrCpf: "",
  password: "",
};

const fields: LoginFieldName[] = ["emailOrCpf", "password"];

const emptyTouchedState: Record<LoginFieldName, boolean> = {
  emailOrCpf: false,
  password: false,
};

const passwordLengthErrorMessage = "Senha deve conter entre 6 e 64 caracteres";

function getIdentifierType(value: string): "email" | "cpf" {
  if (/[A-Za-z@]/.test(value)) {
    return "email";
  }

  return "cpf";
}

export default function LoginForm() {
  const [values, setValues] = useState<LoginFormValues>(initialValues);
  const [touchedFields, setTouchedFields] = useState<Record<LoginFieldName, boolean>>(emptyTouchedState);
  const [focusedField, setFocusedField] = useState<LoginFieldName | null>(null);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const fieldErrors = useMemo(() => {
    const errors: Record<LoginFieldName, string | null> = {
      emailOrCpf: null,
      password: null,
    };

    for (const field of fields) {
      errors[field] = validateLoginField(field, values);
    }

    return errors;
  }, [values]);

  const getFieldIsEmpty = (field: LoginFieldName): boolean => values[field].trim().length === 0;

  const getFieldValidationState = (field: LoginFieldName): ValidationState => {
    if (getFieldIsEmpty(field)) {
      return "default";
    }

    if (field === "password") {
      return "success";
    }

    return fieldErrors[field] ? "error" : "success";
  };

  const getFieldErrorMessage = (field: LoginFieldName): string | undefined => {
    const shouldShowError = touchedFields[field] || submitAttempted;
    if (!shouldShowError) {
      return undefined;
    }

    if (field === "password" && fieldErrors[field] === passwordLengthErrorMessage) {
      return undefined;
    }

    return fieldErrors[field] ?? undefined;
  };

  const isFormValid = fields.every((field) => !getFieldIsEmpty(field) && !fieldErrors[field]);
  const identifierType = getIdentifierType(values.emailOrCpf);
  const IdentifierIcon = identifierType === "cpf" ? CreditCard : Mail;

  const handleFieldChange = (field: LoginFieldName, value: string) => {
    const isIdentifierField = field === "emailOrCpf";
    const formattedValue = isIdentifierField
      ? getIdentifierType(value) === "cpf"
        ? formatCpf(value)
        : normalizeEmail(value)
      : value;

    setValues((previousValues) => ({
      ...previousValues,
      [field]: formattedValue,
    }));
  };

  const handleFieldBlur = (field: LoginFieldName) => {
    setTouchedFields((previousState) => ({
      ...previousState,
      [field]: true,
    }));
    setFocusedField((previousField) => (previousField === field ? null : previousField));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitAttempted(true);

    if (!isFormValid) {
      return;
    }

    // TODO: Integrar serviço de login.
  };

  return (
    <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
      <TextField
        icon={IdentifierIcon}
        name="emailOrCpf"
        type="text"
        value={values.emailOrCpf}
        placeholder="E-mail ou CPF"
        autoComplete="username"
        inputMode={identifierType === "cpf" ? "numeric" : "email"}
        maxLength={100}
        onValueChange={(value) => handleFieldChange("emailOrCpf", value)}
        onFocus={() => setFocusedField("emailOrCpf")}
        onBlur={() => handleFieldBlur("emailOrCpf")}
        validationState={getFieldValidationState("emailOrCpf")}
        isFocused={focusedField === "emailOrCpf"}
        isEmpty={getFieldIsEmpty("emailOrCpf")}
        errorMessage={getFieldErrorMessage("emailOrCpf")}
      />

      <TextField
        icon={Lock}
        name="password"
        type={showPassword ? "text" : "password"}
        value={values.password}
        placeholder="Senha"
        autoComplete="current-password"
        maxLength={64}
        onValueChange={(value) => handleFieldChange("password", value)}
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
            onClick={() => setShowPassword((previous) => !previous)}
            className="icon-muted hover:text-white transition"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      />

      <BaseButton
        type="submit"
        disabled={!isFormValid}
        className={`w-full mt-2 ${!isFormValid ? "opacity-55 cursor-not-allowed" : ""}`}
      >
        <LogIn className="w-5 h-5" />
        Entrar
      </BaseButton>

      <div className="mt-12 mb-4 flex justify-center">
        <div className="h-px w-50 bg-white/50" />
      </div>

      <div className="w-full flex flex-col items-center gap-3 mt-4">
        <Link href="/forgot-password" className="link-focus text-sm flex items-center gap-2 hover:text-white transition-colors">
          <KeyRound className="w-4 h-4" style={{ color: "var(--color-primary)" }} />
          Esqueci minha senha
        </Link>

        <Link href="/register" className="link-focus text-sm flex items-center gap-2 hover:text-white transition-colors">
          <UserPlus className="w-4 h-4" style={{ color: "var(--color-primary)" }} />
          Cadastre-se
        </Link>
      </div>
    </form>
  );
}
