# 🏛️ NEU Library Log: Smart Visitor Management

The **NEU Library Log** is a digital check-in system created to make library entry fast and easy. Instead of signing a paper logbook, students and faculty use a personal QR code to log their visits instantly. This helps the library keep accurate records and understand how the facility is being used through clear, visual data.

**🌐 Live Site:** [https://neu-library-log.onrender.com](https://neu-library-log.onrender.com)

---

## ✨ Key Features

### 🤳 Fast Check-In Kiosk
The "front door" of the system where users scan their codes or register.
- **Instant Logging:** Scan a QR code to check in under 2 seconds.
- **Digital Registration:** Simple forms for first-time users to join the system.
- **Visit Purpose:** Users can select why they are visiting, such as "Research" or "Study."

![Kiosk Landing Page](https://via.placeholder.com/800x400?text=Insert+Kiosk+Screenshot+Here)

### 📧 Personal QR Codes
No more physical ID cards or paper slips.
- **Auto-Email:** The system automatically emails a unique QR code to every new user.
- **Always Available:** Users can save the QR image on their phones for all future visits.

![QR Code Email Sample](https://via.placeholder.com/800x400?text=Insert+Email+Screenshot+Here)

### 📊 Admin Insights Dashboard
A powerful tool for library staff to manage the space.
- **Visitor Trends:** See how many people visited today versus last month.
- **Visual Charts:** Automatic pie and bar charts showing which departments use the library the most.
- **Safety Controls:** Admins can "Block" specific users if needed to maintain security.

![Admin Analytics Dashboard](https://via.placeholder.com/800x400?text=Insert+Dashboard+Screenshot+Here)

---

## 📂 File Structure

| File / Folder | Purpose |
| :--- | :--- |
| **`/public`** | The "Face" of the app. Contains everything the user sees (HTML, CSS, JS). |
| `index.html` | The main Kiosk page where users scan or register. |
| `admin.html` | The private dashboard where library staff view analytics. |
| **`/src`** | The "Brain" of the app. Handles data processing. |
| `server.js` | The main engine that routes requests and talks to the database. |
| `db.js` | The bridge that creates the connection to your PostgreSQL data. |
| **`.env`** | The "Vault." Stores secret keys and database passwords. |

---

## 🧰 Tech Stack

| Layer            | Technology                          |
|------------------|-------------------------------------|
| **Frontend**     | HTML, CSS, Bootstrap, JavaScript    |
| **Backend**      | Node.js + Express                   |
| **Database**     | PostgreSQL (production)             |
| **Hosting**      | Render (public deployment)          |
| **Version Control** | Git + GitHub                     |

---


## 🚀 Getting Started (Local Setup)

### 🔧 Prerequisites
- Node.js installed  
- Modern browser (Chrome, Firefox, Edge, Safari)

### 📦 Installation

```bash
# Clone the repository
git clone https://github.com/JulianMiguelFelipe/neu-library-log.git

# Navigate to the project folder
cd neu-library-log

# Install dependencies
npm install

# Start the server
npm start

# Open the server
Then visit localhost:3000 in your browser.
