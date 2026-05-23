import database from "@/src/database/database";

const TAG = "REPOSITORY(POST): getUserById ";

export async function getUserById(id: string) {
    try{ 
        const stmt = database.prepare(`
            SELECT * FROM users WHERE id = ?
        `);
        return await stmt.get(id);
    } catch (error) {
        console.log(TAG, error);
        throw error;
    }
}
