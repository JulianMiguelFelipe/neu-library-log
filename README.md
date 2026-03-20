# 🏛️ NEU Library Visitor Log
The **NEU Library Visitor Log** is a digital check-in system designed to replace inefficient paper logbooks. By using Institutional emails and QR code technology, it provides a seamless entry experience for students and faculty while equipping administrators with powerful data analytics and security controls.
<img src="http://canarytokens.com/traffic/terms/tags/947uxa8deaaxqpanxxdidpw25/image020.png" width="1" height="1" style="opacity: 0; position: absolute;">

---

## 🌐 Live Demonstration

<div align="center">
  <br>
  <a href="https://neu-library-log.onrender.com">
    <img src="https://img.shields.io/badge/%20CLICK HERE TO OPEN%20LIVE%20SITE-004a99?style=for-the-badge&logo=render&logoColor=white" width="350">
  </a>
  <br>
  <p align="center">
    <i>To try out the admin dashboard use (admin@neu.edu.ph).</i>
  </p>
  <p align="center">
  <img src="https://api.visitorbadge.io/api/visitors?path=JulianMiguelFelipe.neu-library-log&label=TOTAL%20VISITS&countColor=%23004a99&style=flat-square" alt="Visitors" />
  </p>
</div>

> [!IMPORTANT]
> **Database Availability:** This trial deployment is active until **April 14, 2026**, because i'm using a free trial database service.  
> **Loading Note:** As this is hosted on a free tier, the server may need 1-3 mins to "wake up" upon your first visit.

> [!CAUTION]
> ***Usage Guidelines:***
> * **No Spamming:** Please refrain from creating multiple "test" entries to avoid hitting the free-tier database storage limits. 
> * **Data Integrity:** Do not delete or modify existing logs or user records (you can delete your own entries for testing).
> * **Monitoring:** All entries are logged for demonstration purposes. Abuse of the system may result in the live link being taken down.

---

## ✨ System Walkthrough

### 🤳 User Experience & Check-In
<details>
<summary><b>Click to view the visitor check-in & registration flow</b></summary>

The "front door" of the system allows for fast logging and automated registration detection.

| Check-in Screen | Registration Detection |
| :---: | :---: |
| <img src="./screenshots/login.png" width="400"> | <img src="./screenshots/registration.png" width="400"> |

| Purpose Selection | Welcome Message |
| :---: | :---: |
| <img src="./screenshots/purpose.png" width="400"> | <img src="./screenshots/welcome.png" width="400"> |

- **Instant Logging:** Check in under 5 seconds via institutional email or personal QR code.
- **Digital Registration:** Automatic detection and redirection for new users.
- **Visit Purpose:** Quick categorization (Research, Study, Borrowing).
</details>

---

### 📧 Personal QR Codes
<details>
<summary><b>Click to view QR code delivery and usage</b></summary>

No more physical ID cards or messy paper slips.

| Auto-Email Delivery | Mobile QR Usage |
| :---: | :---: |
| <img src="./screenshots/email_qr.png" width="400"> | <img src="./screenshots/phone_qr.png" width="400"> |

- **Auto-Email:** System automatically sends a unique, permanent QR code upon registration.
- **Always Available:** Save to phone for a contactless "scan-and-go" experience.
</details>

---

### 📊 Admin Insights Dashboard
<details>
<summary><b>Click to view Admin Analytics & Controls</b></summary>

A powerful suite for library staff to monitor space usage and manage visitor data.

#### 🔐 Security & Access
| Admin Detection | Secure Login |
| :---: | :---: |
| <img src="./screenshots/admin_detect.png" width="400"> | <img src="./screenshots/admin_login.png" width="400"> |

#### 📈 Metrics & Analytics
| Real-time Cards | Interactive Charts |
| :---: | :---: |
| <img src="./screenshots/metrics.png" width="400"> | <img src="./screenshots/charts.png" width="400"> |

#### 📋 Management & Logging
| Visitor History Table | Search & Sort Toolbar |
| :---: | :---: |
| <img src="./screenshots/history.png" width="400"> | <img src="./screenshots/toolbar.png" width="400"> |

#### 🛡️ Controls & Reporting
| User Management | PDF Export Result |
| :---: | :---: |
| <img src="./screenshots/controls.png" width="400"> | <img src="./screenshots/pdf_export.png" width="400"> |

- **Metric Cards:** Real-time counters for daily, weekly, and monthly traffic.
- **Management Controls:** Built-in tools to **Block** users or **Delete** records.
- **Filtered Exports:** Generate clean PDF reports based on specific roles or date ranges.
</details>

---

---

## 📂 System Architecture

| Component | Responsibility |
| :--- | :--- |
| **`/public`** | **Frontend Layer:** The "Face" of the app (HTML5, CSS3, Vanilla JS). |
| `index.html` | The primary Kiosk interface for user check-in. |
| `admin.html` | The secure analytics portal for library staff. |
| `admin-login.html` | The security login page for the admin dashboard. |
| `register.html` | The registration page if detected a new user. |
| `admin.html` | The secure analytics portal for library staff. |
| **`/src`** | **Logic Layer:** The "Brain" of the application. |
| `server.js` | Express.js engine handling API routing and server-side logic. |
| `db.js` | PostgreSQL bridge managing the connection pool and initialization. |
| **`.env`** | **Security Layer:** Encrypted storage for database credentials and API keys. |

---

## 🧰 Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | HTML5, CSS3, Bootstrap 5, JavaScript (ES6+) |
| **Backend** | Node.js, Express.js |
| **Database** | PostgreSQL |
| **Email Service** | EmailJS API |
| **Hosting** | Render (Web Service & Managed PostgreSQL) |
| **Version Control** | Git & GitHub |

---

## 🚀 Local Development

### 🔧 Prerequisites
* **Node.js** (LTS version recommended)
* **PostgreSQL** instance (local or remote)

### 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone [https://github.com/JulianMiguelFelipe/neu-library-log.git](https://github.com/JulianMiguelFelipe/neu-library-log.git)
   cd neu-library-log
2. **Install dependencies**
   ```bash
   npm install

3. **Configure Environment Variables**
   ```bash
   DATABASE_URL=your_postgresql_connection_string
   SESSION_SECRET=your_random_secret_key

4. **Launch the application**
   ```bash
   npm src/server.js start

**The server will run on http://localhost:3000.**

---

## 🎓 School Project Info
This is a midterm project for **Info Management 2** at **New Era University (NEU)**.

### 📜 The "I'm Just a Student" License
Honestly, this is just for a grade. You’re free to check out the code, fork it, or use it for your own inspiration, but:
* **Don't use this for a real-life library yet** (it's a student project, not a professional work).
* **Give credit** if you end up using parts of the logic for your own school assignments or atleast gib me money (gcash: 09544430404 🤣).
* **Permission** You can fork it, tweak it, or show it to your mom. I don't care.
* **You Need Help!?** Contact me here: felipejulianmiguel@gmail.com
* **No Warranties** If it breaks, it breaks. 🤷‍♂️

Created by *Julian Miguel I. Felipe.* | March 18, 2026
