import ollama from 'ollama';
import {
  createFacts,
  getFactsByUserId,
} from '@/src/repository/facts/factsRepo';
import {
  createChatMessage,
  getChatMessagesByUserId,
  getRecentMessagesByUserId,
} from '@/src/repository/chat/chatRepo';
import { searchKnowledge } from '../rag/ragService';
import { shouldUseRag } from '@/src/utils/helper/shouldUseRag';
import { shouldUseFacts } from '@/src/utils/helper/shouldUserFacts';

const TAG = 'SERVICE(POST): chat ';

export async function chatMessageService(id: string, message: string) {
  try {
    // tratar a mensagem para prevenir injeção de código ou outros ataques
    let factsText = '';
    let ragText = '';
    if (shouldUseRag(message)) {
      const ragDocs = await searchKnowledge(message);
      ragText = ragDocs.join('\n');
    }
    // buscar fatos relevantes sobre o usuário no banco de dados
    if (shouldUseFacts(message)) {
      const facts = await getFactsByUserId(id);

      if (facts?.length) {
        const parsedFacts = facts.flatMap((f: { fact: string }) =>
          JSON.parse(f.fact),
        );

        const uniqueFacts = [...new Set(parsedFacts)];

        factsText = uniqueFacts.map((fact) => `- ${fact}`).join('\n');
      }
    }
    console.log('Fatos formatados para IA:', factsText);
    // const facts = ''; // substituir por consulta real ao banco de dados usando o id do usuário'
    const history = await getRecentMessagesByUserId(id);
    let historyText = '';
    if (history?.length) {
        historyText = history
          .map(
            message => `
                Usuário: ${message?.user_message}
                Assistente: ${message?.assistant_message}
            `,
          ).join('\n');
    }

    const response = await ollama.chat({
      model: 'llama3',
      messages: [
        {
          role: 'system',
          content: `
            Você é um assistente de cafeteria especializado.

            Use:
            - memória do usuário
            - contexto da cafeteria
            - preferências pessoais

            Seja natural e personalizado.
            `,
        },
        {
          role: 'user',
          content: `
            FACTS:
            ${factsText}

            BASE DE CONHECIMENTO:
            ${ragText}

            HISTÓRICO DE CONVERSA:
            ${historyText}

            MENSAGEM:
            ${message}
          `,
        },
      ],
    });

    const extraction = await ollama.chat({
      model: 'llama3',
      messages: [
        {
          role: 'system',
          content: `
            Extraia apenas fatos duradouros e relevantes sobre o usuário.

            NÃO extraia:
            - pedidos temporários
            - perguntas genéricas
            - contexto momentâneo

            Retorne JSON:
            {
              "facts": []
            }
            `,
        },
        {
          role: 'user',
          content: `
            Mensagem:
            ${message}
          `,
        },
      ],
    });

    // const response = await ollama.chat({
    //   model: 'llama3',
    //   messages: [
    //     {
    //       role: 'user',
    //       content: `
    //         Base de conhecimento da cafeteria:
    //         ${ragText}

    //         Você é um assistente pessoal inteligente. Use os seguintes fatos anteriores sobre o usuário:
    //         ${factsText}

    //         Extraia novos fatos duradouros e relevantes sobre o usuário e responda a mensagem do usuário.
    //         Mensagem:
    //         ${message}

    //         Retorne JSON nesse formato 
    //         {
    //           "facts": [""],
    //           "resposta": ""
    //         }.
    //       `,
    //     },
    //   ],
    // });

    const jsonMatch = extraction.message.content.match(/\{[\s\S]*\}/);
    console.log(
      'Resposta jsonMatch:',
      jsonMatch ? jsonMatch[0] : 'Nenhum JSON encontrado',
    );
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      console.log('Resposta parsed:', parsed);
      await createFacts(id, JSON.stringify(parsed.facts));
      await createChatMessage(id, message, response.message.content);
      // atualizar/criar os fatos do usuário no banco de dados usando parsed.user_info
      // armazenar a message e a resposta da IA para ter o histórico de conversas do usuário

      console.log('\nAssistente:', parsed);
    }
    return response.message.content;
  } catch (e: any) {
    console.log(TAG, e);
    if (!e.status) {
      e.status = 500;
    }
    throw e;
  }
}

export async function chatHistoryService(id: string) {
  try {
    const chatHistory = await getChatMessagesByUserId(id);
    return chatHistory;
  } catch (e: any) {
    console.log(TAG, e);
    if (!e.status) {
      e.status = 500;
    }
    throw e;
  }
}
