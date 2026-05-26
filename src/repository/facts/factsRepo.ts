import database from '@/src/database/database';
import { IFact } from '@/src/interfaces/interface';

const TAG = 'REPOSITORY(POST): getFactsByUserId ';

export async function getFactsByUserId(
  id: string,
): Promise< IFact[] | undefined> {
  try {
    const stmt = database.prepare(`
            SELECT type, item, category FROM user_facts WHERE user_id = ?
        `);
    return (await stmt.all(id)) as IFact[] | undefined;
  } catch (error) {
    console.log(TAG, error);
    throw error;
  }
}

export async function createFacts(facts: IFact[]) {
  try {
    const stmt = database.prepare(`
      INSERT INTO user_facts (user_id, type, item, category)
      VALUES (?, ?, ?, ?)
    `);

    const insertMany = database.transaction((facts) => {
      for (const fact of facts) {
        stmt.run(fact.user_id, fact.type, fact.item, fact.category);
      }
    });

    insertMany(facts);
  } catch (error) {
    console.log(TAG, error);
    throw error;
  }
}
