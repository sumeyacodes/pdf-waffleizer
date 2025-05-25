# PDF Waffleizer

**Live Demo:** [https://pdf-waffleizer.vercel.app](https://pdf-waffleizer.vercel.app)

I started this project because my TTS (text-to-speech) Chrome extension couldn't read my PDF documents, so I built a solution that extracts readable text content from PDF files and generates natural-sounding audio using Google Cloud Platform's Text-to-Speech API.

## Core Features

- **PDF Upload & Text Extraction**  
  Upload PDF files and extract clean, readable text.
- **Markdown Conversion**  
  Extracted text is converted into Markdown for easy viewing.
- **Audio Generation**  
  Generate speech using Google Cloud Text-to-Speech (TTS).
- **SSML Support**  
  Uses Speech Synthesis Markup Language (SSML) to handle special characters and improve speech synthesis.
- **Local PDF Management**  
  Save, view, and manage processed PDFs directly in your browser using local storage.

## Project Structure

```
├── .github/
├── backend/
│   ├── api/
│   │   ├── controllers/ # Request handlers & business logic
│   │   └── routes/ # API endpoint definitions
│   ├── scripts/ # Python PDF processing scripts
│   ├── config.ts # Express server config
│   └── Dockerfile
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/ # API requests to backend
│   │   ├── app/
│   │   ├── components/
│   │   ├── hooks/ # Custom React hooks for PDF/audio state
│   │   └── utils/ # Local storage utilities and type definitions
└── README.md
```

## Architecture Overview

PDF Waffleizer employs a client-server architecture:

- **Frontend (React SPA)**  
  Handles PDF uploads, displays extracted text, and manages audio generation via REST API calls.
- **Backend (Node.js/Express)**  
  Handles API requests, invokes Python scripts for text extraction, and integrates with Google Cloud TTS.

## Key Workflows

### 1. PDF Text Extraction

1. **Upload**: User uploads a PDF via the `UploadPDF` component.
2. **Send**: `useExtractPDF` hook sends the file to `/api/extract-pdf/file`.
3. **Process**:
   - `extract-pdf-file.ts` receives and uploads the file to a temporary location (using `multer`).
   - Python scripts (`extract-text.py`, `extract-markdown.py`) extract and format text.
4. **Response**: Extracted text is returned to the frontend.
5. **View**: `ViewPDF` component displays the Markdown using `react-markdown`.

### 2. Audio Generation

1. **Trigger**: User clicks "Generate Audio" in the `GenerateAudio` component.
2. **Send**: `useGenerateAudio` hook sends text to `/api/audio/google-tts`.
3. **Synthesize**: `generate-audio.ts` uses Google Cloud TTS (with SSML) to create audio.
4. **Receive**: Audio data (e.g., MP3) is returned.
5. **Play**: `AudioPlayer` component handles audio playback.

## Local Development Setup

### Prerequisites

Ensure the following are installed:

- **Node.js (LTS)**  
  _Includes `npm`_  
  [Download Node.js](https://nodejs.org/)
- **Python 3.10+**  
  _Includes `pip` (usually bundled)._  
  _Required for running backend PDF processing scripts._  
  [Download Python](https://www.python.org/downloads/)
- **uv**  
  A fast Python package manager written in Rust. Optional but recommended for this project.  
  [Install uv](https://astral.sh/uv)

### Setup & Running

1. **Clone the repository:**

   ```sh
   git clone https://github.com/sumeyacodes/pdf-waffleizer
   cd pdf-waffleizer
   ```

2. **Backend Setup:**

   _Using uv (recommended for this project):_

   ```sh
   uv venv
   source .venv/bin/activate
   ```

   _Or using Python’s venv:_

   ```sh
   python -m venv .venv
   source .venv/bin/activate
   ```

   **Install dependencies:**

   ```sh
   npm install
   uv pip install -r requirements.txt   # If using uv

   # OR
   pip install -r requirements.txt      # If using standard venv
   ```

   **Run the backend server:**

   ```sh
   npm run server
   ```

   Server should run on port `3000`.

3. **Frontend Setup**

   _In a separate terminal window:_

   ```sh
   cd frontend
   npm install
   npm run dev
   ```

   Frontend should run on port `5173`.
