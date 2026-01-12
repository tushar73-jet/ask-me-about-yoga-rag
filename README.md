# 🧘‍♂️ Ask Me Anything About Yoga – Wellness RAG Micro-App

A full-stack **Wellness RAG (Retrieval-Augmented Generation)** micro-application that answers yoga-related questions with **contextual sources**, **safety guardrails**, and **MongoDB logging**.

This project focuses on **RAG design, backend safety logic, and data handling**, with a minimal but clear frontend.

---

## 🚀 Features

### 🔍 RAG Pipeline
- Text chunking of yoga knowledge base
- Semantic embeddings using **Xenova / MiniLM**
- Vector similarity search using **FAISS**
- Context-aware answer generation using **Groq LLM**

### ⚠️ Safety Guardrails (Mandatory)
- Detects potentially unsafe health-related queries (e.g. pregnancy, BP, surgery)
- Prevents unsafe yoga recommendations
- Returns a **clear safety notice instead of an AI answer**
- Logs unsafe queries separately in MongoDB

### 🧠 Backend & Data Logging
- Logs:
  - User question
  - Retrieved sources
  - Final answer
  - Safety flag
  - Timestamp
- MongoDB used for persistent storage

### 🌐 Frontend
- Simple React (Vite) UI
- Query input + Ask button
- Loading indicator
- Answer display
- Source list
- Red safety warning block for unsafe queries

---

## 🧱 Tech Stack

### Frontend
- React (Vite)
- Fetch API

### Backend
- Node.js
- Express.js

### AI & RAG
- `@xenova/transformers` (embeddings)
- `faiss-node` (vector store)
- Groq SDK (LLM)

### Database
- MongoDB (Mongoose)



