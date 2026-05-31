# StudyMatch — Full Stack (React + Node.js + MongoDB)

## Project Structure
```
studymatch/
├── backend/                  ← Node.js + Express + MongoDB
│   ├── server.js
│   ├── .env
│   ├── models/Session.js
│   ├── controllers/sessionController.js
│   └── routes/sessionRoutes.js
│
└── src/                      ← React frontend (UI unchanged)
    ├── api/sessions.js        ← all API calls
    ├── components/            ← Navbar, SessionCard (unchanged)
    └── pages/                 ← BrowsePage, PostPage, MySessionsPage (connected to DB)
```

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/sessions/stats | Get open/total counts |
| GET | /api/sessions | Get all sessions (optional ?search=) |
| GET | /api/sessions/:id | Get single session |
| POST | /api/sessions | Create session |
| PUT | /api/sessions/:id | Update session |
| DELETE | /api/sessions/:id | Delete session |
| POST | /api/sessions/:id/join | Join a session |
| POST | /api/sessions/:id/leave | Leave a session |

## How to Run

### Step 1 — Start MongoDB
```bash
brew services start mongodb/brew/mongodb-community
```

### Step 2 — Start Backend (Terminal 1)
```bash
cd backend
npm install
npm run dev
# ✅ Connected to MongoDB
# 🚀 Server running on http://localhost:5000
```

### Step 3 — Start Frontend (Terminal 2)
```bash
npm install
npm run dev
# Open: http://localhost:5173
```
