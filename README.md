# Deepshekhar Das Portfolio

A modern, responsive portfolio website with AI-powered chatbot built with React, TypeScript, Tailwind CSS, and Node.js.

## 🎯 Features

- **Hero Section** - Animated landing with 3D background (Three.js)
- **About Section** - Personal bio and highlights
- **Skills Section** - Categorized skills with progress indicators
- **Projects Section** - Portfolio projects with external links
- **Contact Form** - MongoDB-backed form submissions
- **AI ChatBot** - RAG-based chatbot powered by Google Gemini API

## 📁 Structure

- `client/` - Frontend (Vite + React + TypeScript + Tailwind)
- `server/` - Backend API (Node.js + Express + TypeScript)

## 🛠️ Prerequisites

- Node.js (v18 or higher)
- npm
- MongoDB (local or Atlas)
- Google Gemini API Key

## 🚀 Getting Started

### 1. Clone and Install

```bash
# Client
cd client
npm install

# Server
cd ../server
npm install
```

### 2. Environment Setup

**Server** (`server/.env`):
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/portfolio
NODE_ENV=development
GEMINI_API_KEY=your_gemini_api_key_here
```

**Client** (`client/.env`):
```env
VITE_API_URL=http://localhost:5000
```

### 3. Start Development

```bash
# Terminal 1 - Backend
cd server
npm run dev
# Runs on http://localhost:5000

# Terminal 2 - Frontend
cd client
npm run dev
# Runs on http://localhost:5173
```

## 🧪 Testing

```bash
# Frontend tests
cd client
npm test

# Backend tests
cd server
npm test
```

## 📦 Production Build

```bash
cd client
npm run build
# Output: client/dist/
```

## 🔌 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/contact` | POST | Submit contact form |
| `/api/chat` | POST | AI chatbot response |

## ⚙️ Configuration

Update personal details, skills, and projects in `client/src/data/config.ts`.

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd client
vercel deploy
```

### Backend (Render)
Server includes `render.yaml` for easy deployment.

## 📄 License

ISC
