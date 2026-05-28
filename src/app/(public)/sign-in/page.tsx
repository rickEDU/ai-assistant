'use client';

import { useAuth } from '@/src/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function SignInPage() {
  const navigate = useRouter();
  const { setUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const responseJson = await response.json();
        setUser({ name: responseJson.data.name });
        navigate.replace('/chat');
      } else {
        toast.error('E-mail ou senha inválidos');
      }
    } catch (error) {
      toast.error('Ocorreu algum erro. Tente novamente mais tarde.');
      console.error(error);
      return;
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-zinc-950 p-8 shadow-2xl">
        <div className="mb-8 flex flex-col gap-2 text-center">
          <h1 className="text-4xl font-bold">Login</h1>
          <p className="text-sm text-zinc-400">Entre na sua conta</p>
        </div>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-zinc-300 padding-right-2">
              E-mail
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu e-mail"
              className="rounded-xl border border-zinc-800 bg-black px-4 py-3 pl-5 outline-none transition-all focus:border-white"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-zinc-300">Senha</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              className="rounded-xl border border-zinc-800 bg-black px-4 py-3 pl-5 outline-none transition-all focus:border-white"
            />
          </div>

          <button
            type="submit"
            className="mt-2 rounded-xl bg-white py-3 font-semibold text-black transition-all hover:bg-zinc-200"
          >
            Entrar
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-zinc-400">
          Não possui conta?{' '}
          <Link
            href="/sign-up"
            className="font-semibold text-white hover:underline"
          >
            Criar conta
          </Link>
        </div>
      </div>
    </div>
  );
}
