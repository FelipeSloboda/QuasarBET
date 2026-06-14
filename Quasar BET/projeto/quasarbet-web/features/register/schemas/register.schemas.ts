import { onlyDigits } from "@/utils/formatters";
import {
  hasLength,
  hasLowercase,
  hasMinLength,
  hasNumber,
  hasUppercase,
  isPastDateBr,
  isValidCpfLength,
  isValidEmail,
} from "@/utils/validators";
import type { RegisterFormValues, RegisterPayload, RegisterTextFieldName } from "@/features/register/types/register.types";

export function validateRegisterPayload(payload: RegisterPayload): string[] {
  const errors: string[] = [];
  if (!payload.firstName.trim()) errors.push("Nome completo é obrigatório");
  if (!payload.email.trim()) errors.push("E-mail é obrigatório");
  if (!payload.cpf.trim()) errors.push("CPF é obrigatório");
  if (!payload.countryCode.trim()) errors.push("Código do país é obrigatório");
  if (!payload.areaCode.trim()) errors.push("DDD é obrigatório");
  if (!payload.phone.trim()) errors.push("Telefone é obrigatório");
  if (!payload.birthDate.trim()) errors.push("Data de nascimento é obrigatória");
  if (!payload.password.trim()) errors.push("Senha é obrigatória");
  return errors;
}

export function validateRegisterField(field: RegisterTextFieldName, values: RegisterFormValues): string | null {
  const value = values[field];

  switch (field) {
    case "firstName": {
      const fullName = value.trim();
      if (!fullName) return "Nome completo é obrigatório";
      if (fullName.length > 100) return "Nome completo deve ter no máximo 100 caracteres";

      const nameParts = fullName.split(" ").filter(Boolean);
      if (nameParts.length < 2) return "Digite nome e sobrenome";
      if (nameParts.some((part) => part.length < 2)) {
        return "Cada palavra deve ter no mínimo 2 letras";
      }
      if (nameParts.some((part) => !/^[\p{L}]+$/u.test(part))) {
        return "Nome completo deve conter apenas letras";
      }

      return null;
    }

    case "cpf": {
      if (!onlyDigits(value)) return "CPF é obrigatório";
      if (!isValidCpfLength(value)) return "CPF deve conter exatamente 11 dígitos";
      return null;
    }

    case "email": {
      if (!value.trim()) return "E-mail é obrigatório";
      if (value.length > 100) return "E-mail deve ter no máximo 100 caracteres";
      if (!isValidEmail(value)) return "E-mail inválido";
      return null;
    }

    case "countryCode": {
      const digits = onlyDigits(value);
      if (!digits) return "Código do país é obrigatório";
      if (digits.length < 1 || digits.length > 3) return "Código do país deve conter entre 1 e 3 dígitos";
      return null;
    }

    case "areaCode": {
      const digits = onlyDigits(value);
      if (!digits) return "DDD é obrigatório";
      if (!hasLength(digits, 2)) return "DDD deve conter exatamente 2 dígitos";
      return null;
    }

    case "phone": {
      const digits = onlyDigits(value);
      if (!digits) return "Telefone é obrigatório";
      if (!hasLength(digits, 9)) return "Telefone deve conter exatamente 9 dígitos";
      return null;
    }

    case "birthDate": {
      if (!value.trim()) return "Data de nascimento é obrigatória";
      if (!isPastDateBr(value)) return "Data de nascimento inválida";
      return null;
    }

    case "password": {
      if (!value) return "Senha é obrigatória";
      if (value.length > 64) return "Senha deve conter entre 6 e 64 caracteres";
      if (!hasMinLength(value, 6)) return "Senha deve conter entre 6 e 64 caracteres";
      if (!hasUppercase(value) || !hasLowercase(value) || !hasNumber(value)) {
        return "Senha deve conter letra maiúscula, minúscula e número";
      }
      return null;
    }

    case "referralCode": {
      if (!value) return null;
      if (!hasLength(value, 8)) return "Código de indicação deve conter exatamente 8 caracteres";
      if (!/^[A-Z0-9]{8}$/.test(value)) {
        return "Código de indicação aceita apenas letras maiúsculas e números";
      }
      return null;
    }

    default:
      return null;
  }
}

export function validateRegisterTerms(values: RegisterFormValues): string | null {
  if (!values.acceptTerms) {
    return "Você precisa aceitar os termos e regulamentos";
  }

  return null;
}