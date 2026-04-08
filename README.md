# 🏥 Pathology Management System

Production-grade, scalable pathology system for diagnostics, appointments, reporting, and AI-powered insights.

---

## 🌐 Live
- Frontend: https://meditrusty.com

---

## 🧠 Overview
- Built for real-world pathology workflows
- Focus on scalability, performance, and maintainability
- Supports patients, technicians, and admins
- Designed with modular, service-oriented backend architecture

---

## ⚙️ Tech Stack
- **Frontend:** React (Vite), Tailwind CSS, Redux Toolkit, Framer Motion, Axios, Recharts
- **Backend:** Node.js, Express.js, MongoDB Atlas
- **Infrastructure:** AWS EC2, AWS S3
- **Services:** Redis (cache & locking), RabbitMQ (queue), SendGrid (email), Stripe (payments)
- **AI:** Google Gemini API

---

## 🔐 Authentication & Authorization
- JWT-based authentication (Access + Refresh Tokens)
- Secure session handling
- Role-based authorization via middleware
- Protected API routes

---

## 🛡️ Roles
- **Patient**
  - Book appointments
  - View/download reports
  - Access AI insights
- **Technician**
  - Create reports
  - Upload test results
  - Manage report lifecycle
- **Admin**
  - Manage doctors, tests, packages
  - Monitor system
  - Access analytics

---

## 🗄️ Backend & Database Architecture
- Architecture Pattern:
  - Controller → Service → Model
- Responsibilities:
  - Controllers → handle HTTP layer (req/res, validation)
  - Services → core business logic & workflows
  - Models → MongoDB schemas & DB interaction
- Database Design:
  - Hybrid approach (embedding + referencing)
  - Indexed fields for performance
  - Aggregation pipelines for analytics
- Logic Handling:
  - Test normal ranges stored in backend
  - Evaluation done in service layer
  - Results classified as Normal / Abnormal

---

## 🔄 System Flow / Architecture
- Client → Nginx (Reverse Proxy + SSL)
- Nginx → Node.js (Express API)
- Node.js →
  - MongoDB (data persistence)
  - Redis (cache + locking)
  - RabbitMQ (async jobs)
  - S3 (file storage)
  - Gemini API (AI processing)
- Background Workers →
  - Process queues (emails, reports)
- Scheduled Jobs →
  - Node Cron (cleanup, maintenance, timed tasks)

---

## 🧪 Test & Package System
- Packages contain multiple tests
- Single booking → multiple test execution
- Aggregated report generation
- Centralized evaluation in services

---

## ☁️ Storage & Security
- AWS S3 for reports & assets
- Pre-signed URLs for secure access
- No direct public exposure

---

## ⚡ Performance & Concurrency
- Redis used for:
  - Caching responses
  - Rate limiting
  - Distributed locking
- Prevents race conditions in bookings

---

## 📨 Background Processing
- RabbitMQ handles:
  - Email notifications
  - Report generation tasks
  - Async workflows
- Node Cron handles:
  - Scheduled jobs
  - Cleanup tasks
  - System maintenance

---

## 🤖 AI Integration
- AI-generated report summaries
- Intelligent medical insights
- Automated interpretation of test data

---

## 💳 Payments
- Stripe integration
- Secure checkout flow
- Webhook-based verification

---

## 🧾 Reporting
- PDF report generation
- Barcode support (bwip-js)
- Secure S3 storage & retrieval

---

## 🐳 DevOps & Deployment
- Dockerized backend
- CI/CD via GitHub Actions
- AWS EC2 deployment
- Nginx reverse proxy
- SSL via Certbot

---

## 📁 Project Structure

Backend/
 ├── controllers/
 ├── services/
 ├── models/
 ├── routes/
 ├── middleware/
 ├── utils/
 ├── validation/
 ├── jobs/
 ├── workers/
 └── server.js

 
---

## 👨‍💻 Author
Jitesh kashyap  
Full Stack Developer | Backend | DevOps | 

---

## ⭐ Support
Give it a ⭐ if you find it useful.
