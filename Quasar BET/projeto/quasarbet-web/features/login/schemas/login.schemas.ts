import { isValidEmail } from "@/utils/validators";
import type { LoginPayload } from "@/features/login/types/login.types";
import type { LoginFieldName, LoginFormValues } from "@/features/login/types/login.types";

export function validateLoginPayload(payload: LoginPayload): string[] {
  const errors: string[] = [];
  if (!payload.email.trim()) errors.push("E-mail é obrigatório");
  if (!payload.password.trim()) errors.push("Senha é obrigatória");
  if (payload.password.length < 6 || payload.password.length > 64) {
    errors.push("Senha deve conter entre 6 e 64 caracteres");
  }
  return errors;
}

export function validateLoginField(field: LoginFieldName, values: LoginFormValues): string | null {
  const value = values[field];

  switch (field) {
    case "email": {
      const normalizedValue = value.replace(/\s+/g, "");
      if (!normalizedValue) return "E-mail é obrigatório";
      if (!isValidEmail(normalizedValue)) return "E-mail inválido";
      return null;
    }

    case "password": {
      if (!value.trim()) return "Senha é obrigatória";
      if (value.length < 6 || value.length > 64) {
        return "Senha deve conter entre 6 e 64 caracteres";
      }
      return null;
    }

    default:
      return null;
  }
}
