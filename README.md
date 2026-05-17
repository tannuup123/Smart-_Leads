<div align="center">

<img src="https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
<img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
<img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
<img src="https://img.shields.io/badge/Zustand-orange?style=for-the-badge" alt="Zustand" />
<img src="https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white" alt="React Query" />

<br /><br />

# ⚡ Smart Leads CRM Dashboard

**A production-grade, full-stack Lead Management CRM with a dual-role workflow engine, real-time assignment pipeline, and a premium glassmorphic dark UI.**

<br />

[![Made with Love](https://img.shields.io/badge/Made%20with-%E2%9D%A4%EF%B8%8F-red?style=flat-square)](https://github.com/tannuup123/Smart-_Leads)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

</div>

---

## 🌟 Executive Summary

**Smart Leads** is a complete MERN stack CRM application built from the ground up with modern architectural standards. It implements a sophisticated **two-method lead assignment workflow** — allowing Admins to directly assign leads to Sales Users *or* open them to an open pool where Sales Users can request and compete for leads.

The platform enforces **strict end-to-end TypeScript**, **Role-Based Access Control (RBAC)**, and a **premium glassmorphism UI** that delivers a first-class SaaS experience.

---

## ✨ Feature Showcase

### 🔐 Authentication & Role-Based Access Control
- **JWT Authentication** with secure, stateless token architecture
- **Dual Roles:** `Admin` and `Sales User` — each with a **completely separate dashboard**, navigation, and feature set
- **Password Hashing** via `bcryptjs`
- **Zod validation** on all API boundaries (both client & server)
- Role badge on the top navbar for instant visual identification

---

### 🎯 Lead Assignment Workflow — The Core Engine

The platform supports **two powerful assignment methods**, selectable by the Admin directly in the "New Lead" form:

#### Method 1: Direct Assignment
> Admin picks a specific Sales User from a dropdown → Lead is **instantly** added to that user's **"My Leads"** tab.

#### Method 2: Open Pool (Request-to-Work)
> Admin selects **"🌐 Anyone (Open Pool)"** → Lead appears in **"Available Leads"** for all Sales Users → They click **"Request to Work"** → Admin sees the requests and **Accepts or Rejects** each one.

```
Admin Creates Lead
      │
      ├── Direct Assign (Kirtee Jeena)
      │         └── Lead → Kirtee's "My Leads" ✅
      │
      └── Open Pool (Anyone)
                └── Visible in "Available Leads"
                          └── Sales User clicks "Request to Work"
                                    └── Admin sees in "Lead Requests" tab
                                              ├── Accept → Assigned, status = Accepted ✅
                                              └── Reject → Request removed, Lead still available 🔄
```

---

### 📊 Admin Dashboard
| Feature | Details |
| :--- | :--- |
| **All Leads Tab** | Full paginated view of all leads in the system |
| **Lead Requests Tab** | See all pending Sales User requests with Accept/Reject per user |
| **Create Lead** | Full form with "Assign To" dropdown — choose a specific Sales User or open pool |
| **Edit & Delete** | Full CRUD on all leads |
| **CSV Export** | Download all leads as a formatted CSV report |
| **Analytics** | Lead conversion charts, source breakdowns, monthly performance graphs |

### 👤 Sales User Dashboard
| Feature | Details |
| :--- | :--- |
| **My Leads Tab** | View all directly assigned + approved leads |
| **Available Leads Tab** | Browse all unassigned open pool leads |
| **Request to Work** | One-click request button; shows "Requested" once sent |
| **Performance Widgets** | Assigned, Contacted, Qualified, Pending Follow-up counts |
| **Daily Targets** | Visual progress bars for daily performance goals |
| **Activity Timeline** | Recent lead activity feed |

---

### 🔍 Advanced Data Controls
- **⚡ Debounced Search** — 500ms debounce on search input, zero unnecessary API calls
- **📄 Server-Side Pagination** — `skip/limit` on MongoDB, with full page controls
- **🔽 Sort Dropdown** — "Latest Leads" / "Oldest Leads" — instant re-sort
- **🏷️ Status Filter** — Filter by New, Contacted, Qualified, Lost, Accepted
- **📡 Source Filter** — Website, Instagram, Referral
- **⏳ Loading States** — Skeleton loaders, animated transitions, disabled buttons during mutations

---

### 🎨 Premium UI/UX
- **Dark Mode Glassmorphism** design system
- **Framer Motion** page transitions and table row animations
- **Responsive** layout for desktop and tablet
- **Tabbed Navigation** — role-specific tabs render contextually
- **Toast Notifications** via `sonner` — success/error feedback on every action
- **Interactive Charts** — Recharts powered analytics with custom gradients
- **Google Fonts (Inter)** for premium typography

---

## 🏗️ Architecture & Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | Next.js 16 (App Router), React 18 | UI framework and routing |
| **Styling** | TailwindCSS, Framer Motion | Design system and animations |
| **State** | Zustand | Global auth state management |
| **Server State** | TanStack React Query, Axios | API caching, background refetch |
| **Forms** | React Hook Form + Zod | Validated, type-safe forms |
| **Backend** | Node.js, Express.js | RESTful API server |
| **Database** | MongoDB, Mongoose | NoSQL schema + request pipeline |
| **Auth** | JWT, bcryptjs | Stateless auth and password hashing |
| **Language** | TypeScript (Strict) | End-to-end type safety |

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js v18+
- MongoDB (Local or Atlas)

### 1. Clone & Configure Environment
```bash
git clone https://github.com/tannuup123/Smart-_Leads.git
cd Smart-_Leads
```

Create a `.env` file inside the `backend/` folder:
```bash
cp .env.example backend/.env
```

Update the values:
```env
MONGO_URI=mongodb://localhost:27017/smart-leads
JWT_SECRET=your_super_secret_jwt_key_here
PORT=5000
NODE_ENV=development
```

For the frontend, create `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 2. Run Backend
```bash
cd backend
npm install
npm run dev
# Server starts at http://localhost:5000
```

### 3. Run Frontend
```bash
cd frontend
npm install
npm run dev
# App starts at http://localhost:3000
```

---

## 📖 API Reference

### 🔑 Auth Endpoints
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user | Public |
| `POST` | `/api/auth/login` | Login and get JWT token | Public |
| `GET` | `/api/auth/sales-users` | List all Sales Users | Protected |

### 📋 Lead Endpoints
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/leads` | Get leads (supports `tab`, `page`, `search`, `status`, `source`, `sort`) | Protected |
| `POST` | `/api/leads` | Create a new lead (with optional `assignedTo`) | Protected |
| `GET` | `/api/leads/:id` | Get single lead by ID | Protected |
| `PUT` | `/api/leads/:id` | Update a lead | Protected |
| `DELETE` | `/api/leads/:id` | Delete a lead | Admin Only |
| `GET` | `/api/leads/export` | Export all leads as CSV | Admin Only |
| `POST` | `/api/leads/:id/request` | Sales User requests a lead | Sales User |
| `PUT` | `/api/leads/:id/approve` | Admin approves a user's request | Admin Only |
| `PUT` | `/api/leads/:id/reject` | Admin rejects a user's request | Admin Only |

### Query Parameters for `GET /api/leads`
| Param | Values | Description |
| :--- | :--- | :--- |
| `tab` | `all`, `requests`, `mine`, `available` | Role-specific tab filter |
| `page` | `1`, `2`, ... | Pagination page number |
| `search` | any string | Regex search on name/email |
| `status` | `New`, `Contacted`, `Qualified`, `Lost`, `Accepted` | Filter by status |
| `source` | `Website`, `Instagram`, `Referral` | Filter by source |
| `sort` | `oldest` | Sort ascending; default is latest-first |

---

## 📁 Project Structure

```
Smart-_Leads/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── authController.ts    # Register, Login, getSalesUsers
│   │   │   └── leadController.ts   # CRUD + request/approve/reject
│   │   ├── middleware/
│   │   │   ├── authMiddleware.ts   # JWT protect
│   │   │   └── roleMiddleware.ts   # adminOnly guard
│   │   ├── models/
│   │   │   ├── User.ts             # User schema (Admin | Sales User)
│   │   │   └── Lead.ts             # Lead schema with requestedBy[]
│   │   ├── routes/
│   │   │   ├── authRoutes.ts
│   │   │   └── leadRoutes.ts
│   │   └── server.ts
│   └── package.json
│
└── frontend/
    ├── app/
    │   ├── dashboard/
    │   │   ├── page.tsx            # Role-conditional dashboard render
    │   │   └── leads/page.tsx      # LeadTable page
    │   ├── login/ & signup/
    │   └── layout.tsx
    ├── components/
    │   ├── dashboard/
    │   │   ├── lead-table.tsx      # Full leads table with tabs, request UI
    │   │   ├── sales-dashboard.tsx # Sales User specific dashboard
    │   │   ├── sidebar.tsx         # Role-aware navigation
    │   │   └── topbar.tsx          # Role badge + user info
    │   └── ui/                     # Shared UI primitives
    ├── store/
    │   └── useAuthStore.ts         # Zustand auth store
    └── lib/
        ├── api.ts                  # Axios instance with JWT interceptor
        └── leads-data.ts           # Types, constants, status colors
```

---

<div align="center">
  <p>Built with ❤️ using the MERN stack + Next.js 16</p>
  <p><strong>Smart Leads CRM</strong> — Turning prospects into pipeline.</p>
</div>
