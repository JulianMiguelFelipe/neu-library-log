const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const path = require('path');
const { pool, initDb } = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());
// Serves all files in the 'public' folder (index.html, register.html, admin.html)
app.use(express.static(path.join(__dirname, '../public')));

// --- DATABASE STARTUP ---
// This runs your SQL scripts to ensure tables exist on Render/Local
initDb();

// --- AUTHENTICATION ROUTES ---

/**
 * POST /api/register
 * Creates a new user account and saves it to PostgreSQL
 */
app.post('/api/register', async (req, res) => {
    const { name, email, program, password } = req.body;
    try {
        // Securely hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const result = await pool.query(
            'INSERT INTO users (name, email, program, password) VALUES ($1, $2, $3, $4) RETURNING id',
            [name, email, program, hashedPassword]
        );
        
        console.log(`✅ New user registered: ${email}`);
        res.status(201).json({ message: "User created successfully", userId: result.rows[0].id });
    } catch (err) {
        console.error("❌ Registration Error:", err.message);
        res.status(500).json({ error: "Email already exists or database error" });
    }
});

/**
 * POST /api/login
 * Validates credentials, checks if blocked, and logs the library visit
 */
app.post('/api/login', async (req, res) => {
    const { email, password, reason } = req.body;
    try {
        // 1. Find the user
        const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        
        if (userResult.rows.length === 0) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const user = userResult.rows[0];

        // 2. Check if the Admin has blocked this user
        if (user.is_blocked) {
            return res.status(403).json({ error: "Access Denied. You are currently blocked from the library." });
        }

        // 3. Verify Password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // 4. Log the visit into the 'logs' table
        await pool.query(
            'INSERT INTO logs (user_id, reason) VALUES ($1, $2)',
            [user.id, reason]
        );

        console.log(`📖 Visit logged for: ${user.name}`);

        // 5. Send user data back to frontend for the Welcome screen
        res.json({
            message: "Login successful",
            user: {
                name: user.name,
                program: user.program
            }
        });
    } catch (err) {
        console.error("❌ Login Error:", err.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

// --- ADMIN ROUTES ---

/**
 * GET /Admin
 * Clean URL access for the admin page
 */
app.get('/Admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/admin.html'));
});

/**
 * GET /api/admin/data
 * Fetches all logs (with user names) and calculates statistics for the cards
 */
app.get('/api/admin/data', async (req, res) => {
    try {
        // Fetch all visitor history
        const logsResult = await pool.query(`
            SELECT logs.user_id, users.name, users.program, logs.reason, logs.visit_time 
            FROM logs 
            JOIN users ON logs.user_id = users.id 
            ORDER BY logs.visit_time DESC
        `);

        // Calculate statistics using SQL filters
        const statsQuery = `
            SELECT 
                COUNT(*) FILTER (WHERE visit_time > NOW() - INTERVAL '1 day') as day,
                COUNT(*) FILTER (WHERE visit_time > NOW() - INTERVAL '1 week') as week,
                COUNT(*) FILTER (WHERE visit_time > NOW() - INTERVAL '1 month') as month
            FROM logs;
        `;
        const statsResult = await pool.query(statsQuery);

        res.json({
            logs: logsResult.rows,
            stats: statsResult.rows[0]
        });
    } catch (err) {
        console.error("❌ Admin Data Error:", err.message);
        res.status(500).json({ error: "Failed to fetch admin data" });
    }
});

/**
 * POST /api/admin/block
 * Allows admins to block a specific user by their ID
 */
app.post('/api/admin/block', async (req, res) => {
    const { userId } = req.body;
    try {
        await pool.query('UPDATE users SET is_blocked = true WHERE id = $1', [userId]);
        console.log(`🚫 User ID ${userId} has been blocked.`);
        res.json({ message: "User blocked successfully" });
    } catch (err) {
        console.error("❌ Block Error:", err.message);
        res.status(500).json({ error: "Failed to block user" });
    }
});

// --- START SERVER ---
app.listen(PORT, () => {
    console.log(`
    *******************************************
    🚀 NEU Library Server is running!
    🌐 Local: http://localhost:${PORT}
    📂 Serving UI from: /public
    *******************************************
    `);
});