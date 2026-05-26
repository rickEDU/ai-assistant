import Database from 'better-sqlite3';

const database: Database.Database = new Database('memory.db');

database.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    password TEXT
  )
`);

database.exec(`
  CREATE TABLE IF NOT EXISTS chat_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    user_message TEXT,
    assistant_message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )
`);

database.exec(`
  CREATE TABLE IF NOT EXISTS user_facts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT CHECK(type IN ('like', 'dislike', 'allergy')),
    user_id INTEGER,
    item TEXT,
    category TEXT CHECK(category IN ('sobremesa', 'bebida', 'salgado')),
    FOREIGN KEY(user_id) REFERENCES users(id)
  )
`);

export default database;
