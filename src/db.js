const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({ 
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

const initDb = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                email TEXT UNIQUE NOT NULL,
                full_name TEXT,
                role TEXT,
                college TEXT,
                program TEXT,
                department TEXT,
                position TEXT,
                is_blocked BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS logs (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
                purpose TEXT NOT NULL,
                visit_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            -- Required for connect-pg-simple session storage on Render
            CREATE TABLE IF NOT EXISTS "session" (
                "sid" varchar NOT NULL COLLATE "default",
                "sess" json NOT NULL,
                "expire" timestamp(6) NOT NULL
            ) WITH (OIDS=FALSE);
            
            DO $$ 
            BEGIN 
                IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'session_pkey') THEN
                    ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
                END IF;
            END $$;

            CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "session" ("expire");
        `);
        console.log("✅ Database schema verified.");
    } catch (err) { console.error("❌ Database Init Error:", err.message); }
};

module.exports = { pool, initDb };