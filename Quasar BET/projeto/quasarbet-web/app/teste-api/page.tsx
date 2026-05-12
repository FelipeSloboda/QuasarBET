"use client";

import { useState } from "react";

type TesteApiItem = {
	id?: number;
	descricao?: string;
	data?: string;
	[key: string]: unknown;
};

export default function TesteApiPage() {
	const [dados, setDados] = useState<TesteApiItem[] | null>(null);
	const [carregando, setCarregando] = useState(false);
	const [erro, setErro] = useState<string | null>(null);

	async function enviarRequisicao() {
		setCarregando(true);
		setErro(null);

		try {
			const apiUrl = process.env.NEXT_PUBLIC_API_URL;

			if (!apiUrl) {
				throw new Error("NEXT_PUBLIC_API_URL nao esta definida.");
			}

			const response = await fetch(`${apiUrl}/teste`);

			if (!response.ok) {
				throw new Error(`Erro na API: ${response.status} ${response.statusText}`);
			}

			const resultado = (await response.json()) as TesteApiItem[];
			setDados(Array.isArray(resultado) ? resultado : [resultado]);
		} catch (error) {
			setDados(null);
			setErro(error instanceof Error ? error.message : "Erro inesperado na requisicao.");
		} finally {
			setCarregando(false);
		}
	}

	return (
		<main className="bg-page min-h-screen flex items-center justify-center">
			<section className="w-full max-w-sm px-8 py-10 rounded-xl border border-white/10 bg-[var(--color-bg-secondary)]">
				<h1 className="text-white text-xl font-bold uppercase tracking-widest">Teste da API - QuasarBET:</h1>
				<p className="mt-2 link-focus text-sm leading-relaxed break-all">
					Endpoint: {process.env.NEXT_PUBLIC_API_URL}/teste
				</p>

				<div className="mt-5">
					<button
						type="button"
						onClick={enviarRequisicao}
						disabled={carregando}
						className="btn-primary w-full text-white font-bold py-3 rounded-md uppercase tracking-widest disabled:cursor-not-allowed disabled:opacity-60"
					>
						{carregando ? "Enviando..." : "Enviar requisicao"}
					</button>
				</div>

				{erro ? (
					<p className="mt-4 rounded-md border border-amber-500/20 bg-amber-500/10 p-3 text-sm text-amber-200">
						{erro}
					</p>
				) : null}

				{dados ? (
					<div className="mt-5 space-y-3">
						<h2 className="text-white text-sm font-bold uppercase tracking-wider">Retorno:</h2>

						{dados.map((item, index) => (
							<article
								key={item.id ?? index}
								className="rounded-md border border-white/10 bg-black/20 p-4 text-sm text-white"
							>
								<p>
									<strong className="link-focus">ID:</strong> {String(item.id ?? "-")}
								</p>
								<p>
									<strong className="link-focus">Descricao:</strong> {String(item.descricao ?? "-")}
								</p>
								<p>
									<strong className="link-focus">Data:</strong> {String(item.data ?? "-")}
								</p>
							</article>
						))}
					</div>
				) : null}
			</section>
		</main>
	);
}
