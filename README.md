## Task Manager - Full Stack Setup Guide

This project is a full-stack task manager with a Node/Express + MongoDB backend and a React (Vite) frontend styled with Tailwind CSS.

### Prerequisites

- Node.js 20+ and npm
- MongoDB connection string (Atlas or local)

### Project Structure

- `backend/`: Express API with authentication and todos
- `frontend/`: React app (Vite) with Tailwind

### 1. Backend Setup

1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   npm install
   ```
2. Create a `.env` file in `backend/` with:
   ```bash
   PORT=5000
   MONGODB_URL=mongodb+srv://<username>:<password>@<cluster>/<db>?retryWrites=true&w=majority
   JWT_SECRET=replace-with-a-strong-secret
   ```
3. Start the API (dev mode):
   ```bash
   npm run dev
   ```
   - The API will listen on `http://localhost:5000`
   - Routes:
     - `POST /api/auth/register`
     - `POST /api/auth/login`
     - `GET /api/todos` (auth)
     - `POST /api/todos` (auth)
     - `PUT /api/todos/:id` (auth)
     - `DELETE /api/todos/:id` (auth)
     - `PATCH /api/todos/:id/complete` (auth)

### 2. Frontend Setup

1. In a new terminal, navigate to the frontend folder:
   ```bash
   cd frontend
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```
   - Vite will print a local URL to open in your browser.

### Tailwind CSS

- Tailwind is preconfigured in `frontend/src/index.css` via `@import "tailwindcss";`.
- The UI uses Tailwind utility classes throughout pages and components.

### Auth & Services

- The frontend stores the JWT token in `localStorage`.
- Axios instance with interceptors: `frontend/src/services/api.js`
- Auth service: `frontend/src/services/authService.js`
- Todo service: `frontend/src/services/todoService.js`

### Available Pages

- `Login` (`/login`)
- `Signup` (`/signup`)
- `TodoList` (`/todos`) — protected route

### Common Troubleshooting

- If you see 401 responses, ensure you have logged in and the token exists in `localStorage` under `authToken`.
- Make sure backend `.env` has a valid `MONGODB_URL` and `JWT_SECRET`.
- If ports conflict, change `PORT` in backend `.env` and update `VITE_API_URL` accordingly.

### Production Builds

- Backend: deploy as a Node app (ensure env vars present)
- Frontend: from `frontend/` run `npm run build` to generate a production bundle in `dist/`.

### Windows Tips

- On Windows CMD/PowerShell, run each service in its own terminal.
- If using OneDrive path, ensure Node has permission to read/write `.env` files.
