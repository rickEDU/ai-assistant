import ollama from 'ollama';
import {
  createFacts,
  getFactsByUserId,
} from '@/src/repository/facts/getUserById';
import {
  createChatMessage,
  getChatMessagesByUserId,
} from '@/src/repository/chat/chatRepo';

const TAG = 'SERVICE(POST): chat ';

export async function chatMessageService(id: string, message: string) {
  try {
    // tratar a mensagem para prevenir injeção de código ou outros ataques

    // buscar fatos relevantes sobre o usuário no banco de dados
    const facts = await getFactsByUserId(id); // substituir por consulta real ao banco de dados usando o id do usuário'
    let factsText = '';

    if (facts?.length) {
      const parsedFacts = facts.flatMap((f: { fact: string }) =>
        JSON.parse(f.fact),
      );

      const uniqueFacts = [...new Set(parsedFacts)];

      factsText = uniqueFacts.map((fact) => `- ${fact}`).join('\n');
    }
    console.log('Fatos formatados para IA:', factsText);
    // const facts = ''; // substituir por consulta real ao banco de dados usando o id do usuário'

    const response = await ollama.chat({
      model: 'llama3',
      messages: [
        {
          role: 'user',
          content: `
            Você é um assistente pessoal inteligente. Use os seguintes fatos anteriores sobre o usuário:
            ${factsText}

            Extraia novos fatos duradouros e relevantes sobre o usuário e responda a mensagem do usuário.
            Mensagem:
            ${message}

            Retorne JSON nesse formato 
            {
              "facts": [""],
              "resposta": ""
            }.
          `,
        },
      ],
    });
    // console.log('Resposta bruta:', response);
    const jsonMatch = response.message.content.match(/\{[\s\S]*\}/);
    console.log(
      'Resposta jsonMatch:',
      jsonMatch ? jsonMatch[0] : 'Nenhum JSON encontrado',
    );
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      console.log('Resposta parsed:', parsed);
      await createFacts(id, JSON.stringify(parsed.facts));
      await createChatMessage(id, message, parsed.resposta);
      // atualizar/criar os fatos do usuário no banco de dados usando parsed.user_info
      // armazenar a message e a resposta da IA para ter o histórico de conversas do usuário

      console.log('\nAssistente:', parsed);
      return parsed.resposta;
    }
    console.log('\n');
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
