# 🏥 Pathology Management System (Production-Grade)

A scalable, full-stack **Pathology Management System** built to manage diagnostics, appointments, report generation, and AI-powered medical insights with a production-ready architecture.

# --------------------------------------------------------------------

## 🌐 Live Application

* **Frontend:** https://meditrusty.com

# --------------------------------------------------------------------

## 🧠 Project Overview

This system is designed to streamline pathology workflows by enabling seamless interaction between patients, technicians, and administrators.

It supports:

* Appointment booking and management
* Diagnostic report generation and access
* AI-powered health insights
* Secure and scalable backend infrastructure

The application is built with a **modular and scalable architecture**, suitable for real-world healthcare systems.

# --------------------------------------------------------------------

## ⚙️ Tech Stack

### 🎨 Frontend

* React.js (Vite)
* Tailwind CSS
* Framer Motion (animations)
* Redux Toolkit (state management)
* Axios (API handling)
* Recharts (dashboard analytics)

### 🧩 Backend

* Node.js + Express.js
* MongoDB Atlas

### ☁️ Infrastructure & Services

* AWS EC2 (backend hosting)
* AWS S3 (file storage)
* Redis Cloud (caching + locking)
* RabbitMQ (queue system)
* SendGrid (email service)
* Stripe (payment integration)

### 🤖 AI

* Google Gemini API (flash-3-preview model)

# --------------------------------------------------------------------

## 🔐 Authentication & Authorization

* Implemented using **JWT (JSON Web Tokens)**
* Uses **Access Token + Refresh Token strategy**
* Secure cookie-based authentication
* Token refresh mechanism for session persistence

### Authorization

* Role-based access control enforced via middleware
* Protected API routes based on user roles

# --------------------------------------------------------------------

## 🛡️ Role-Based Access Control (RBAC)

The system defines three roles:

### 👤 Patient

* Book appointments
* View and download reports
* Access AI insights

### 🧑‍🔬 Technician

* Create diagnostic reports
* Upload test results
* Manage report lifecycle

### 🛠️ Admin

* Manage doctors, tests, and packages
* Monitor system operations
* Access analytics dashboard

# --------------------------------------------------------------------

## 🗄️ Database Design

The database is structured using **MongoDB with optimized schema design**:

* Collections: users, doctors, tests, packages, appointments, reports
* Aggregation pipelines for complex analytics and reporting
* Indexed fields for faster queries
* Hybrid approach (referencing + embedding)

### Test Evaluation Logic

* Each test has **predefined normal ranges stored in backend**
* Report values are dynamically compared against these ranges
* Automatically determines whether a value is:

  * Normal
  * Abnormal

This enables automated medical interpretation.

# --------------------------------------------------------------------

## 🧪 Packages & Test System

* Packages are composed of **multiple diagnostic tests**
* Each package aggregates multiple test values into a single report
* Enables:

  * Bundled diagnostics
  * Efficient report generation
  * Simplified booking system

# --------------------------------------------------------------------

## ☁️ Storage & File Handling

* AWS S3 is used for:

  * PDF reports
  * Medical images

### Secure Access

* Pre-signed URLs for:

  * Secure PDF downloads
  * Controlled image access

Prevents direct exposure of files and ensures security.

# --------------------------------------------------------------------

## ⚡ Caching & Concurrency

* Redis Cloud is used for:

  * API caching → faster responses
  * Rate limiting → security
  * Distributed locking → prevents race conditions in bookings

# --------------------------------------------------------------------

## 📨 Background Processing

* RabbitMQ handles:

  * Asynchronous jobs
  * Queue-based processing

* SendGrid handles:

  * Email notifications
  * Report delivery
  * Booking confirmations

# --------------------------------------------------------------------

## 🤖 AI Integration

* Google Gemini API (flash-3-preview)

Used for:

* AI-generated report summaries
* Intelligent medical insights
* Automated interpretation of diagnostic data

# --------------------------------------------------------------------

## 💳 Payment Integration

* Stripe integration for secure payments

Features:

* Online payment for bookings
* Webhook-based verification
* Secure transaction handling

# --------------------------------------------------------------------

## 🧾 Report System

* PDF report generation
* Barcode generation using **bwip-js**
* Secure storage and retrieval using S3

# --------------------------------------------------------------------

## 🎨 Frontend Performance

* Lazy loading (React.lazy)
* Code splitting
* Optimized Lighthouse score
* Fast CDN delivery via Vercel

# --------------------------------------------------------------------

## 🐳 DevOps & Deployment

### Docker

* Backend containerized using Docker

### CI/CD

* GitHub Actions pipeline:

  * Build Docker image
  * Push to Docker Hub
  * Automated deployment

### AWS

* Backend deployed on EC2
* Nginx used for:

  * Reverse proxy
  * Routing
  * SSL termination (HTTPS via Certbot)

# --------------------------------------------------------------------

## 🌍 Domain & Routing

* Domain: **meditrusty.com**
* Frontend hosted on Vercel
* Backend routed via Nginx
* Secure HTTPS enabled

# --------------------------------------------------------------------

## 🏗️ Backend Architecture

![Image](https://docs.aws.amazon.com/images/prescriptive-guidance/latest/patterns/images/pattern-img/970a9d13-e8a2-44ac-aca5-a066e4be60e8/images/96061e05-8ac8-446e-b1da-baa6fc1cc7b6.png)

![Image](https://miro.medium.com/v2/resize%3Afit%3A1358/format%3Awebp/1%2A1YxpABThWxBlytz2LRTIKA.jpeg)

![Image](https://miro.medium.com/v2/resize%3Afit%3A1200/1%2AsGxgb-nEnO442oYOBNJl5Q.png)

![Image](https://cdn.cloudairy.com/blog/1773138573343web%20application.webp)

Architecture includes:

* Nginx → reverse proxy & SSL
* Docker → backend container
* MongoDB Atlas → database
* Redis → caching & locking
* RabbitMQ → async jobs
* S3 → file storage
* Gemini API → AI processing

# --------------------------------------------------------------------

## 📦 Features Summary

* Appointment booking system
* AI-powered report insights
* Secure report access
* Payment integration
* Admin dashboard with analytics
* Scalable backend architecture

# --------------------------------------------------------------------

## 📁 Project Structure

```id="l0fqk2"
Backend/
 ├── controllers/
 ├── models/
 ├── routes/
 ├── services/
 ├── middleware/
 ├── utils/
 ├── validation/
 ├── jobs/
 ├── workers/
 └── server.js
```

# --------------------------------------------------------------------

## 👨‍💻 Author

**Chris**
Full Stack Developer | DevOps | AI Integration

# --------------------------------------------------------------------

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
