import { http } from "@/lib/http";
import type { ApiResponse } from "@/types/api";

export async function resendEmailVerification(sessionToken: string) {
  return http.post<ApiResponse<null>>("/email-verification/resend", { sessionToken });
}
