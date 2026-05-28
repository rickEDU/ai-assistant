import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

import { getFactsByUserId }
from '@/src/repository/facts/factsRepo';

export const getUserFactsTool =
  createTool({
    id: 'get-user-facts',

    description:
      'Busca preferências e fatos do usuário',

    inputSchema: z.object({
      userId: z.string(),
    }),

    execute: async ({ context }) => {
      console.log('Executing getUserFactsTool with context:', context);
      const facts = await getFactsByUserId(
        context.userId,
      );

      return { facts };
    },
  });
