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

<br /><br />

### 🌐 Live Production Deployments

<a href="https://smart-leads-five.vercel.app/" target="_blank">
  <img src="https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo Vercel" />
</a>
&nbsp;&nbsp;&nbsp;&nbsp;
<a href="https://smart-leads-3gds.onrender.com/api" target="_blank">
  <img src="https://img.shields.io/badge/API%20Endpoint-Render-indigo?style=for-the-badge&logo=render&logoColor=white" alt="API Endpoint Render" />
</a>

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
      ├── Direct Assign (sales user)
      │         └── Lead → sales user "My Leads" ✅
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

> **Base URL:** `http://localhost:5000/api`
>
> All protected routes require a Bearer token in the Authorization header:
> ```
> Authorization: Bearer <your_jwt_token>
> ```

---

### 🔑 Authentication

<details>
<summary><b>POST</b> &nbsp; <code>/api/auth/register</code> &nbsp;—&nbsp; Register a New User</summary>

<br/>

**Access:** `Public`

**Request Body:**
```json
{
  "name": "Kirtee Jeena",
  "email": "kirtee@example.com",
  "password": "mypassword123",
  "role": "Sales User"
}
```
> `role` is optional. Defaults to `"Sales User"`. Can be `"Admin"` or `"Sales User"`.

**Response `201 Created`:**
```json
{
  "_id": "664f1a2b3c4d5e6f7a8b9c0d",
  "name": "Kirtee Jeena",
  "email": "kirtee@example.com",
  "role": "Sales User",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
```

**Error Responses:**

| Code | Message |
|------|---------|
| `400` | `"User already exists"` |
| `400` | `"Name must be at least 2 characters"` |

</details>

---

<details>
<summary><b>POST</b> &nbsp; <code>/api/auth/login</code> &nbsp;—&nbsp; Login & Get Token</summary>

<br/>

**Access:** `Public`

**Request Body:**
```json
{
  "email": "kirtee@example.com",
  "password": "mypassword123"
}
```

**Response `200 OK`:**
```json
{
  "_id": "664f1a2b3c4d5e6f7a8b9c0d",
  "name": "Kirtee Jeena",
  "email": "kirtee@example.com",
  "role": "Sales User",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
```

**Error Responses:**

| Code | Message |
|------|---------|
| `401` | `"Invalid email or password"` |

</details>

---

<details>
<summary><b>GET</b> &nbsp; <code>/api/auth/sales-users</code> &nbsp;—&nbsp; List All Sales Users</summary>

<br/>

**Access:** `🔐 Protected` (Any logged-in user)

**Headers:**
```
Authorization: Bearer <token>
```

**Response `200 OK`:**
```json
[
  {
    "_id": "664f1a2b3c4d5e6f7a8b9c0d",
    "name": "Kirtee Jeena",
    "email": "kirtee@example.com"
  },
  {
    "_id": "664f1a2b3c4d5e6f7a8b9c1e",
    "name": "Rahul Mehta",
    "email": "rahul@example.com"
  }
]
```

</details>

---

### 📋 Lead Management

<details>
<summary><b>GET</b> &nbsp; <code>/api/leads</code> &nbsp;—&nbsp; Get Leads (Tabbed, Paginated, Filtered)</summary>

<br/>

**Access:** `🔐 Protected`

**Query Parameters:**

| Parameter | Type | Values | Description |
|-----------|------|--------|-------------|
| `tab` | `string` | `all` · `requests` · `mine` · `available` | Role-specific view filter |
| `page` | `number` | `1`, `2`, ... | Page number (default: `1`) |
| `search` | `string` | any text | Regex search on `name` and `email` |
| `status` | `string` | `New` · `Contacted` · `Qualified` · `Lost` · `Accepted` | Filter by lead status |
| `source` | `string` | `Website` · `Instagram` · `Referral` | Filter by lead source |
| `sort` | `string` | `oldest` | Sort ascending by date; default is **latest first** |

**Example Request:**
```
GET /api/leads?tab=available&page=1&search=kirtee&sort=oldest
Authorization: Bearer <token>
```

**Response `200 OK`:**
```json
{
  "data": [
    {
      "_id": "664abc123def456789",
      "name": "Kirtee Jeena",
      "email": "kirtee@example.com",
      "status": "New",
      "source": "Website",
      "assignedTo": null,
      "requestedBy": [],
      "createdAt": "2024-05-17T10:00:00.000Z"
    }
  ],
  "pagination": {
    "total": 42,
    "pages": 5,
    "page": 1
  }
}
```

> **Tab Behavior:**
> - `mine` → Only leads assigned to the logged-in Sales User
> - `available` → Unassigned open-pool leads (Sales User only)
> - `all` → All leads in the system (Admin only)
> - `requests` → Leads with pending `requestedBy` entries (Admin only)

</details>

---

<details>
<summary><b>POST</b> &nbsp; <code>/api/leads</code> &nbsp;—&nbsp; Create a New Lead</summary>

<br/>

**Access:** `🔐 Protected`

**Request Body:**
```json
{
  "name": "Arjun Sharma",
  "email": "arjun@startup.io",
  "status": "New",
  "source": "Instagram",
  "assignedTo": "664f1a2b3c4d5e6f7a8b9c0d"
}
```

