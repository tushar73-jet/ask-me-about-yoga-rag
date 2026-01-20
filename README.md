# 🧘‍♂️ Ask Me Anything About Yoga – Wellness RAG Micro-App

A full-stack Wellness RAG (Retrieval-Augmented Generation) micro-application that answers yoga-related questions using a curated knowledge base, safety guardrails, and persistent logging.

This project focuses on RAG system design, backend safety logic, and data handling, with a minimal but clear frontend and a fully working Android APK.

---

## 📖 Table of Contents

- [Project Overview](#-project-overview)
- [Project Structure](#-project-structure)
- [Architecture Explanation](#️-architecture-explanation)
- [RAG Design Choices](#-rag-design-choices-why-these)
- [Safety Logic](#-safety-logic-mandatory-requirement)
- [Data Models](#-data-models-mongodb)
- [How to Run Locally](#-how-to-run-locally)
- [Android APK](#-android-apk-capacitor)
- [AI Tools & Prompts Disclosure](#-ai-tools--prompts-disclosure-honest-declaration)

---

## 📌 Project Overview

The application allows users to ask yoga-related questions and receive:

1.  **Context-aware answers** grounded in trusted yoga documents.
2.  **Transparent source attribution**.
3.  **Safety-first responses** for medical or sensitive queries.

The system avoids unsafe medical advice and prioritizes user well-being, making it suitable for a wellness domain.

---

## 📂 Project Structure

Below is the project's file structure. You can navigate to the folders by clicking the links in the [Directory Navigation](#directory-navigation) section below.

```text
ask-me-about-yoga-rag/
│
├── backend/
│   ├── rag/                  # RAG pipeline (chunking, embeddings, retrieval)
│   ├── src/
│   │   ├── controllers/      # API controllers
│   │   ├── routes/           # Express routes
│   │   ├── services/         # LLM, safety, logging logic
│   │   ├── models/           # MongoDB schemas
│   │   ├── app.js
│   │   └── server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── src/                  # React UI
│   ├── android/              # Capacitor Android project
│   ├── package.json
│   └── capacitor.config.json
│
├── .gitignore
└── README.md
```

### Directory Navigation
- **Backend**:
  - [📂 backend/](./backend/) - Root backend folder
  - [📂 backend/rag/](./backend/rag/) - RAG Pipeline (Chunking, Embeddings, Retrieval)
  - [📂 backend/src/controllers/](./backend/src/controllers/) - API Controllers
  - [📂 backend/src/routes/](./backend/src/routes/) - Express Routes
  - [📂 backend/src/services/](./backend/src/services/) - LLM, Safety, Logging Logic
  - [📂 backend/src/models/](./backend/src/models/) - MongoDB Schemas

- **Frontend**:
  - [📂 frontend/](./frontend/) - Root frontend folder
  - [📂 frontend/src/](./frontend/src/) - React UI Source
  - [📂 frontend/android/](./frontend/android/) - Capacitor Android Project

---

## 🏗️ Architecture Explanation

### 1️⃣ Frontend (React + Vite)
- Simple UI for asking questions.
- **Displays**: Answer, Source documents, Safety warning (if applicable).
- Uses `fetch()` to communicate with the backend API.

### 2️⃣ Backend (Node.js + Express)
**Handles**:
- Question validation
- Safety detection
- RAG pipeline execution
- MongoDB logging
- Exposes a `/ask` API endpoint

### 3️⃣ RAG Pipeline (Inside Backend)
**Flow**:
1.  Yoga articles are chunked into smaller text pieces.
2.  Chunks are converted into embeddings.
3.  Embeddings are stored in a FAISS vector index.
4.  User query is embedded.
5.  Top-K relevant chunks are retrieved.
6.  Retrieved context is passed to the LLM.
7.  Final grounded answer is generated.

---

## 🔍 RAG Design Choices (Why These?)

| Component | Choice | Reason |
|-----------|--------|--------|
| **Chunking** | Custom | Improves retrieval accuracy & prevents context overflow. |
| **Embeddings** | `@xenova/transformers` | Runs locally without external APIs. Lightweight. |
| **Vector Store** | **FAISS** | Fast similarity search. In-memory index suitable for demo-scale. |
| **LLM** | **Groq** | Low latency. Reliable for concise, factual responses. |

---

## ⚠️ Safety Logic (Mandatory Requirement)

The system detects potentially unsafe or medical queries, including:
- Pregnancy
- Blood pressure
- Heart conditions
- Surgery or injuries

**Behavior**:
- Unsafe queries **do not** go through the LLM.
- A predefined **safety notice** is returned instead.
- Prevents medical advice & ensures ethical AI usage.

### Example
> **Query:** "Is headstand safe during pregnancy?"
>
> **Response:** ⚠️ *Safety notice recommending professional guidance instead of an AI answer.*

---

## 🧠 Data Models (MongoDB)

Each query is logged with:
- `question`
- `answer`
- `sources`
- `isUnsafe` flag
- `timestamp`

**Purpose**: Monitoring unsafe queries, debugging RAG behavior, and future analytics.

---

## ▶️ How to Run Locally

### 🔹 Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- npm

### 🔹 Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   npm install
   ```

2. Create a `.env` file in `backend/`:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   GROQ_API_KEY=your_groq_api_key
   ```

3. Start the backend:
   ```bash
   npm run dev
   ```
   *Backend runs at: `http://localhost:5000`*

### 🔹 Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```
   *Frontend runs at: `http://localhost:5173`*

---

## 📱 Android APK (Capacitor)

The frontend is packaged into a fully working Android APK using **Capacitor**.
- APK communicates with the deployed backend.
- Same functionality as the web app.
- **Checked**: Tested on Android Emulator & included in final submission.

---


---
[⬆ Back to Top](#-table-of-contents)
