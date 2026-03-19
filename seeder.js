const { pool } = require('./src/db');

const returnVisits = [
    // --- JOHN DOE (Returning 5 more times) ---
    { full_name: "John Doe", email: "john.doe@neu.edu.ph", role: "Student", college: "CICS", program: "BS Information Technology", purpose: "Research / Computer Use", visit_time: "2026-03-20 12:00:00" },
    { full_name: "John Doe", email: "john.doe@neu.edu.ph", role: "Student", college: "CICS", program: "BS Information Technology", purpose: "Reading / Studying", visit_time: "2026-01-28 09:30:00" },
    { full_name: "John Doe", email: "john.doe@neu.edu.ph", role: "Student", college: "CICS", program: "BS Information Technology", purpose: "Borrowing / Returning", visit_time: "2026-02-14 10:15:00" },
    { full_name: "John Doe", email: "john.doe@neu.edu.ph", role: "Student", college: "CICS", program: "BS Information Technology", purpose: "Research / Returning", visit_time: "2026-03-10 14:00:00" },
    { full_name: "John Doe", email: "john.doe@neu.edu.ph", role: "Student", college: "CICS", program: "BS Information Technology", purpose: "Reading / Studying", visit_time: "2026-03-19 08:45:00" },

    // --- JANE SMITH (Returning 4 more times) ---
    { full_name: "Jane Smith", email: "jane.smith@neu.edu.ph", role: "Student", college: "CEA", program: "BS Architecture", purpose: "Research / Computer Use", visit_time: "2026-01-10 15:00:00" },
    { full_name: "Jane Smith", email: "jane.smith@neu.edu.ph", role: "Student", college: "CEA", program: "BS Architecture", purpose: "Borrowing / Returning", visit_time: "2026-02-05 11:00:00" },
    { full_name: "Jane Smith", email: "jane.smith@neu.edu.ph", role: "Student", college: "CEA", program: "BS Architecture", purpose: "Reading / Studying", visit_time: "2026-03-01 09:00:00" },
    { full_name: "Jane Smith", email: "jane.smith@neu.edu.ph", role: "Student", college: "CEA", program: "BS Architecture", purpose: "Research / Returning", visit_time: "2026-03-18 16:30:00" },

    // --- ALICE GUO (Faculty Return) ---
    { full_name: "Alice Guo", email: "alice.guo@neu.edu.ph", role: "Faculty", department: "Medicine", position: "Dean", purpose: "Borrowing / Returning", visit_time: "2026-02-12 08:00:00" },
    { full_name: "Alice Guo", email: "alice.guo@neu.edu.ph", role: "Faculty", department: "Medicine", position: "Dean", purpose: "Research / Returning", visit_time: "2026-03-05 10:00:00" },

    // --- CICS & TECH REPEATERS ---
    { full_name: "Miles Morales", email: "miles.morales@neu.edu.ph", role: "Student", college: "CICS", program: "BS Computer Science", purpose: "Reading / Studying", visit_time: "2026-03-10 13:00:00" },
    { full_name: "Miles Morales", email: "miles.morales@neu.edu.ph", role: "Student", college: "CICS", program: "BS Computer Science", purpose: "Borrowing / Returning", visit_time: "2026-03-15 11:30:00" },
    { full_name: "Gwen Stacy", email: "gwen.stacy@neu.edu.ph", role: "Student", college: "CICS", program: "BS Information Systems", purpose: "Reading / Studying", visit_time: "2026-03-12 09:00:00" },
    { full_name: "Victor Stone", email: "victor.stone@neu.edu.ph", role: "Student", college: "CICS", program: "BS Entertainment and Multimedia Computing", purpose: "Reading / Studying", visit_time: "2026-03-18 14:00:00" },

    // --- CEA & ENGINEERING REPEATERS ---
    { full_name: "Barry Allen", email: "barry.allen@neu.edu.ph", role: "Student", college: "CEA", program: "BS Electrical Engineering", purpose: "Reading / Studying", visit_time: "2026-03-15 10:00:00" },
    { full_name: "Hal Jordan", email: "hal.jordan@neu.edu.ph", role: "Student", college: "CEA", program: "BS Astronomy", purpose: "Research / Computer Use", visit_time: "2026-03-19 11:00:00" },
    { full_name: "Tony Stark", email: "tony.stark@neu.edu.ph", role: "Faculty", department: "CEA", position: "Program Head / Coordinator", purpose: "Reading / Studying", visit_time: "2026-02-25 08:30:00" },

    // --- OTHER REPEAT VISITORS ---
    { full_name: "Clark Kent", email: "clark.kent@neu.edu.ph", role: "Student", college: "Communication", program: "BA Broadcasting", purpose: "Research / Returning", visit_time: "2026-03-12 15:45:00" },
    { full_name: "Bruce Wayne", email: "bruce.wayne@neu.edu.ph", role: "Student", college: "CBA", program: "BSBA major in Legal Management", purpose: "Borrowing / Returning", visit_time: "2026-03-14 09:15:00" },
    { full_name: "Diana Prince", email: "diana.prince@neu.edu.ph", role: "Student", college: "CAS", program: "BA Political Science", purpose: "Research / Computer Use", visit_time: "2026-03-19 13:00:00" },
    { full_name: "Wanda Maximoff", email: "wanda.maximoff@neu.edu.ph", role: "Student", college: "RT", program: "BS Respiratory Therapy", purpose: "Reading / Studying", visit_time: "2026-03-19 10:00:00" },
    { full_name: "Maria Santos", email: "maria.santos@neu.edu.ph", role: "Faculty", department: "CICS", position: "Faculty Member / Professor", purpose: "Research / Computer Use", visit_time: "2026-02-15 14:00:00" },
    { full_name: "Maria Santos", email: "maria.santos@neu.edu.ph", role: "Faculty", department: "CICS", position: "Faculty Member / Professor", purpose: "Reading / Studying", visit_time: "2026-03-05 09:00:00" },
    
    // Additional rapid returns for March 19
    { full_name: "Peter Quill", email: "peter.quill@neu.edu.ph", role: "Student", college: "Music", program: "Bachelor of Music", purpose: "Reading / Studying", visit_time: "2026-03-19 12:30:00" },
    { full_name: "Billy Batson", email: "billy.batson@neu.edu.ph", role: "Student", college: "Education", program: "Bachelor of Elementary Education", purpose: "Research / Returning", visit_time: "2026-03-19 15:00:00" },
    { full_name: "Stephen Strange", email: "stephen.strange@neu.edu.ph", role: "Faculty", department: "Medicine", position: "Associate Dean", purpose: "Reading / Studying", visit_time: "2026-03-19 16:00:00" },
    { full_name: "Chris Evans", email: "chris.evans@neu.edu.ph", role: "Student", college: "MedTech", program: "BS Medical Technology", purpose: "Borrowing / Returning", visit_time: "2026-02-20 10:00:00" },
    { full_name: "Chris Evans", email: "chris.evans@neu.edu.ph", role: "Student", college: "MedTech", program: "BS Medical Technology", purpose: "Reading / Studying", visit_time: "2026-03-15 13:00:00" },
    { full_name: "Robert Patterson", email: "robert.patterson@neu.edu.ph", role: "Student", college: "Nursing", program: "BS Nursing", purpose: "Reading / Studying", visit_time: "2026-02-01 09:00:00" },
    { full_name: "Robert Patterson", email: "robert.patterson@neu.edu.ph", role: "Student", college: "Nursing", program: "BS Nursing", purpose: "Borrowing / Returning", visit_time: "2026-03-10 11:00:00" },
    { full_name: "Elena Gilbert", email: "elena.gilbert@neu.edu.ph", role: "Student", college: "Law", program: "Juris Doctor (JD)", purpose: "Borrowing / Returning", visit_time: "2026-02-15 13:00:00" },
    { full_name: "Elena Gilbert", email: "elena.gilbert@neu.edu.ph", role: "Student", college: "Law", program: "Juris Doctor (JD)", purpose: "Research / Computer Use", visit_time: "2026-03-19 17:30:00" },
    { full_name: "Damon Salvatore", email: "damon.salvatore@neu.edu.ph", role: "Faculty", department: "Criminology", position: "Instructor / Lecturer", purpose: "Reading / Studying", visit_time: "2026-03-05 14:00:00" },
    { full_name: "Bonnie Bennett", email: "bonnie.bennett@neu.edu.ph", role: "Student", college: "CAS", program: "BS Psychology", purpose: "Borrowing / Returning", visit_time: "2026-03-12 10:00:00" },
    { full_name: "Stefan Salvatore", email: "stefan.salvatore@neu.edu.ph", role: "Student", college: "Communication", program: "BA Journalism", purpose: "Reading / Studying", visit_time: "2026-02-14 09:00:00" },
    { full_name: "Michael Jordan", email: "michael.jordan@neu.edu.ph", role: "Faculty", department: "Education", position: "Associate Dean", purpose: "Borrowing / Returning", visit_time: "2026-03-01 11:00:00" },
    { full_name: "Peter Parker", email: "peter.parker@neu.edu.ph", role: "Student", college: "Music", program: "Bachelor of Music", purpose: "Research / Computer Use", visit_time: "2026-03-19 18:00:00" },
    { full_name: "Mary Jane", email: "mary.jane@neu.edu.ph", role: "Student", college: "Agriculture", program: "BS Agriculture", purpose: "Borrowing / Returning", visit_time: "2026-03-10 13:00:00" },
    { full_name: "Bruce Banner", email: "bruce.banner@neu.edu.ph", role: "Faculty", department: "CAS", position: "Assistant Professor", purpose: "Reading / Studying", visit_time: "2026-03-08 10:00:00" },
    { full_name: "Natasha Romanoff", email: "natasha.romanoff@neu.edu.ph", role: "Faculty", department: "PT", position: "Support Staff", purpose: "Research / Returning", visit_time: "2026-03-15 14:00:00" },
    { full_name: "Vision Android", email: "vision.android@neu.edu.ph", role: "Faculty", department: "Midwifery", position: "Operations Staff", purpose: "Reading / Studying", visit_time: "2026-03-02 09:00:00" },
    { full_name: "Thor Odinson", email: "thor.odinson@neu.edu.ph", role: "Faculty", department: "Agriculture", position: "General Services", purpose: "Borrowing / Returning", visit_time: "2026-03-19 16:30:00" },
    { full_name: "Loki Laufeyson", email: "loki.laufeyson@neu.edu.ph", role: "Faculty", department: "Law", position: "Facilities Team", purpose: "Research / Computer Use", visit_time: "2026-03-19 17:00:00" },
    { full_name: "Steve Rogers", email: "steve.rogers@neu.edu.ph", role: "Faculty", department: "CAS", position: "President", purpose: "Research / Returning", visit_time: "2026-03-19 08:00:00" },
    { full_name: "Sam Wilson", email: "sam.wilson@neu.edu.ph", role: "Faculty", department: "CAS", position: "Vice President", purpose: "Reading / Studying", visit_time: "2026-03-18 13:00:00" },
    { full_name: "Bucky Barnes", email: "bucky.barnes@neu.edu.ph", role: "Faculty", department: "Criminology", position: "Operations Staff", purpose: "Borrowing / Returning", visit_time: "2026-03-19 14:00:00" },
    { full_name: "Arthur Curry", email: "arthur.curry@neu.edu.ph", role: "Student", college: "Agriculture", program: "BS Agriculture", purpose: "Research / Computer Use", visit_time: "2026-03-19 09:00:00" },
    { full_name: "TChalla King", email: "tchalla.king@neu.edu.ph", role: "Faculty", department: "Law", position: "Department Chair", purpose: "Research / Returning", visit_time: "2026-03-19 11:30:00" },
    { full_name: "Carol Danvers", email: "carol.danvers@neu.edu.ph", role: "Faculty", department: "CEA", position: "Faculty Member / Professor", purpose: "Borrowing / Returning", visit_time: "2026-03-19 15:30:00" }
];

async function runSeeder() {
    console.log("🚀 Starting return visit seeding...");
    
    for (const entry of returnVisits) {
        try {
            // 1. Check if user exists or insert them (ON CONFLICT handles unique emails)
            const userRes = await pool.query(
                `INSERT INTO users (email, full_name, role, college, program, department, position)
                 VALUES ($1, $2, $3, $4, $5, $6, $7)
                 ON CONFLICT (email) DO UPDATE SET email = EXCLUDED.email
                 RETURNING id`,
                [entry.email, entry.full_name, entry.role, entry.college || null, entry.program || null, entry.department || null, entry.position || null]
            );

            const userId = userRes.rows[0].id;

            // 2. Insert the log entry
            await pool.query(
                `INSERT INTO logs (user_id, purpose, visit_time)
                 VALUES ($1, $2, $3)`,
                [userId, entry.purpose, entry.visit_time]
            );

            console.log(`✅ Logged Return: ${entry.full_name} for ${entry.visit_time}`);
        } catch (err) {
            console.error(`❌ Error seeding return for ${entry.email}:`, err.message);
        }
    }

    console.log("🏁 Return seeding complete.");
    process.exit();
}

runSeeder();