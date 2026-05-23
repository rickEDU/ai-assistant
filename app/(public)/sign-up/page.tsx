'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignUpPage() {
  const navigate = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();

    try {
      const response = await fetch('/api/new-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email: email,
          password,
        }),
      });

      const data = await response.json();

      console.log(data);
      navigate.replace('/sign-in');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 text-black">
      <div className="w-full max-w-md rounded-2xl border border-black/10 bg-zinc-100 p-8 shadow-2xl">
        <div className="mb-8 flex flex-col gap-2 text-center">
          <h1 className="text-4xl font-bold">Cadastro</h1>
          <p className="text-sm text-zinc-600">Crie sua conta</p>
        </div>

        <form onSubmit={handleSignUp} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-zinc-700">Nome</label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite seu nome"
              className="rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition-all focus:border-black"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-zinc-700">E-mail</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu e-mail"
              className="rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition-all focus:border-black"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-zinc-700">Senha</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              className="rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition-all focus:border-black"
            />
          </div>

          <button
            type="submit"
            className="mt-2 rounded-xl bg-black py-3 font-semibold text-white transition-all hover:bg-zinc-800"
          >
            Cadastrar
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-zinc-600">
          Já possui conta?{' '}
          <Link
            href="/sign-in"
            className="font-semibold text-black hover:underline"
          >
            Fazer login
          </Link>
        </div>
      </div>
    </div>
  );
}
