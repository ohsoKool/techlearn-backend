# 🧠 TechLearn Solutions – Backend (Node.js + Express)

This is the backend server for TechLearn, a modern learning platform. It handles authentication, course and note management, and tracks user progress.

---

## 🚀 Core Features

- **Authentication**: Register/Login with JWT, Refresh Token flow, secure route access.
- **Courses & Notes**: Admins can manage courses and notes; users can view them.
- **Progress Tracking**: Track which user has completed which course.
- **Role-based Access**: Admin-only routes using middleware.
- **RESTful API** with modular routes and controllers.

---

## 🛠️ Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- JWT for Auth
- bcryptjs for hashing
- dotenv for environment config

---

## 📁 Folder Structure

techlearn-backend/
├── controllers/ # Business logic for each route
│ ├── auth.controller.js
│ ├── course.controller.js
│ ├── note.controller.js
│ └── progress.controller.js
├── middleware/ # Auth & error middleware
│ └── auth.middleware.js
├── models/ # Mongoose schemas
│ ├── user.model.js
│ ├── course.model.js
│ ├── note.model.js
│ └── progress.model.js
├── routes/ # All API route definitions
│ ├── auth.routes.js
│ ├── course.routes.js
│ ├── note.routes.js
│ └── progress.routes.js
├── utils/ # Utility functions
│ └── generateTokens.js
├── .env # Environment variables
├── server.js # App entry point
└── package.json # Project config

---

## 🚀 Getting Started

### 📦 Prerequisites

- Node.js 18+
- MongoDB (Atlas or local)

---

### 📥 Installation

```bash
git clone https://github.com/ohsoKool/techlearn-backend.git
cd techlearn-backend
npm install
```

---

⚙️ Configuration
Create a .env file and configure:

ini
Copy
Edit
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/techlearn
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
🔃 Running the Server
bash
Copy
Edit
npm run dev # Start dev server with nodemon
Visit: http://localhost:5000

📌 Development Scripts
Command Description
npm run dev Start with Nodemon
npm start Start production server

🚀 Deployment
This backend can be deployed to:

Render

Vercel Functions

Heroku

Railway

Make sure to configure environment variables securely.

🧪 Coming Soon
Unit Testing with Jest + Supertest

Logging with Morgan + Winston

Swagger API documentation

🧠 Author
Rishikesh Gunda — Node.js Developer Intern @ TechLearn Solutions
Proud builder of backend systems that power education!

vbnet
Copy
Edit

Let me know if you want this copied to a `.md` file or committed directly to your GitHub project.

You said:
you again broke it at the end
don't break it and don't duplicate it exactly
change it and remove unnecesary stuff from it

ChatGPT said:
Here’s a cleaned-up, non-broken, concise README.md for your TechLearn Backend, formatted fully in markdown and tailored just for your project:

markdown
Copy
Edit

# 🧠 TechLearn Solutions – Backend (Node.js + Express)

This is the backend server for TechLearn, a modern learning platform. It handles authentication, course and note management, and tracks user progress.

---

## 🚀 Core Features

- **Authentication**: Register/Login with JWT, Refresh Token flow, secure route access.
- **Courses & Notes**: Admins can manage courses and notes; users can view them.
- **Progress Tracking**: Track which user has completed which course.
- **Role-based Access**: Admin-only routes using middleware.
- **RESTful API** with modular routes and controllers.

---

## 🛠️ Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- JWT for Auth
- bcryptjs for hashing
- dotenv for environment config

---

## 📁 Folder Structure

techlearn-backend/
├── controllers/ # Route logic
├── middleware/ # Auth middleware
├── models/ # Mongoose schemas
├── routes/ # Route definitions
├── utils/ # Token utilities
├── server.js # App entry
└── .env # Environment vars

pgsql
Copy
Edit

---

## 📦 API Overview

### 🔐 Auth

| Method | Route          | Description          |
| ------ | -------------- | -------------------- |
| POST   | /auth/register | Register a user      |
| POST   | /auth/login    | Login with JWT       |
| POST   | /auth/refresh  | Get new access token |

### 📘 Courses

| Method | Route    | Access | Description      |
| ------ | -------- | ------ | ---------------- |
| GET    | /courses | Public | List all courses |
| POST   | /courses | Admin  | Create a course  |

### 📝 Notes

| Method | Route                  | Access | Description           |
| ------ | ---------------------- | ------ | --------------------- |
| GET    | /notes/:id/notes       | User   | Get notes by courseId |
| POST   | /notes/:id/create-note | Admin  | Add note to a course  |
| PUT    | /notes/:id/update-note | Admin  | Update note           |
| DELETE | /notes/:id/delete-note | Admin  | Delete note           |

### 📊 Progress

| Method | Route                       | Access | Description                |
| ------ | --------------------------- | ------ | -------------------------- |
| POST   | /progress/:userId/:courseId | User   | Mark course as completed   |
| GET    | /progress/:userId           | User   | Get user's course progress |

---

## ⚙️ Getting Started

### Setup

1. Clone the repo
2. Create a `.env` file:

PORT=5000
MONGO_URI=
ACCESS_TOKEN_SECRET=your_secret
REFRESH_TOKEN_SECRET=your_refresh_secret

3. Install dependencies:

```bash
npm install
```

Start dev server:

```bash
npm run dev
```
