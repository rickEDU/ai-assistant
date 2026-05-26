import {
  createFacts,
} from '@/src/repository/facts/factsRepo';
import {
  createChatMessage,
  getChatMessagesByUserId,
} from '@/src/repository/chat/chatRepo';
import { coffeeAgent } from '@/src/mastra/agents/coffeeAgent';
import { memoryAgent } from '@/src/mastra/agents/memoryAgent';

const TAG = 'SERVICE(POST): chat ';

export async function chatMessageService(id: string, message: string): Promise<string> {
  try {
    const facts = await memoryAgent.generateLegacy(` Usuário ID: ${id} Mensagem: ${message} `, );

    if (facts.text) {
      const parsedFacts = JSON.parse(facts.text).facts;
      if (parsedFacts.length) {
        const factsToStore = parsedFacts.map((fact: { type: string; item: string; category: string }) => ({
          ...fact,
          user_id: id,
        }));
        await createFacts(factsToStore);
      }
    }
  
    const response = await coffeeAgent.generateLegacy( ` Usuário ID: ${id} Mensagem: ${message} `, );
    await createChatMessage(id, message, response.text);

    return response.text;
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
