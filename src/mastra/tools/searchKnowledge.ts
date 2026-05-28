import { searchKnowledge } from '@/src/service/rag/ragService';
import { categoryOptions } from '@/src/utils/constants/constants';
import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

export const searchKnowledgeTool =
  createTool({
    id: 'search-knowledge',

    description: `
      SEMPRE USE ESTA FERRAMENTA PARA RESPONDER PERGUNTAS SOBRE O CARDÁPIO.
      RECOMENDAÇÕES DE BEBIDAS, COMIDAS OU SOBREMESAS, E QUALQUER OUTRA PERGUNTA RELACIONADA AOS PRODUTOS DA CAFETERIA.
    `,

    inputSchema: z.object({
      query: z.string(),
      category: z.enum(categoryOptions).optional(),
      avoid: z.array(z.string()).optional(),
    }),

    execute: async ({
      context,
    }) => {
      const avoid = (context.avoid ?? []).map(v => v.toLowerCase());

      console.log('Executing searchKnowledgeTool with context:', context);
      return await searchKnowledge(
        context.query,
        context.category,
        avoid
      );
    },
  });