# Smart Leads Dashboard

A production-ready full-stack Lead Management Dashboard (MERN stack with Next.js and TypeScript). This project demonstrates a premium enterprise UI with glassmorphism design, scalable backend architecture, role-based access, and debounced search with complex filtering.

## Tech Stack
- **Frontend**: Next.js 16, TypeScript, TailwindCSS v4, Framer Motion, shadcn/ui, Zustand, React Query, React Hook Form, Zod.
- **Backend**: Node.js, Express.js, TypeScript, MongoDB, Mongoose, Zod, JWT.

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB
- Docker (optional)

### 1. Environment Variables
Copy the `.env.example` file to `.env` in the `backend/` directory and configure the environment variables:
```bash
cp .env.example backend/.env
```

### 2. Running Locally (Without Docker)

**Start Backend**:
```bash
cd backend
npm install
npm run dev
```

**Start Frontend**:
```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:3000` and the backend on `http://localhost:5000`.

### 3. Running with Docker (Recommended)
You can start the entire stack (Frontend, Backend, MongoDB) using Docker Compose:
```bash
docker-compose up --build
```

## API Documentation

### Authentication
- `POST /api/auth/register` - Register a new user (`name`, `email`, `password`, `role: 'Admin' | 'Sales User'`)
- `POST /api/auth/login` - Authenticate user (`email`, `password`)

### Leads
- `GET /api/leads` - Get leads with pagination, filtering, and search
  - Query Params: `page`, `status`, `source`, `search`, `sort`
- `POST /api/leads` - Create a new lead
- `GET /api/leads/:id` - Get a specific lead
- `PUT /api/leads/:id` - Update a lead
- `DELETE /api/leads/:id` - Delete a lead (Admin only)
- `GET /api/leads/export` - Export leads as CSV (Admin only)

## Features
- **Role-Based Access**: Admins can create, edit, delete any leads and export CSVs. Sales Users can only view leads and edit their assigned leads.
- **Advanced Filtering**: Filter by status, source, and search by name/email simultaneously.
- **Debounced Search**: Efficient backend searching with a custom `useDebounce` hook.
- **Pagination**: Server-side MongoDB pagination using skip and limit.
- **Security**: Password hashing with bcrypt, JWT authorization, and input validation using Zod.
