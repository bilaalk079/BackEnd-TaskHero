#  TaskHero Backend

TaskHero is a productivity web application designed to help users manage their daily tasks with ease. It offers features like task creation, deadlines, priorities, and status tracking to boost productivity and organization.

This repository contains the **backend service** for TaskHero, providing user authentication, task management, and a secure RESTful API.

---

## 🚀 Features

- ✅ User registration and authentication (JWT-based)
- 📝 Full CRUD operations for tasks
- 📄 Pagination support for task listings
- 🔍 Advanced querying (sorting and filtering)
- ⏰ Task priority, deadlines, and completion status
- 🔐 Secure RESTful API
- 📦 Scalable and modular backend structure

---

## 🛠️ Tech Stack

- **Node.js** – JavaScript runtime
- **Express.js** – Web framework for building APIs
- **MongoDB + Mongoose** – NoSQL database and ODM
- **JWT** – Secure user authentication
- **dotenv** – Manage environment variables
- **cors** – Enable CORS for API access
- **bcryptjs** – Hashing passwords securely
- **jsonwebtoken** – Create and verify JWT tokens
- **cookie-parser** – Handle HTTP-only refresh tokens

---

## 📂 Project Structure

- `controllers/` – Route logic
- `models/` – Mongoose models
- `routes/` – API route definitions
- `middleware/` – Authentication, error handling, etc.
- `config/` – DB connection and environment configuration
- `server.js` – Server entry point
- `.env` – Environment variables

## This is a personal project it'll be live at [TaskHero](https://taskhero.vercel.app)
