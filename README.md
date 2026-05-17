<div align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express.js" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
</div>

<h1 align="center">Smart Leads CRM Dashboard ⚡</h1>

<p align="center">
  <strong>A production-grade, full-stack Lead Management platform engineered for scalability, security, and a premium user experience.</strong>
</p>

---

## 🌟 Executive Summary

Smart Leads Dashboard is a complete MERN stack application built with modern architectural standards. It replaces legacy JavaScript patterns with strict **end-to-end TypeScript**, ensuring type safety from the database schemas to the UI components. 

The frontend leverages the power of **Next.js 16 (App Router)** and **React Query** for optimized server-state management, while the backend utilizes **Express.js** and **MongoDB** for highly efficient, paginated data processing.

## ✨ Core Capabilities

### 🔐 Enterprise-Grade Security
- **JWT Authentication**: Secure stateless token architecture.
- **Role-Based Access Control (RBAC)**: Distinct permissions for `Admin` and `Sales User`.
- **Password Encryption**: Utilizing `bcryptjs` for secure hashing.
- **Request Validation**: Powered by `Zod` schemas on both client and server boundaries.

### 📊 Advanced Data Management
- **Smart Filtering & Debounced Search**: Combine status, source, and regex-powered keyword search concurrently with zero UI lag.
- **Server-Side Pagination**: Highly optimized MongoDB queries utilizing `skip` and `limit`.
- **CSV Export**: Instantly generate and download lead data reports (Admin restricted).

### 🎨 Premium UI/UX
- **Glassmorphism Design**: Modern, responsive, and accessible interface built with TailwindCSS.
- **Form Validation**: Real-time error handling with `react-hook-form` and `@hookform/resolvers/zod`.
- **Intelligent Loading States**: Skeleton loaders and smooth transitions powered by `framer-motion`.

---

## 🏗️ Architecture & Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | Next.js 16, React, TailwindCSS, Zustand | UI framework, styling, and client-side auth state |
| **Data Fetching** | `@tanstack/react-query`, Axios | Caching, background updates, and API interception |
| **Backend** | Node.js, Express.js | High-performance RESTful API |
| **Database** | MongoDB, Mongoose | NoSQL data modeling and aggregation |
| **Language** | TypeScript (Strict Mode) | Type safety and enhanced DX |

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (Local or Atlas cluster)
- Docker & Docker Compose (Optional but recommended)

### 1. Environment Configuration
Duplicate the `.env.example` file located in the root directory into the `backend/` folder:
```bash
cp .env.example backend/.env
```
*Ensure you update the `MONGO_URI` and `JWT_SECRET` with your credentials.*

### 2. Method A: Running with Docker (Preferred)
Launch the entire infrastructure (Frontend, Backend, and MongoDB) seamlessly:
```bash
docker-compose up --build
```
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

### 3. Method B: Running Locally (Manual Setup)

**Initialize Backend:**
```bash
cd backend
npm install
npm run dev
```

**Initialize Frontend:**
```bash
cd frontend
npm install
npm run dev
```

---

## 📖 API Documentation

### Authentication Endpoints
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user account | Public |
| `POST` | `/api/auth/login` | Authenticate and retrieve JWT | Public |

### Lead Management Endpoints
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/leads` | Retrieve leads (Supports `page`, `status`, `search`, `sort`) | Protected |
| `POST` | `/api/leads` | Create a new lead | Protected |
| `PUT` | `/api/leads/:id` | Update an existing lead | Protected |
| `DELETE`| `/api/leads/:id` | Permanently remove a lead | Admin Only |
| `GET` | `/api/leads/export`| Download leads as a CSV file | Admin Only |

---

<p align="center">
  <i>Developed with ❤️ for the Full Stack Engineering Internship Assignment.</i>
</p>
