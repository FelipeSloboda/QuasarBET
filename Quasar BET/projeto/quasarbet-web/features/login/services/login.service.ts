import { http } from "@/lib/http";
import type { ApiResponse } from "@/types/api";
import type { LoginPayload } from "@/features/login/types/login.types";

export async function login(payload: LoginPayload) {
  return http.post<ApiResponse<unknown>>("/auth/login", payload);
}