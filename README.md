🧘‍♂️ Ask Me Anything About Yoga – Wellness RAG Micro-App

A full-stack Wellness RAG (Retrieval-Augmented Generation) micro-application that answers yoga-related questions using a curated knowledge base, safety guardrails, and persistent logging.

This project focuses on RAG system design, backend safety logic, and data handling, with a minimal but clear frontend and a fully working Android APK.

📌 Project Overview

The application allows users to ask yoga-related questions and receive:

Context-aware answers grounded in trusted yoga documents

Transparent source attribution

Safety-first responses for medical or sensitive queries

The system avoids unsafe medical advice and prioritizes user well-being, making it suitable for a wellness domain.

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


🏗️ Architecture Explanation
1️⃣ Frontend (React + Vite)

Simple UI for asking questions

Displays:

Answer

Source documents

Safety warning (if applicable)

Uses fetch() to communicate with backend API

2️⃣ Backend (Node.js + Express)

Handles:

Question validation

Safety detection

RAG pipeline execution

MongoDB logging

Exposes a /ask API endpoint

3️⃣ RAG Pipeline (Inside Backend)

Flow:

Yoga articles are chunked into smaller text pieces

Chunks are converted into embeddings

Embeddings are stored in a FAISS vector index

User query is embedded

Top-K relevant chunks are retrieved

Retrieved context is passed to the LLM

Final grounded answer is generated

🔍 RAG Design Choices (Why These?)
Chunking

Improves retrieval accuracy

Prevents context overflow

Embeddings – @xenova/transformers

Runs locally without external embedding APIs

Lightweight and suitable for small knowledge bases

Vector Store – FAISS

Fast similarity search

In-memory index suitable for demo-scale RAG systems

LLM – Groq

Low latency

Reliable for concise, factual responses

⚠️ Safety Logic (Mandatory Requirement)

The system detects potentially unsafe or medical queries, including:

Pregnancy

Blood pressure

Heart conditions

Surgery or injuries

Behavior:

Unsafe queries do not go through the LLM

A predefined safety notice is returned instead

Prevents medical advice

Ensures ethical AI usage

Example:

Query:

“Is headstand safe during pregnancy?”

Response:
⚠️ Safety notice recommending professional guidance instead of an AI answer

🧠 Data Models (MongoDB)

Each query is logged with:

question

answer

sources

isUnsafe flag

timestamp

This allows:

Monitoring unsafe queries

Debugging RAG behavior

Future analytics

▶️ How to Run Locally
🔹 Prerequisites

Node.js (v18+ recommended)

MongoDB (local or Atlas)

npm

🔹 Backend Setup
cd backend
npm install


Create .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
GROQ_API_KEY=your_groq_api_key


Start backend:

npm run dev


Backend runs at:

http://localhost:5000

🔹 Frontend Setup
cd frontend
npm install
npm run dev


Frontend runs at:

http://localhost:5173

📱 Android APK (Capacitor)

Frontend is packaged into a fully working Android APK

Built using Capacitor

APK communicates with the deployed backend

Same functionality as web app

✔ APK tested on Android Emulator
✔ APK included in final submission


🤖 AI Tools & Prompts Disclosure (Honest Declaration)

AI tools were used as a learning and debugging assistant, similar to documentation or Stack Overflow, and not for blind copy-paste or auto-generated project creation.

Tools Used

ChatGPT
Used for:

Understanding RAG architecture concepts

Debugging backend and frontend integration issues

Clarifying FAISS, embeddings, and safety logic

Assistance with Capacitor APK build steps and Android Studio errors

Structuring the README and demo flow

Groq LLM
Used only at runtime as the language model for generating answers inside the application.

Example Prompts Used (Representative, Not Exhaustive)

“Explain how a Retrieval-Augmented Generation (RAG) pipeline works”

“How to implement safety checks for health-related queries in a wellness app”

“How to fix FAISS embedding dimension mismatch”

“How to build an Android APK using Capacitor and connect it to a backend”

Declaration

All final implementation decisions, code integration, debugging, project structure, and deployment steps were performed manually by me.

AI tools were used strictly for:

Conceptual clarity

Debugging assistance

Best-practice guidance

This project reflects my own understanding, effort, and problem-solving process.



