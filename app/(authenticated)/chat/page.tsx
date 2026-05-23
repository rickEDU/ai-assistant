'use client';

import { useEffect, useRef, useState } from 'react';
import { BsRobot, BsSendFill } from 'react-icons/bs';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}

export default function ChatPage() {
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [messages, setMessages] = useState<Message[]>([
        {
            id: crypto.randomUUID(),
            role: 'assistant',
            content: 'Olá! Como posso ajudar você hoje?',
        },
    ]);

    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: 'smooth',
        });
    }, [messages]);

    async function handleSendMessage() {
        if (!message.trim()) {
            return;
        }

        const userMessage: Message = {
            id: crypto.randomUUID(),
            role: 'user',
            content: message,
        };

        setMessages((prev) => [...prev, userMessage]);

        setMessage('');
        setIsLoading(true);

        try {
            // MOCK TEMPORÁRIO
            // depois você troca pela chamada real da IA
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message,
                }),
            });

            const responseJson = await response.json();

            const assistantMessage: Message = {
                id: crypto.randomUUID(),
                role: 'assistant',
                content: `Assistente: ${response.ok ? await responseJson.data : 'Desculpe, ocorreu um erro.'}`,
            };

            setMessages((prev) => [...prev, assistantMessage]);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex h-screen flex-col bg-black text-white">
            {/* HEADER */}
            <header className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black">
                        <BsRobot size={20} />
                    </div>

                    <div>
                        <h1 className="text-lg font-bold">
                            AI Assistant
                        </h1>

                        <p className="text-sm text-zinc-400">
                            Assistente inteligente com memória
                        </p>
                    </div>
                </div>

                <div className="rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-300">
                    Usuário: guest
                </div>
            </header>

            {/* MENSAGENS */}
            <main className="flex-1 overflow-y-auto px-4 py-6">
                <div className="mx-auto flex max-w-4xl flex-col gap-4">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex ${
                                message.role === 'user'
                                    ? 'justify-end'
                                    : 'justify-start'
                            }`}
                        >
                            <div
                                className={`max-w-[80%] rounded-2xl px-5 py-4 text-sm leading-relaxed shadow-lg ${
                                    message.role === 'user'
                                        ? 'bg-white text-black'
                                        : 'border border-zinc-800 bg-zinc-950 text-white'
                                }`}
                            >
                                {message.content}
                            </div>
                        </div>
                    ))}

                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="flex items-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-950 px-5 py-4 text-sm text-zinc-300">
                                <div className="h-2 w-2 animate-bounce rounded-full bg-white" />
                                <div className="h-2 w-2 animate-bounce rounded-full bg-white delay-100" />
                                <div className="h-2 w-2 animate-bounce rounded-full bg-white delay-200" />
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>
            </main>

            {/* INPUT */}
            <footer className="border-t border-zinc-800 bg-black px-4 py-4">
                <div className="mx-auto flex max-w-4xl items-center gap-3">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSendMessage();
                            }
                        }}
                        placeholder="Digite sua mensagem..."
                        className="flex-1 rounded-2xl border border-zinc-800 bg-zinc-950 px-5 py-4 outline-none transition-all focus:border-white"
                    />

                    <button
                        onClick={handleSendMessage}
                        disabled={isLoading}
                        className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-black transition-all hover:bg-zinc-300 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <BsSendFill size={18} />
                    </button>
                </div>
            </footer>
        </div>
    );
}