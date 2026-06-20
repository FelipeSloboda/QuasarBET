"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { FormEvent, KeyboardEvent } from "react";
import Link from "next/link";
import { Calendar, CreditCard, Eye, EyeOff, Gift, Globe, Lock, Mail, Phone, User, UserPlus} from "lucide-react";
import BaseButton from "@/components/ui/BaseButton";
import TextField from "@/components/form/TextField";
import type { ValidationState } from "@/components/form/TextField";
import RegisterTermsField from "@/features/register/components/register/RegisterTermsField";
import { validateRegisterField, validateRegisterTerms } from "@/features/register/schemas/register.schemas";
import type { RegisterFormValues, RegisterPayload, RegisterTextFieldName, UserRegisterResponse } from "@/features/register/types/register.types";
import { register } from "@/features/register/services/register.service";
import type { ApiResponse } from "@/types/api";
import {
  formatBirthDate,
  formatCpf,
  formatLocalPhone,
  formatNamePart,
  formatReferralCode,
  normalizeEmail,
  onlyDigits,
} from "@/utils/formatters";

const initialValues: RegisterFormValues = {
  fullName: "",
  cpf: "",
  email: "",
  countryCode: "55",
  areaCode: "",
  phone: "",
  birthDate: "",
  password: "",
  referralCode: "",
  acceptTerms: false,
};

const textFields: RegisterTextFieldName[] = [
  "fullName",
  "cpf",
  "email",
  "countryCode",
  "areaCode",
  "phone",
  "birthDate",
  "password",
  "referralCode",
];

const requiredTextFields: RegisterTextFieldName[] = [
  "fullName",
  "cpf",
  "email",
  "countryCode",
  "areaCode",
  "phone",
  "birthDate",
  "password",
];

const emptyTouchedState: Record<RegisterTextFieldName, boolean> = {
  fullName: false,
  cpf: false,
  email: false,
  countryCode: false,
  areaCode: false,
  phone: false,
  birthDate: false,
  password: false,
  referralCode: false,
};

