import database from '@/src/database/database';
// import { createMongoConnection } from "@/src/database/pool";
import { INewUser } from '@/src/utils/interfaces/interface';

const TAG = 'REPOSITORY(POST): userRepo - ';

export async function createUserRepo(user: INewUser) {
  try {
    const stmt = database.prepare(`
            INSERT INTO users (name, email, password)
            VALUES (?, ?, ?)
        `);
    await stmt.run(user.name, user.email, user.password);
  } catch (error) {
    console.log(TAG + 'createUserRepo', error);
    throw error;
  }
}

export async function getUserById(id: string) {
  try {
    const stmt = database.prepare(`
            SELECT * FROM users WHERE id = ?
        `);
    return await stmt.get(id);
  } catch (error) {
    console.log(TAG + 'getUserById', error);
    throw error;
  }
}

export async function getUserByEmail(email: string) {
  try {
    const stmt = database.prepare(`
            SELECT * FROM users WHERE email = ?
        `);
    return await stmt.get(email);
  } catch (error) {
    console.log(TAG + 'getUserByEmail', error);
    throw error;
  }
}
