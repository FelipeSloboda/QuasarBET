"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import TesteLista from "@/components/TesteLista";
import { buscarTeste } from "@/services/api";
import { Teste } from "@/types/teste";

export default function Home() {
  const [dados, setDados] = useState<Teste[]>([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    buscarTeste()
      .then((data) => {
        setDados(data);
      })
      .catch((error) => {
        console.error(error);
        setErro("Erro ao buscar API");
      });
  }, []);

  return (
    
    <div>
      <p>Home</p>
    
      <br/>

      <h1>Teste da API:</h1>

      {erro && <p>{erro}</p>}
      <TesteLista dados={dados} />

      <br/>

      <ul>
        <li><Link href="/login">Login</Link></li>
        <li><Link href="/forgot-password">Forgot Password</Link></li>
        <li><Link href="/reset-password">Reset Password</Link></li>
        <li><Link href="/register">Register</Link></li>
        <li><Link href="/change-email">Change Email</Link></li>
        <li><Link href="/confirm-email-change">Confirm Email Change</Link></li>
        <li><Link href="/dashboard">Dashboard</Link></li>
      </ul>
    </div>
  );
}