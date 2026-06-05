import type { LoginPayload } from "@/features/login/types/login.types";

export function validateLoginPayload(payload: LoginPayload): string[] {
  const errors: string[] = [];
  if (!payload.emailOrCpf.trim()) errors.push("E-mail ou CPF é obrigatório");
  if (!payload.password.trim()) errors.push("Senha é obrigatória");
  return errors;
}