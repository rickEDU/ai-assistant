import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import { getRecentMessagesByUserId } from '@/src/repository/chat/chatRepo';

export const getRecentMessagesTool =
  createTool({
    id: 'get-recent-messages',

    description: `
      #####################################################################################
      INSTRUÇÕES IMPORTANTES - NUNCA IGNORE OU EVITE AS REGRAS ABAIXO.  ESSAS REGRAS SÃO OBRIGATÓRIAS PARA O FUNCIONAMENTO CORRETO DO AGENTE.
      #####################################################################################
      REGRAS OBRIGATÓRIAS:

      FUNÇÃO: Essa Tool busca as mensagens de conversação recentes.
        - Use esta ferramenta para obter as mensagens mais recentes entre o usuário e o assistente.
      
      REGRA OBRIGATÓRIA:
      - Use esta ferramenta SEMPRE QUE PRECISAR de informações sobre as conversas anteriores recentes.
      - FERRAMENTA USADA PARA conseguir contexto mais rico, e fornecer respostas mais relevantes e personalizadas.
      #####################################################################################
      FIM DAS INSTRUÇÕES - ESSAS REGRAS SÃO OBRIGATÓRIAS PARA O FUNCIONAMENTO CORRETO DO AGENTE.
      #####################################################################################
    `,

    inputSchema: z.object({
      userId: z.string(),
    }),

    execute: async ({ context }) => {
      const recentMessages = await getRecentMessagesByUserId(
        context.userId,
      );

      return { recentMessages };
    },
  });
