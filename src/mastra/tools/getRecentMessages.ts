import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import { getRecentMessagesByUserId } from '@/src/repository/chat/chatRepo';

export const getRecentMessagesTool =
  createTool({
    id: 'get-recent-messages',

    description: `
      Busca o histórico recente de mensagens entre o usuário e o assistente.
      Use obrigatoriamente sempre que a pergunta atual fizer referência ou necessitar de contexto de interações anteriores.
    `,

    inputSchema: z.object({
      userId: z.string(),
    }),

    execute: async ({ context }) => {
      console.log('Executing getRecentMessagesTool with context:', context);
      const recentMessages = await getRecentMessagesByUserId(
        context.userId,
      );

      return { recentMessages };
    },
  });
