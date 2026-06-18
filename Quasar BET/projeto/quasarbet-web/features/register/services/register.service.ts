import { http } from "@/lib/http";
import type { ApiResponse } from "@/types/api";
import type { RegisterPayload } from "@/features/register/types/register.types";

export async function register(payload: RegisterPayload) {
  return http.post<ApiResponse<unknown>>("/users", payload);
}