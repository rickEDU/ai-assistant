import database from "@/src/database/database";

const TAG = "REPOSITORY(POST): getUserByEmail ";

export async function getUserByEmail(email: string) {
    try{ 
        const stmt = database.prepare(`
            SELECT * FROM users WHERE email = ?
        `);
        return await stmt.get(email);
    } catch (error) {
        console.log(TAG, error);
        throw error;
    }
}
