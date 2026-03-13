const { Pool } = require('pg');
require('dotenv').config();

// Connect using the URL from our .env file
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL.includes('localhost') ? false : { rejectUnauthorized: false }
});

const initDb = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      program TEXT NOT NULL,
      is_blocked BOOLEAN DEFAULT false
    );

    CREATE TABLE IF NOT EXISTS logs (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id),
      reason TEXT NOT NULL,
      visit_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(queryText);
    console.log("✅ Database Tables Initialized");
  } catch (err) {
    console.error("❌ Error initializing database:", err);
  }
};

module.exports = { pool, initDb };