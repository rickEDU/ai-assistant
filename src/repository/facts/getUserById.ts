import database from "@/src/database/database";

const TAG = "REPOSITORY(POST): getFactsByUserId ";

export async function getFactsByUserId(id: string) {
    try{ 
        const stmt = database.prepare(`
            SELECT * FROM user_facts WHERE user_id = ?
        `);
        return await stmt.get(id);
    } catch (error) {
        console.log(TAG, error);
        throw error;
    }
}
