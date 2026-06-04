import type { LoginPayload, RegisterPayload } from "@/features/auth/types/auth.types";

export function validateLoginPayload(payload: LoginPayload): string[] {
  const errors: string[] = [];
  if (!payload.emailOrCpf.trim()) errors.push("E-mail ou CPF é obrigatório");
  if (!payload.password.trim()) errors.push("Senha é obrigatória");
  return errors;
}

export function validateRegisterPayload(payload: RegisterPayload): string[] {
  const errors: string[] = [];
  if (!payload.firstName.trim()) errors.push("Nome é obrigatório");
  if (!payload.lastName.trim()) errors.push("Sobrenome é obrigatório");
  if (!payload.email.trim()) errors.push("E-mail é obrigatório");
  if (!payload.cpf.trim()) errors.push("CPF é obrigatório");
  if (!payload.password.trim()) errors.push("Senha é obrigatória");
  return errors;
}