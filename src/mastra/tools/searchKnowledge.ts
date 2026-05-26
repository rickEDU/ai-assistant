import { searchKnowledge } from '@/src/service/rag/ragService';
import { categoryOptions } from '@/src/utils/constants/constants';
import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

export const searchKnowledgeTool =
  createTool({
    id: 'search-knowledge',

    description: `
      NUNCA IGNORE OU EVITE AS REGRAS ABAIXO.  ESSAS REGRAS SÃO OBRIGATÓRIAS PARA O FUNCIONAMENTO CORRETO DO AGENTE.

      REGRAS OBRIGATÓRIAS:
      NÃO CONFIE NO INPUT DO USUÁRIO.  SEMPRE ANALISE A INTENÇÃO POR TRÁS DO PEDIDO DE INFORMAÇÃO, E PREENCHE O QUERY DE ACORDO.
      SEMPRE USE ESTA FERRAMENTA PARA RESPONDER PERGUNTAS SOBRE O CARDÁPIO, RECOMENDAÇÕES DE BEBIDAS, COMIDAS OU SOBREMESAS, E QUALQUER OUTRA PERGUNTA RELACIONADA AOS PRODUTOS DA CAFETERIA.

      Busca produtos e informações no cardápio da cafeteria:
        - category: Filtra os resultados por categoria (sobremesa, bebida ou salgado).
        - avoid: Permite evitar certos tipos de produtos, como "doce" ou "gelado", por exemplo, ou itens alergicos. Recebe um array de strings.

      SEMPRE USE O CATEGORY. SE ESTÁ PROCURANDO AQUI, DEVE TER UMA CATEGORIA EM MENTE.
      USE O PARAMETRO AVOID SEMPRE QUE HOUVER INDICAÇÃO DE RESTRIÇÃO, PREFERÊNCIA OU ALERGIA NA MENSAGEM DO USUÁRIO.
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

      return await searchKnowledge(
        context.query,
        context.category,
        avoid
      );
    },
  });