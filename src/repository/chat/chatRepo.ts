import database from '@/src/database/database';
import { ChatMessage } from '@/src/interfaces/interface';

const TAG = 'REPOSITORY(POST): chatMessagesRepo ';

export async function createChatMessage(
  user_id: string,
  user_message: string,
  assistant_message: string,
) {
  try {
    const stmt = database.prepare(`
            INSERT INTO chat_messages (user_id, user_message, assistant_message)
            VALUES (?, ?, ?)
        `);
    await stmt.run(user_id, user_message, assistant_message);
  } catch (error) {
    console.log(TAG, error);
    throw error;
  }
}

export async function getChatMessagesByUserId(user_id: string) {
  try {
    const stmt = database.prepare(`
            SELECT user_message, assistant_message 
            FROM chat_messages 
            WHERE user_id = ? 
            order by created_at asc
        `);
    return await stmt.all(user_id) as ChatMessage[];
  } catch (error) {
    console.log(TAG, error);
    throw error;
  }
}

export async function getRecentMessagesByUserId(user_id: string) {
  try {
    const stmt = database.prepare(`
            SELECT user_message, assistant_message 
            FROM chat_messages 
            WHERE user_id = ? order by created_at desc limit 2
        `);
    return await stmt.all(user_id) as ChatMessage[];
  } catch (error) {
    console.log(TAG, error);
    throw error;
  }
}
