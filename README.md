# NayePankh Foundation - Volunteer Management System

A full-stack web application built for the NayePankh Foundation to streamline and manage volunteer registrations. This project was developed as an internship assignment, providing a beautiful public-facing landing page, a secure registration form with file uploads, and a comprehensive protected Admin Dashboard for managing applications.

---

## 🌟 Key Features

### 💻 Public Interface
*   **Modern Landing Page:** Premium, responsive design with glassmorphism elements, Framer Motion animations, and beautiful typography.
*   **Volunteer Registration Form:** Comprehensive multi-step form built with `react-hook-form`. Features dynamic dropdowns (mapping all Indian States), custom form validation, and secure document upload capability.

### 🛡️ Admin Dashboard (Protected Route)
*   **JWT Authentication:** Secure login system (`/admin/login`) with JSON Web Tokens.
*   **Analytics Overview:** Real-time statistics cards (Total Volunteers, Today's Registrations, Active Applications).
*   **Data Visualization:** Beautiful, interactive charts powered by `Recharts` to visualize volunteer demographics (City Bar Charts, State Pie Charts, Interest Donut Charts).
*   **Advanced Data Table:** Sort, filter, and search through all submitted applications.
*   **Application Actions:** Admins can view detailed application profiles in modals, update application statuses (Pending, Approved, Rejected, etc.), and securely log internal notes.
*   **Data Export:** One-click CSV and Excel (`.xlsx`) downloads of all volunteer data.
*   **Dynamic Settings:** A dedicated settings panel to update the organization's public contact details and social media links.

---

## 🛠️ Tech Stack

**Frontend:**
*   React 19 (Vite)
*   Tailwind CSS (Styling & Layout)
*   React Router DOM (Routing)
*   Framer Motion (Animations)
*   Lucide React (Icons)
*   Recharts (Data Visualization)
*   Axios (API Client)

**Backend:**
*   Python 3 / Flask
*   Flask-SQLAlchemy (ORM)
*   SQLite (Database)
*   PyJWT (Authentication)
*   Werkzeug (Secure File Uploads & Password Hashing)
*   OpenPyXL (Excel Generation)

---

## 🚀 Setup & Installation Instructions

Follow these steps to run the project locally on your machine.

### Prerequisites
*   Node.js (v18 or higher)
*   Python (3.10 or higher)
*   Git

### 1. Backend Setup (Flask API)

Navigate to the backend directory:
```bash
cd backend
```

Create and activate a Python Virtual Environment:
```bash
# Windows
python -m venv venv
.\venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

Install the required dependencies:
```bash
pip install -r requirements.txt
```

Initialize the database (This creates the SQLite database and seeds the default Admin account):
```bash
python init_db.py
```

Run the Flask server:
```bash
python app.py
```
*The backend will now be running on `http://localhost:5000`*

### 2. Frontend Setup (React/Vite)

Open a new terminal window and navigate to the frontend directory:
```bash
cd frontend
```

Install NPM dependencies:
```bash
npm install
```

Start the Vite development server:
```bash
npm run dev
```
*The frontend will now be running on `http://localhost:5173` (or the port specified by Vite).*

---

## 🔐 Default Credentials

To access the Admin Dashboard, navigate to the `/admin` route on the frontend and use the following seeded credentials:

*   **Email:** `admin@nayepankh.org`
*   **Password:** `admin123`

---

## 📂 Project Structure

```text
VolunteerRegistration/
│
├── backend/
│   ├── uploads/            # Securely stored document uploads
│   ├── app.py              # Flask application factory
│   ├── auth.py             # JWT authentication decorators
│   ├── extensions.py       # SQLAlchemy instance
│   ├── init_db.py          # Database seeding script
│   ├── models.py           # SQLite database schema (Volunteer, Admin, Settings)
│   ├── routes.py           # Public and Protected API endpoints
│   └── requirements.txt    # Python dependencies
│
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components (Navbar, Footer, ProtectedRoute)
│   │   ├── layouts/        # Page layouts (AdminLayout with Sidebar)
│   │   ├── pages/          # Main Views (Home, Register)
│   │   │   └── admin/      # Protected Dashboard Views (Login, Dashboard, Volunteers, Reports, Settings)
│   │   ├── utils/          # Helper utilities (Axios API interceptors)
│   │   ├── App.jsx         # React Router configuration
│   │   └── index.css       # Tailwind entry point
│   ├── package.json        # NPM dependencies
│   └── tailwind.config.js  # Custom theme and color palette
│
└── README.md
```

---

## 📝 License

This project is created for the **NayePankh Foundation** internship assignment.
