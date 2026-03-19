# 🏛️ NEU Library Log: Smart Visitor Management

The **NEU Library Log** is a professional digital check-in ecosystem designed to replace inefficient paper logbooks. By leveraging institutional emails and dynamic QR code technology, it provides a seamless entry experience for students and faculty while equipping administrators with powerful data analytics and security controls.

## 🌐 Live Deployment
**Access the Kiosk:** [https://neu-library-log.onrender.com](https://neu-library-log.onrender.com)  
> **Note:** Due to the use of a trial database provider, the live demonstration is active until **April 14, 2026**. Please allow a few seconds for the initial load as the project is hosted on Render’s free tier.

---

## ✨ System Walkthrough & User Flow

### 🤳 The Kiosk: Rapid Entry
The entry point of the library, optimized for speed and ease of use.
* **Instant Logging:** Check in using an institutional email or scan a personal QR code in under 5 seconds.
* **Intelligent Detection:** The system automatically identifies new users and guides them to a one-time registration flow.
* **Contextual Visits:** Users specify their visit purpose (e.g., Research, Study, Group Work) for more accurate library reporting.
* **Personalized Greetings:** A welcoming interface that confirms a successful log for every visitor.

![Kiosk Login Screen](https://i.imgur.com/0qqsNIa.jpeg)
![Registration Detection](https://i.imgur.com/0qqsNIa.jpeg)
![Purpose Selection](https://i.imgur.com/0qqsNIa.jpeg)
![Welcome Message](https://i.imgur.com/0qqsNIa.jpeg)

### 📧 The QR Ecosystem: Digital Identity
Eliminating the need for physical slips or manual typing.
* **Automated Onboarding:** Upon registration, the system triggers a personalized email via **EmailJS** containing a unique, permanent QR code.
* **Always Available:** Students can save the QR code to their mobile devices for instant access on all future visits.
* **Zero-Contact:** Promotes a hygienic and tech-forward environment.

![QR Email Screenshot](https://i.imgur.com/0qqsNIa.jpeg)
![Mobile QR Usage](https://i.imgur.com/0qqsNIa.jpeg)

### 📊 Admin Intelligence: Data-Driven Management
A comprehensive dashboard that turns raw logs into actionable insights.
* **Multi-Level Security:** Features dual-layer protection—privileged email detection followed by a secure username/password challenge.
* **Real-Time Metrics:** High-level cards track visitor traffic patterns (Daily, Weekly, Monthly) at a glance.
* **Interactive Analytics:** Visualizes data through dynamic bar and pie charts, segmenting usage by Department, Year Level, and Position.
* **Advanced Auditing:** A powerful history table with multi-parameter filtering (date range, purpose, user type) and search capabilities.
* **Access Governance:** Integrated tools to "Block" or "Delete" records to ensure facility security and data integrity.

![Admin Analytics Dashboard](https://i.imgur.com/0qqsNIa.jpeg)

---

## 📂 System Architecture

| Component | Responsibility |
| :--- | :--- |
| **`/public`** | **Frontend Layer:** The "Face" of the app (HTML5, CSS3, Vanilla JS). |
| `index.html` | The primary Kiosk interface for user check-in. |
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
