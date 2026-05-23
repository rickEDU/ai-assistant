import database from '@/src/database/database';

const TAG = 'REPOSITORY(POST): getFactsByUserId ';

export async function getFactsByUserId(
  id: string,
): Promise<{ fact: string }[] | undefined> {
  try {
    const stmt = database.prepare(`
            SELECT fact FROM user_facts WHERE user_id = ?
        `);
    return (await stmt.all(id)) as { fact: string }[] | undefined;
  } catch (error) {
    console.log(TAG, error);
    throw error;
  }
}

export async function createFacts(user_id: string, fact: string) {
  try {
    const stmt = database.prepare(`
            INSERT INTO user_facts (user_id, fact)
            VALUES (?, ?)
        `);
    await stmt.run(user_id, fact);
  } catch (error) {
    console.log(TAG, error);
    throw error;
  }
}
