# 🧠 TechLearn Solutions – Backend (Node.js + Express)

This is the backend server for **TechLearn**, a modern learning platform. It handles **authentication**, **course and note management**, and **user progress tracking**.

---

## 🚀 Core Features

- ✅ **Authentication**: Register/Login using JWT, secure token management (access + refresh).
- 📚 **Courses & Notes**: Admins can manage them; users can access them.
- 📊 **Progress Tracking**: Track course and exercise completion per user.
- 🔐 **Role-Based Access Control**: Admin-only routes with middleware protection.
- 📡 **RESTful API**: Modular route and controller architecture.

---

## 🛠️ Tech Stack

- **Node.js** + **Express**
- **MongoDB** + **Mongoose**
- **JWT** for token-based authentication
- **bcryptjs** for password hashing
- **dotenv** for environment variable management

---

## 📁 Folder Structure

```
techlearn-backend/
├── controllers/             # Business logic for routes
│   ├── auth.controller.js
│   ├── course.controller.js
│   ├── note.controller.js
│   └── progress.controller.js
│
├── middleware/              # Auth and validation middleware
│   └── auth.middleware.js
│
├── models/                  # Mongoose schemas
│   ├── user.model.js
│   ├── course.model.js
│   ├── note.model.js
│   ├── progress.model.js
│   ├── courseProgress.model.js
│   └── exerciseProgress.model.js
│
├── routes/                  # Route declarations
│   ├── auth.routes.js
│   ├── course.routes.js
│   ├── note.routes.js
│   ├── progress.routes.js
│   └── exercise.routes.js
│
├── utils/                   # Utility functions
│   └── generateTokens.js
│
├── .env                     # Environment variables
├── server.js                # Main entry point
└── package.json             # Project dependencies and scripts
```

---

## 🚀 Getting Started

### 📦 Prerequisites

- Node.js 18+
- MongoDB (local or hosted on MongoDB Atlas)

---

### 📥 Installation

```bash
git clone https://github.com/ohsoKool/techlearn-backend.git
cd techlearn-backend
npm install
```

## 🔧 Configuration

Create a `.env` file in the root directory and add the following environment variables:

```
PORT=5000
MONGO_URI=mongodb+srv://<your-mongo-uri>
ACCESS_TOKEN_SECRET=<your-access-token-secret>
REFRESH_TOKEN_SECRET=<your-refresh-token-secret>
```

Replace them with your actual credentials.

## 🏃 Run the Server

To start the development server, run:

```bash
npm run dev
```

The server will start at:

```
http://localhost:5000
```
