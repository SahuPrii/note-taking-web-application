# 📝 NoteNest — MERN Stack Note Taking App

A full-stack note-taking web application built with **MongoDB, Express, React, and Node.js (MERN)**. Users can register, log in, and create, edit, delete, pin, and search their personal notes — all secured with JWT authentication.

## ✨ Features

- 🔐 User authentication (register / login) with JWT tokens
- 🔒 Passwords securely hashed with bcrypt
- 📝 Full CRUD for notes (create, read, update, delete)
- 📌 Pin important notes to the top
- 🏷️ Tag notes and organize them
- 🔍 Real-time search across title and content
- 📱 Responsive, clean UI
- 🛡️ Protected routes — each user only sees their own notes

## 🧱 Tech Stack

| Layer     | Technology                          |
|-----------|--------------------------------------|
| Frontend  | React 18, React Router, Axios, Vite  |
| Backend   | Node.js, Express.js                  |
| Database  | MongoDB with Mongoose                |
| Auth      | JSON Web Tokens (JWT), bcryptjs      |

## 📁 Project Structure

```
mern-notes-app/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   └── Note.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── notes.js
│   ├── utils/
│   │   └── generateToken.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── axios.js
│   │   │   ├── auth.js
│   │   │   └── notes.js
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── NoteCard.jsx
│   │   │   ├── NoteModal.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── .gitignore
└── README.md
```

## 🚀 Getting Started (Local Setup)

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- A MongoDB database — either [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free tier) or a local MongoDB instance

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/mern-notes-app.git
cd mern-notes-app
```

### 2. Backend setup
```bash
cd backend
npm install
cp .env.example .env
```
Open `.env` and fill in:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_random_secret_string
PORT=5000
CLIENT_URL=http://localhost:5173
```
Run the backend:
```bash
npm run dev
```
The API will start on `http://localhost:5000`.

### 3. Frontend setup
Open a new terminal:
```bash
cd frontend
npm install
cp .env.example .env
```
Open `.env` and set:
```
VITE_API_URL=http://localhost:5000/api
```
Run the frontend:
```bash
npm run dev
```
The app will start on `http://localhost:5173`.

### 4. Use the app
Open `http://localhost:5173`, register a new account, and start creating notes!

## 🌐 API Endpoints

| Method | Endpoint            | Description               | Auth Required |
|--------|----------------------|---------------------------|----------------|
| POST   | `/api/auth/register`  | Register a new user       | No             |
| POST   | `/api/auth/login`     | Login a user              | No             |
| GET    | `/api/auth/me`        | Get current user profile  | Yes            |
| GET    | `/api/notes`          | Get all notes (supports `?search=`) | Yes  |
| GET    | `/api/notes/:id`      | Get a single note         | Yes            |
| POST   | `/api/notes`          | Create a new note         | Yes            |
| PUT    | `/api/notes/:id`      | Update a note              | Yes            |
| DELETE | `/api/notes/:id`      | Delete a note              | Yes            |

All protected routes require an `Authorization: Bearer <token>` header.

## ☁️ Deployment

### Backend (Render / Railway)
1. Push your code to GitHub.
2. Create a new **Web Service** on [Render](https://render.com) (or Railway).
3. Set the root directory to `backend`.
4. Build command: `npm install`
5. Start command: `npm start`
6. Add environment variables: `MONGO_URI`, `JWT_SECRET`, `PORT`, `CLIENT_URL` (set this to your deployed frontend URL).

### Frontend (Vercel / Netlify)
1. Import the repo into [Vercel](https://vercel.com) (or Netlify).
2. Set the root directory to `frontend`.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add environment variable: `VITE_API_URL` pointing to your deployed backend, e.g. `https://your-backend.onrender.com/api`

### Database (MongoDB Atlas)
1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a database user and whitelist your IP (or `0.0.0.0/0` for all IPs during deployment).
3. Copy the connection string into `MONGO_URI`.

## 📌 Resume-Friendly Description

> **NoteNest — MERN Stack Note Taking Application**
> Built a full-stack note-taking application using MongoDB, Express, React, and Node.js. Implemented secure JWT-based authentication with bcrypt password hashing, RESTful CRUD APIs for notes, real-time search, tagging, and note pinning. Deployed the frontend on Vercel and backend on Render with MongoDB Atlas as the database.

## 🔮 Future Enhancements
- Rich text / markdown editor for notes
- Note sharing and collaboration
- Dark mode
- Note categories/folders
- Trash/archive with soft delete

## 📄 License
This project is open source and available under the [MIT License](LICENSE).
