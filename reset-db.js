const { pool, initDb } = require('./src/db');

async function resetDatabase() {
    console.log("⚠️ Starting database reset...");
    
    try {
        // 1. Drop existing tables in order (logs first because it references users)
        console.log("Dropping existing tables...");
        await pool.query(`
            DROP TABLE IF EXISTS logs;
            DROP TABLE IF EXISTS users;
            DROP TABLE IF EXISTS "session";
        `);
        console.log("✅ Tables dropped successfully.");

        // 2. Re-run the initialization from db.js
        console.log("Recreating tables with new schema...");
        await initDb();
        console.log("✅ Tables recreated successfully.");

    } catch (err) {
        console.error("❌ Error resetting database:", err.message);
    } finally {
        // 3. Close the pool connection so the script exits
        await pool.end();
        console.log("👋 Database connection closed.");
        process.exit();
    }
}

resetDatabase();