export default function RegisterForm() {
  const router = useRouter();
  const [values, setValues] = useState<RegisterFormValues>(initialValues);
  const [touchedFields, setTouchedFields] = useState<Record<RegisterTextFieldName, boolean>>(emptyTouchedState);
  const [termsTouched, setTermsTouched] = useState(false);
  const [focusedField, setFocusedField] = useState<RegisterTextFieldName | null>(null);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState<string | null>(null);

  const fieldErrors = useMemo(() => {
    const errors: Record<RegisterTextFieldName, string | null> = {
      fullName: null,
      cpf: null,
      email: null,
      countryCode: null,
      areaCode: null,
      phone: null,
      birthDate: null,
      password: null,
      referralCode: null,
    };

    for (const field of textFields) {
      errors[field] = validateRegisterField(field, values);
    }

    return errors;
  }, [values]);

  const termsError = validateRegisterTerms(values);

  const formatFieldValue = (field: RegisterTextFieldName, inputValue: string): string => {
    switch (field) {
      case "fullName":
        return formatNamePart(inputValue).slice(0, 100);
      case "cpf":
        return formatCpf(inputValue);
      case "email":
        return normalizeEmail(inputValue).slice(0, 100);
      case "countryCode":
        return onlyDigits(inputValue).slice(0, 3);
      case "areaCode":
        return onlyDigits(inputValue).slice(0, 2);
      case "phone":
        return formatLocalPhone(inputValue);
      case "birthDate":
        return formatBirthDate(inputValue);
      case "password":
        return inputValue.replace(/\s+/g, "").slice(0, 64);
      case "referralCode":
        return formatReferralCode(inputValue);
      default:
        return inputValue;
    }
  };

  const getFieldIsEmpty = (field: RegisterTextFieldName): boolean => {
    const value = values[field];
    switch (field) {
      case "cpf":
      case "countryCode":
      case "areaCode":
      case "phone":
      case "birthDate":
        return onlyDigits(value).length === 0;
      default:
        return String(value).trim().length === 0;
    }
  };

  const getFieldValidationState = (field: RegisterTextFieldName): ValidationState => {
    if (getFieldIsEmpty(field)) {
      return "default";
    }

    return fieldErrors[field] ? "error" : "success";
  };

  const getFieldErrorMessage = (field: RegisterTextFieldName): string | undefined => {
    const shouldShowError = touchedFields[field] || submitAttempted;
    if (!shouldShowError) {
      return undefined;
    }

    return fieldErrors[field] ?? undefined;
  };

  const isFormValid = requiredTextFields.every((field) => !getFieldIsEmpty(field))
    && textFields.every((field) => !fieldErrors[field])
    && !termsError;

  const handleFieldChange = (field: RegisterTextFieldName, value: string) => {
    setValues((previousValues) => ({
      ...previousValues,
      [field]: formatFieldValue(field, value),
    }));
    setFormMessage(null);
  };

  const handleFieldBlur = (field: RegisterTextFieldName) => {
    if (field === "fullName") {
      setValues((previousValues) => ({
        ...previousValues,
        fullName: previousValues.fullName.trim(),
      }));
    }

    if (field === "email") {
      setValues((previousValues) => ({
        ...previousValues,
        email: normalizeEmail(previousValues.email).trimEnd(),
      }));
    }

    setTouchedFields((previousState) => ({
      ...previousState,
      [field]: true,
    }));
    setFocusedField((previousField) => (previousField === field ? null : previousField));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    setSubmitAttempted(true);

    if (!isFormValid) {
      setFormMessage("Revise os campos destacados antes de continuar.");
      return;
    }

    setIsSubmitting(true);
    setFormMessage(null);

    try {
      const nameParts = values.fullName.trim().split(/\s+/);
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ");

      const [day, month, year] = values.birthDate.split("/");

      const payload: RegisterPayload = {
        firstName,
        lastName,
        cpf: onlyDigits(values.cpf),
        email: values.email,
        countryCode: values.countryCode,
        areaCode: values.areaCode,
        phone: onlyDigits(values.phone),
        password: values.password,
        birthDate: `${year}-${month}-${day}`,
      };

      const response = await register(payload);
      const userData = response.data as UserRegisterResponse;

      sessionStorage.setItem("verifyEmail", JSON.stringify({
        id: userData.id,
        email: userData.email,
        password: values.password,
        token: userData.verifyEmailToken,
      }));

      router.push("/verify-email");
    } catch (error) {
      const apiError = error as ApiResponse<unknown>;
      if (apiError?.message) {
        setFormMessage(apiError.message);
      } else {
        setFormMessage("Erro ao realizar cadastro. Tente novamente.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
      <TextField
        icon={User}
        name="fullName"
        type="text"
        value={values.fullName}
        placeholder="Nome completo"
        autoComplete="name"
        maxLength={100}
        onValueChange={(value) => handleFieldChange("fullName", value)}
        onFocus={() => setFocusedField("fullName")}
        onBlur={() => handleFieldBlur("fullName")}
        validationState={getFieldValidationState("fullName")}
        isFocused={focusedField === "fullName"}
        isEmpty={getFieldIsEmpty("fullName")}
        errorMessage={getFieldErrorMessage("fullName")}
      />

      <TextField
        icon={CreditCard}
        name="cpf"
        type="text"
        value={values.cpf}
        placeholder="CPF"
        inputMode="numeric"
        maxLength={14}
        onValueChange={(value) => handleFieldChange("cpf", value)}
        onFocus={() => setFocusedField("cpf")}
        onBlur={() => handleFieldBlur("cpf")}
        validationState={getFieldValidationState("cpf")}
        isFocused={focusedField === "cpf"}
        isEmpty={getFieldIsEmpty("cpf")}
        errorMessage={getFieldErrorMessage("cpf")}
      />

      <TextField
        icon={Mail}
        name="email"
        type="email"
        value={values.email}
        placeholder="E-mail"
        autoComplete="email"
        inputMode="email"
        maxLength={100}
        onValueChange={(value) => handleFieldChange("email", value)}
        onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
          if (event.key === " ") {
            event.preventDefault();
          }
        }}
        onFocus={() => setFocusedField("email")}
        onBlur={() => handleFieldBlur("email")}
        validationState={getFieldValidationState("email")}
        isFocused={focusedField === "email"}
        isEmpty={getFieldIsEmpty("email")}
        errorMessage={getFieldErrorMessage("email")}
      />

      <div className="grid grid-cols-12 gap-2 w-full">
        <div className="col-span-3">
          <TextField
            icon={Globe}
            name="countryCode"
            type="text"
            value={values.countryCode}
            placeholder="DDI"
            inputMode="numeric"
            maxLength={3}
            onValueChange={(value) => handleFieldChange("countryCode", value)}
            onFocus={() => setFocusedField("countryCode")}
            onBlur={() => handleFieldBlur("countryCode")}
            validationState={getFieldValidationState("countryCode")}
            isFocused={focusedField === "countryCode"}
            isEmpty={getFieldIsEmpty("countryCode")}
            errorMessage={getFieldErrorMessage("countryCode")}
          />
        </div>
        <div className="col-span-3">
          <TextField
            icon={Phone}
            name="areaCode"
            type="text"
            value={values.areaCode}
            placeholder="DDD"
            inputMode="numeric"
            maxLength={2}
            onValueChange={(value) => handleFieldChange("areaCode", value)}
            onFocus={() => setFocusedField("areaCode")}
            onBlur={() => handleFieldBlur("areaCode")}
            validationState={getFieldValidationState("areaCode")}
            isFocused={focusedField === "areaCode"}
            isEmpty={getFieldIsEmpty("areaCode")}
            errorMessage={getFieldErrorMessage("areaCode")}
          />
        </div>
        <div className="col-span-6">
          <TextField
            icon={Phone}
            name="phone"
            type="text"
            value={values.phone}
            placeholder="Telefone"
            inputMode="numeric"
            maxLength={10}
            onValueChange={(value) => handleFieldChange("phone", value)}
            onFocus={() => setFocusedField("phone")}
            onBlur={() => handleFieldBlur("phone")}
            validationState={getFieldValidationState("phone")}
            isFocused={focusedField === "phone"}
            isEmpty={getFieldIsEmpty("phone")}
            errorMessage={getFieldErrorMessage("phone")}
          />
        </div>
      </div>

      <TextField
        icon={Calendar}
        name="birthDate"
        type="text"
        value={values.birthDate}
        placeholder="Data de nascimento"
        inputMode="numeric"
        maxLength={10}
        onValueChange={(value) => handleFieldChange("birthDate", value)}
        onFocus={() => setFocusedField("birthDate")}
        onBlur={() => handleFieldBlur("birthDate")}
        validationState={getFieldValidationState("birthDate")}
        isFocused={focusedField === "birthDate"}
        isEmpty={getFieldIsEmpty("birthDate")}
        errorMessage={getFieldErrorMessage("birthDate")}
      />

      <TextField
        icon={Lock}
        name="password"
        type={showPassword ? "text" : "password"}
        value={values.password}
        placeholder="Senha"
        autoComplete="new-password"
        maxLength={64}
        onValueChange={(value) => handleFieldChange("password", value)}
        onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
          if (event.key === " ") {
            event.preventDefault();
          }
        }}
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

      <TextField
        icon={Gift}
        name="referralCode"
        type="text"
        value={values.referralCode}
        placeholder="Código de indicação (opcional)"
        maxLength={8}
        onValueChange={(value) => handleFieldChange("referralCode", value)}
        onFocus={() => setFocusedField("referralCode")}
        onBlur={() => handleFieldBlur("referralCode")}
        validationState={getFieldValidationState("referralCode")}
        isFocused={focusedField === "referralCode"}
        isEmpty={getFieldIsEmpty("referralCode")}
        errorMessage={getFieldErrorMessage("referralCode")}
      />

      <RegisterTermsField
        checked={values.acceptTerms}
        onChange={(checked) => {
          setValues((previousValues) => ({
            ...previousValues,
            acceptTerms: checked,
          }));
          setFormMessage(null);
        }}
        onBlur={() => setTermsTouched(true)}
        errorMessage={termsTouched || submitAttempted ? termsError ?? undefined : undefined}
      />

      {formMessage ? <p className="text-sm text-center text-amber-300">{formMessage}</p> : null}

      <BaseButton
        type="submit"
        disabled={!isFormValid || isSubmitting}
        className={`w-full mt-2 ${!isFormValid || isSubmitting ? "opacity-55 cursor-not-allowed" : ""}`}
      >
        <UserPlus className="w-5 h-5" />
        {isSubmitting ? "ENVIANDO..." : "Cadastrar"}
      </BaseButton>

      <Link href="/login" className="link-focus w-full text-center text-sm flex items-center justify-center gap-1 py-2 hover:text-blue-300 transition">
        <User className="w-4 h-4" style={{ color: "var(--color-primary)" }} />
        Já tem uma conta? Faça login
      </Link>
    </form>
  );
}