> `assignedTo` is **optional**.
> - If provided with a `Sales User` ID → **Direct Assignment** (Method 1)
> - If omitted or `null` → **Open Pool** lead — all Sales Users can request it (Method 2)
> - If caller is a `Sales User` → auto-assigned to themselves regardless

**Response `201 Created`:**
```json
{
  "_id": "664f9z8y7x6w5v4u3t2s1r0q",
  "name": "Arjun Sharma",
  "email": "arjun@startup.io",
  "status": "New",
  "source": "Instagram",
  "assignedTo": "664f1a2b3c4d5e6f7a8b9c0d",
  "requestedBy": [],
  "createdAt": "2024-05-17T10:30:00.000Z"
}
```

</details>

---

<details>
<summary><b>GET</b> &nbsp; <code>/api/leads/:id</code> &nbsp;—&nbsp; Get a Single Lead</summary>

<br/>

**Access:** `🔐 Protected`

**Response `200 OK`:**
```json
{
  "_id": "664f9z8y7x6w5v4u3t2s1r0q",
  "name": "Arjun Sharma",
  "email": "arjun@startup.io",
  "status": "Contacted",
  "source": "Instagram",
  "assignedTo": { "_id": "...", "name": "Kirtee Jeena" },
  "requestedBy": [],
  "createdAt": "2024-05-17T10:30:00.000Z"
}
```

| Code | Message |
|------|---------|
| `404` | `"Lead not found"` |

</details>

---

<details>
<summary><b>PUT</b> &nbsp; <code>/api/leads/:id</code> &nbsp;—&nbsp; Update a Lead</summary>

<br/>

**Access:** `🔐 Protected` (Admin: any lead · Sales User: only assigned leads)

**Request Body** _(all fields optional)_**:**
```json
{
  "name": "Arjun Sharma",
  "email": "arjun.new@startup.io",
  "status": "Qualified",
  "source": "Referral"
}
```

**Response `200 OK`:** Returns the updated lead object.

| Code | Message |
|------|---------|
| `403` | `"Not authorized to update this lead"` |
| `404` | `"Lead not found"` |

</details>

---

<details>
<summary><b>DELETE</b> &nbsp; <code>/api/leads/:id</code> &nbsp;—&nbsp; Delete a Lead</summary>

<br/>

**Access:** `🛡️ Admin Only`

**Response `200 OK`:**
```json
{ "message": "Lead removed" }
```

| Code | Message |
|------|---------|
| `403` | `"Admin access required"` |
| `404` | `"Lead not found"` |

</details>

---

<details>
<summary><b>GET</b> &nbsp; <code>/api/leads/export</code> &nbsp;—&nbsp; Export Leads as CSV</summary>

<br/>

**Access:** `🛡️ Admin Only`

Downloads a `.csv` file containing all lead records.

**Response:** `Content-Type: text/csv` with attachment download.

```
name,email,status,source,assignedTo,createdAt
Arjun Sharma,arjun@startup.io,Qualified,Instagram,Kirtee Jeena,2024-05-17
...
```

</details>

---

### 🔄 Lead Request Workflow

<details>
<summary><b>POST</b> &nbsp; <code>/api/leads/:id/request</code> &nbsp;—&nbsp; Request a Lead (Sales User)</summary>

<br/>

**Access:** `🔐 Sales User Only`

Adds the authenticated Sales User to the lead's `requestedBy` array. The lead must be **unassigned** (open pool).

**Response `200 OK`:**
```json
{ "message": "Lead requested successfully" }
```

| Code | Message |
|------|---------|
| `400` | `"You have already requested this lead"` |
| `400` | `"This lead is already assigned"` |
| `403` | `"Only Sales Users can request leads"` |

</details>

---

<details>
<summary><b>PUT</b> &nbsp; <code>/api/leads/:id/approve</code> &nbsp;—&nbsp; Approve a Request (Admin)</summary>

<br/>

**Access:** `🛡️ Admin Only`

Assigns the lead to the specified Sales User, clears all other requests, and updates the lead status to `Accepted`.

**Request Body:**
```json
{ "userId": "664f1a2b3c4d5e6f7a8b9c0d" }
```

**Response `200 OK`:**
```json
{
  "_id": "664f9z8y...",
  "status": "Accepted",
  "assignedTo": { "_id": "664f1a2b...", "name": "Kirtee Jeena" },
  "requestedBy": []
}
```

| Code | Message |
|------|---------|
| `400` | `"userId is required"` |
| `404` | `"Lead not found"` |

</details>

---

<details>
<summary><b>PUT</b> &nbsp; <code>/api/leads/:id/reject</code> &nbsp;—&nbsp; Reject a Request (Admin)</summary>

<br/>

**Access:** `🛡️ Admin Only`

Removes only the specified user from `requestedBy`. The lead remains open for other Sales Users.

**Request Body:**
```json
{ "userId": "664f1a2b3c4d5e6f7a8b9c0d" }
```

**Response `200 OK`:**
```json
{ "message": "Request rejected" }
```

</details>

---

### ⚠️ Global Error Format

All API errors return a consistent JSON structure:

```json
{
  "message": "Human-readable error description"
}
```

| HTTP Code | Meaning |
|-----------|---------|
| `400` | Bad Request — Invalid input or validation failure |
| `401` | Unauthorized — Missing or invalid JWT token |
| `403` | Forbidden — Insufficient role permissions |
| `404` | Not Found — Resource does not exist |
| `500` | Internal Server Error — Unexpected server failure |


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
