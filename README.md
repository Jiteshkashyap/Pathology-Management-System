#  Pathology Management System

A production-grade, scalable Pathology Management System designed to digitize and optimize end-to-end diagnostic workflows. The platform enables seamless coordination between patients, technicians, and administrators while ensuring secure data handling, efficient processing, and high system reliability.

The system supports appointment booking, multi-test package management, automated diagnostic report generation, and AI-powered medical insights. It is built using a modular, service-oriented backend architecture where business logic is centralized in services, ensuring clean separation of concerns and maintainability.

Designed for real-world scalability, the application incorporates asynchronous processing using message queues, caching for performance optimization, distributed locking for concurrency control, and secure file handling via cloud storage. Additional integrations such as payment processing, email notifications, and scheduled background jobs make the system robust and production-ready.

Overall, the platform demonstrates a complete full-stack implementation with strong emphasis on backend architecture, system design, and real-world engineering practices.

---

## 🌐 Live
- Link: https://meditrusty.com

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

## 🏗️ Backend Architecture

- **Architecture Pattern**
  - Layered (3-Tier): Controller → Service → Model
  - Ensures separation of concerns and maintainability

- **Core Layers**
  - Controllers
    - Handle HTTP requests and responses
    - Perform input validation
    - Delegate logic to services
  - Services
    - Centralized business logic layer
    - Handles workflows (appointments, reports, payments)
    - Interacts with database models and external services
  - Models
    - Mongoose schemas for MongoDB
    - Define data structure and persistence logic

- **System Responsibilities**
  - Authentication & Authorization (JWT, RBAC)
  - Payment processing (Stripe integration)
  - Report generation & processing
  - AI integration (Gemini API)
  - Queue handling via RabbitMQ
  - Caching & locking via Redis
  - Scheduled jobs via Node Cron

- **Async & Background Processing**
  - RabbitMQ workers for:
    - Email notifications
    - Report processing
    - Heavy background tasks
  - Node Cron for:
    - Scheduled cleanup
    - Maintenance tasks
    - Time-based operations

- **Scalability Considerations**
  - Stateless API design
  - Decoupled services
  - Queue-based processing for heavy tasks
  - Externalized storage (S3)

---

## 🗄️ Database Architecture

- **Database Type**
  - MongoDB (NoSQL, document-based)

- **Design Approach**
  - Hybrid schema design:
    - Referencing → for relationships (users, appointments, reports)
    - Embedding → for nested/related data where needed
  - Optimized for flexibility and performance

- **Collections**
  - Users
  - Doctors
  - Tests
  - Packages
  - Appointments
  - Reports

- **Performance Optimization**
  - Indexed fields for frequent queries
  - Optimized query patterns
  - Reduced document size where required

- **Aggregation Pipelines**
  - Used for complex data relationships and analytics
  - Examples:
    - Joining reports with users and test data
    - Generating analytics dashboards
    - Computing aggregated test results in packages
  - Enables efficient server-side data processing

- **Business Logic Integration**
  - Test normal ranges stored in database/backend
  - Evaluation handled in service layer
  - Results classified as Normal / Abnormal dynamically

- **Scalability**
  - Designed for horizontal scaling
  - Handles large datasets and analytical queries efficiently
 
    
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
