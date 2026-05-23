import database from "@/src/database/database";
// import { createMongoConnection } from "@/src/database/pool";
import { INewUser } from "@/src/interfaces/interface";

const TAG = "REPOSITORY(POST): createUserRepo ";

export async function createUserRepo(user: INewUser) {  
    // const pool  = createMongoConnection();  
    // const client = await pool.connect();
    // const collection = client.db("literalink-dev").collection("users");
    try{ 
        const stmt = database.prepare(`
            INSERT INTO users (name, email, password)
            VALUES (?, ?, ?)
        `);
        await stmt.run(user.name, user.email, user.password);
    } catch (error) {
        console.log(TAG, error);
        throw error;
    }
}

// export async function getUserRepo(email: string) {
//     try{ 
//         const stmt = database.prepare(`
//             SELECT * FROM users WHERE email = ?
//         `);
//         return await stmt.get(email);
//     } catch (error) {
//         console.log(TAG, error);
//         throw error;
//     }
// }



export function getFacts(name: string) {
  const stmt = database.prepare(`
    SELECT fact
    FROM user_facts
    WHERE name = ?
  `);

  return stmt.all(name);
}

export function saveFact(name: string, fact: string) {
  const stmt = database.prepare(`
    INSERT INTO user_facts (name, fact)
    VALUES (?, ?)
  `);

  stmt.run(name, fact);
}

export function updateFact(name: string, fact: string) {
  const stmt = database.prepare(`
    UPDATE user_facts
    SET fact = ?
    WHERE name = ?
  `);

  stmt.run(fact, name);
}

export function createUser(name: string, email: string, password: string) {
  const stmt = database.prepare(`
    INSERT INTO users (name, email, password)
    VALUES (?, ?, ?)
  `);
  stmt.run(name, email, password);
}

export function deleteUser(name: string) {
  const stmt = database.prepare(`
    DELETE FROM user_facts
    WHERE name = ?
  `);
  stmt.run(name);
}
