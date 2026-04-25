import { Teste } from "@/types/teste";

export async function buscarTeste(): Promise<Teste[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teste`);

  if (!response.ok) { throw new Error("Erro ao buscar API"); }

  return response.json();
}