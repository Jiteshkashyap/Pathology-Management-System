# Pathology-Management-System

.

---

## 🚀 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- RabbitMq
- JWT Authentication (Access + Refresh Tokens)
- Redis (Caching)
- Joi (Validation)
- PDF Generation
- Barcode Generation
- Email Service (Report Sending)

### Frontend
- React.js
- Redux Toolkit
- React Router
- Tailwind CSS
- Axios

---

## 📌 Features Implemented

### 🔐 Authentication
- Admin & Technician roles
- JWT-based authentication (HTTP-only cookies)
- Access & Refresh token flow
- Protected routes
- Secure logout

---

### 👨‍⚕️ Doctor Management
- Add Doctor
- Edit Doctor
- Delete Doctor
- View Doctor List
- Role-based access control

---

### 🧪 Test Management
- Add Test
- Update Test
- Delete Test
- Predefined Normal Range
- Auto status calculation (Normal / High / Low)

---

### 📦 Package Management
- Create Package
- Update Package
- Delete Package
- Apply Discount
- Link multiple tests to a package

---

### 📄 Report Management
- Register Patient
- Assign Doctor
- Select Tests / Packages
- Enter Test Results
- Auto-calculate result status
- Generate Final PDF Report
- Barcode Generation
- Email Report to Patient

---

## 🏗 System Assumptions

- Single Diagnostic Center
- Each report linked to one referring doctor
- Package contains multiple tests
- Normal ranges predefined in Test Master
- Report status auto-calculated
- Basic validation applied across modules

---


---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

---

### 2️⃣ Backend Setup

---

### 3️⃣ Frontend Setup

---

## 🔐 Environment Variables

Environment variables are not included .  

A `.env.example` file is provided inside the backend directory for reference.

---

## 📊 Database Schema

The database schema includes:

- Doctor
- Test
- Package
- Report
- Embedded report test schema for result tracking

Indexes are applied for optimized querying and filtering.

---

## 🧠 Design Decisions

- Used layered architecture (Controller → Service → Model)
- Implemented caching for frequently accessed doctor/test lists
- Used HTTP-only cookies for secure token handling
- Structured Redux state for scalable frontend state management
- Modular component design for reusable forms and modals
- Applied validation on both frontend and backend

---

## 📬 Submission Details

This project fulfills all requirements mentioned in the assessment brief, including:

- CRUD operations
- Role-based authentication
- Auto result evaluation
- PDF & barcode generation
- Email integration
- Responsive UI

---




