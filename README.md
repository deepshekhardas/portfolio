# Deepshekhar Das Portfolio

A modern, responsive portfolio website built with React, TypeScript, Tailwind CSS, and Node.js.

## Structure

- `client/`: Frontend application (Vite + React + TypeScript + Tailwind)
- `server/`: Backend API (Node.js + Express + TypeScript)

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Getting Started

### 1. Install Dependencies

Install dependencies for both client and server:

```bash
# Client
cd client
npm install

# Server
cd ../server
npm install
```

### 2. Start the Backend Server

Open a terminal and run:

```bash
cd server
npm run dev
```
The server will start on `http://localhost:5000`.

### 3. Start the Frontend Application

Open a **new** terminal window and run:

```bash
cd client
npm run dev
```
The application will start on `http://localhost:5173`.

## Features

- **Responsive Design**: Works on mobile, tablet, and desktop.
- **Components**:
  - Hero Section with gradients
  - About Section with highlights
  - Skills Section with categorized progress bars
  - Projects Section with external links
  - Contact Form with backend integration
- **Backend API**: 
  - `POST /api/contact`: Handles form submissions.

## Configuration

You can update your personal details, skills, and projects in `client/src/data/config.ts`.
