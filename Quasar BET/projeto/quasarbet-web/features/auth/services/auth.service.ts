import { http } from "@/lib/http";
import type { ApiResponse } from "@/types/api";
import type { LoginPayload, RegisterPayload } from "@/features/auth/types/auth.types";

export async function register(payload: RegisterPayload) {
  return http.post<ApiResponse<unknown>>("/users", payload);
}

export async function login(payload: LoginPayload) {
  return http.post<ApiResponse<unknown>>("/auth/login", payload);
}