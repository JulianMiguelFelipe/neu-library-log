const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session); 
const nodemailer = require('nodemailer'); 
const { pool, initDb } = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, 
    auth: {
        user: 'wanechpi@gmail.com',
        pass: 'wsklzgyipmhgyqfp' 
    },
    // This is the critical fix for ENETUNREACH on Render
    connectionTimeout: 10000,
    dnsTimeout: 5000,
    socketTimeout: 10000,
    // Forces IPv4
    family: 4 
});

app.use(session({
    store: new pgSession({
        pool : pool,                
        tableName : 'session'       
    }),
    secret: process.env.SESSION_SECRET || 'neu-library-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: 3600000, 
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    } 
}));

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public'), { index: 'index.html' }));

initDb();

app.get('/health', (req, res) => res.sendStatus(200));

// --- ADMIN AUTHENTICATION ---
app.post('/api/admin/login', (req, res) => {
    const { user, pass } = req.body;
    const adminPass = 'password123'; 
    const privilegedUsers = ['admin', 'cics.dean@neu.edu.ph', 'admin@neu.edu.ph'];

    if (privilegedUsers.includes(user.toLowerCase()) && pass === adminPass) {
        req.session.isAdmin = true;
        return res.sendStatus(200);
    }
    res.sendStatus(401);
});

app.get('/admin.html', (req, res) => {
    if (req.session.isAdmin) {
        res.sendFile(path.join(__dirname, '../public/admin.html'));
    } else {
        res.redirect('/admin-login.html');
    }
});

// --- KIOSK ENDPOINTS ---
app.post('/api/check-user', async (req, res) => {
    const { email } = req.body;
    const restricted = ['cics.dean@neu.edu.ph', 'admin@neu.edu.ph'];
    if(restricted.includes(email.toLowerCase())) {
        return res.status(403).json({ error: "Please use Admin Login" });
    }
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length > 0) {
            res.json({ exists: true, user: result.rows[0] });
        } else res.json({ exists: false });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/register', async (req, res) => {
    const { firstName, lastName, email, role, program, yearLevel, department, position } = req.body;
    const full_name = `${firstName} ${lastName}`;
    try {
        await pool.query(
            `INSERT INTO users (full_name, email, role, program, year_level, department, position) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [full_name, email, role, program, yearLevel, department, position]
        );
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(email)}`;
        const mailOptions = {
            from: `"NEU Library" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'NEU Library Access QR Code',
            html: `<div style="font-family: Arial; text-align: center;"><h2>Welcome!</h2><img src="${qrUrl}" width="200"></div>`
        };
        transporter.sendMail(mailOptions);
        res.status(201).json({ success: true });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/record-entry', async (req, res) => {
    const { userId, reason } = req.body;
    try {
        await pool.query('INSERT INTO logs (user_id, purpose) VALUES ($1, $2)', [userId, reason]);
        res.status(200).send("Logged");
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// --- ADMIN ENDPOINTS ---
app.get('/api/admin/full-data', async (req, res) => {
    try {
        const logs = await pool.query(`SELECT logs.id as log_id, users.id as user_id, users.full_name, users.email, users.role, users.program, users.year_level, users.department, users.position, users.is_blocked, logs.purpose, logs.visit_time FROM logs JOIN users ON logs.user_id = users.id ORDER BY logs.visit_time DESC`);
        const stats = await pool.query(`SELECT COUNT(*) FILTER (WHERE visit_time > NOW() - INTERVAL '1 day') as day, COUNT(*) FILTER (WHERE visit_time > NOW() - INTERVAL '1 week') as week, COUNT(*) FILTER (WHERE visit_time > NOW() - INTERVAL '1 month') as month FROM logs`);
        const sProg = await pool.query(`SELECT program, COUNT(*) FROM logs JOIN users ON logs.user_id = users.id WHERE users.role = 'Student' GROUP BY program`);
        const sYear = await pool.query(`SELECT year_level, COUNT(*) FROM logs JOIN users ON logs.user_id = users.id WHERE users.role = 'Student' GROUP BY year_level`);
        const fDept = await pool.query(`SELECT department, COUNT(*) FROM logs JOIN users ON logs.user_id = users.id WHERE users.role = 'Faculty' GROUP BY department`);
        const fPos = await pool.query(`SELECT position, COUNT(*) FROM logs JOIN users ON logs.user_id = users.id WHERE users.role = 'Faculty' GROUP BY position`);

        res.json({ 
            logs: logs.rows, 
            stats: stats.rows[0], 
            analytics: { 
                students: { programs: sProg.rows, years: sYear.rows }, 
                faculty: { depts: fDept.rows, positions: fPos.rows } 
            } 
        });
    } catch (err) { res.status(500).send(err.message); }
});

app.post('/api/admin/user/block', async (req, res) => {
    try {
        await pool.query('UPDATE users SET is_blocked = NOT is_blocked WHERE id = $1', [req.body.id]);
        res.sendStatus(200);
    } catch (err) { res.status(500).send(err.message); }
});

app.post('/api/admin/user/delete', async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) return res.status(400).send("User ID is required");
        await pool.query('DELETE FROM users WHERE id = $1', [id]);
        res.sendStatus(200);
    } catch (err) {
        console.error("Database Delete Error:", err.message);
        res.status(500).send("Internal Server Error: " + err.message);
    }
});

app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));