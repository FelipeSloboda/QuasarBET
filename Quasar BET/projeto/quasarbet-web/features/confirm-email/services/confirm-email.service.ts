import { http } from "@/lib/http";
import type { ApiResponse } from "@/types/api";

export async function confirmEmail(token: string) {
  return http.post<ApiResponse<null>>("/email-verification/confirm", { token });
}
