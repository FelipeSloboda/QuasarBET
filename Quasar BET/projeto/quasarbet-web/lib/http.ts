type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

async function request<TResponse>(
  path: string,
  method: HttpMethod,
  body?: unknown,
  init?: RequestInit,
): Promise<TResponse> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    ...init,
  });

  const data = (await response.json().catch(() => null)) as TResponse;
  if (!response.ok) {
    throw data;
  }

  return data;
}

export const http = {
  get: <TResponse>(path: string, init?: RequestInit) => request<TResponse>(path, "GET", undefined, init),
  post: <TResponse>(path: string, body?: unknown, init?: RequestInit) => request<TResponse>(path, "POST", body, init),
  put: <TResponse>(path: string, body?: unknown, init?: RequestInit) => request<TResponse>(path, "PUT", body, init),
  patch: <TResponse>(path: string, body?: unknown, init?: RequestInit) => request<TResponse>(path, "PATCH", body, init),
  delete: <TResponse>(path: string, init?: RequestInit) => request<TResponse>(path, "DELETE", undefined, init),
};