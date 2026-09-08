# BharatContent AI (భారత్ కంటెంట్ AI)
### Gen AI Platform for Automated Content Transformation
**Smart India Hackathon 2026 | Problem Statement ID:** `SIH26154`  
**Team:** GRAMX • **Category:** Software / Artificial Intelligence  

---

## 📌 1. Executive Summary & Problem Overview

Organizations frequently need to convert information from diverse sources—such as:
- **News articles & Press releases**
- **Incident reports & Threat advisories (CERT-In style)**
- **Policy documents & Whitepapers**
- **YouTube videos & Broadcast updates**
- **Audio podcasts & Voice dispatches**
- **Free-form operator prompts**

into specific communication artefacts tailored for different stakeholders. 

Manually analysing the source, understanding its context and intent, and creating multiple deliverables is time-consuming, resource-intensive, and prone to inconsistency.

**BharatContent AI** automates this entire lifecycle. Through a simple, configurable interface, an operator provides a single common source of information and automatically generates all required deliverables simultaneously, fully grounded with 100% sentence-level source traceability and bilingual English + Telugu support.

---

## 🚀 2. Supported Deliverables (SIH Problem Statement Aligned)

From a single source, BharatContent AI generates the **7 core deliverables** highlighted in SIH26154:

| # | Deliverable | Description | Built-in Mockup / Features |
|---|---|---|---|
| **1** | **Executive Summary** | Concise leadership briefing on strategic impacts, key findings, and actionable recommendations. | **Executive Dossier UI**, Key Findings Matrix, Strategic Impact Card, Actionable Roadmap, Raw Document view. |
| **2** | **Complete Video Package** | Broadcast-ready 60s video production package. | Full Script, 3-Scene Storyboard, Visual setting specs, Narration audio, and downloadable **SRT Subtitles**. |
| **3** | **LinkedIn Post** | Executive narrative for enterprise and stakeholder engagement. | Interactive LinkedIn post preview, engagement stats, official hashtags, and 1-click copy. |
| **4** | **X (Twitter) Thread** | Numbered sequence of concise tweets for public transparency. | 5-tweet threaded card feed with connector lines, engagement metrics, and character limit checks. |
| **5** | **Official Advisory** | Statutory incident mitigation bulletin (e.g. CERT-In / Cyber Defense). | Formal governmental layout, Ref Number, Severity tags, Recommended actions, Statutory seal. |
| **6** | **Infographic Blueprint** | Visual layout blueprint for design & social staging. | 3-tier vertical grid specification, quantitative telemetry cards, color palette swatches, typography hierarchy. |
| **7** | **Presentation (Slide Deck)** | 8-slide presentation with speaker notes for board & executive reviews. | Interactive slide canvas, previous/next slide navigation, slide thumbnails, speaker notes, and **PPTX export**. |

*Also supports WhatsApp announcements and Enterprise Email bulletins.*

---

## 🏗️ 3. System Architecture

```mermaid
flowchart TD
    subgraph INGESTION["1. Multi-Modal Ingestion Engine"]
        A1["PDF / Documents (File Upload)"] --> INGEST
        A2["YouTube URL (oEmbed Metadata Extraction)"] --> INGEST
        A3["Audio Stream / Podcast URL (HTML5 Player)"] --> INGEST
        A4["Raw Text / Operator Prompts"] --> INGEST
        INGEST["Ingestion Normalizer & Text Chunker"]
    end

    subgraph CONFIG["2. Operator Configuration"]
        C1["Audience (General Public, Govt, Students, Tech)"]
        C2["Tone (Professional, Formal, Conversational)"]
        C3["Language (English, Telugu, Bilingual Split)"]
        C4["Contextual Directives (Operator Overrides)"]
    end

    subgraph PIPELINE["3. AI Transformation Pipeline"]
        INGEST & CONFIG --> LLM_ROUTER["Model & Prompt Orchestrator"]
        LLM_ROUTER --> GEMINI["Google Gemini 1.5 Flash / 2.0 (Live AI)"]
        LLM_ROUTER --> LOCAL["Deterministic SIH Benchmark Engine"]
        LLM_ROUTER --> OPENAI["OpenAI GPT-4o-mini (Optional)"]
    end

    subgraph ARTEFACTS["4. Synchronized Multi-Deliverables"]
        GEMINI & LOCAL --> D1["Executive Summary Dossier"]
        GEMINI & LOCAL --> D2["Video Package (Script + Storyboard + SRT)"]
        GEMINI & LOCAL --> D3["LinkedIn Post & Twitter/X Thread"]
        GEMINI & LOCAL --> D4["Official Statutory Advisory"]
        GEMINI & LOCAL --> D5["Infographic Layout Blueprint"]
        GEMINI & LOCAL --> D6["Presentation Slide Deck (8 Slides)"]
    end

    subgraph VERIFICATION["5. Trust, Verification & Export"]
        ARTEFACTS --> TRACE["Sentence-Level Claim Provenance (RAG)"]
        TRACE --> FACT_CHECK["96%+ Fact Preservation Engine"]
        FACT_CHECK --> REVIEW["Human-in-the-Loop Review Workflow"]
        REVIEW --> EXPORT["Multi-Format Export: DOCX, PPTX, PDF, SRT, JSON"]
    end
```

---

## ⚡ 4. Quick Start: Running the Project

### Prerequisites
- **Node.js**: v18+ (tested on v20/v22)
- **npm**: v9+
- **Python**: v3.10+ (optional, for FastAPI backend)

### Step 1: Clone and Install Frontend
```bash
# Navigate to the project root
cd GramX-Sih

# Install dependencies
npm install
```

### Step 2: Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
*(Windows PowerShell: `Copy-Item .env.example .env`)*

Open `.env` and configure your API keys (see Section 5 below for free key links).

### Step 3: Run the Frontend Application
```bash
npm run dev
```
Open your browser at: **`http://localhost:5173`**

### Step 4 (Optional): Run the FastAPI Backend & PostgreSQL Schema
```bash
cd backend
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On Linux/macOS:
# source venv/bin/activate

pip install -r requirements.txt
python main.py
```
Backend API will be live at: **`http://localhost:8000/docs`**

---

## 🔑 5. API Keys & External Services (Free Tiers Available)

To run live generation with external LLMs and databases, provide the following keys:

### 1. Google Gemini API (Recommended — Free Tier Available)
- **Get Key**: [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
- **Tier**: Free tier allows 15 RPM, 1,000,000 token context window, and multimodal reasoning.
- **Where to add**:
  - In `.env`: `VITE_GEMINI_API_KEY=AIzaSy...`
  - Or directly inside the application UI: Click **"Live AI Engine"** in the top navigation bar and paste your key.

### 2. OpenAI API (Optional Alternative)
- **Get Key**: [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
- **Where to add**: In `.env`: `VITE_OPENAI_API_KEY=sk-...`

### 3. Supabase / PostgreSQL with pgvector (Database & RAG Storage)
- **Create Free Database**: [https://supabase.com/dashboard](https://supabase.com/dashboard)
- Run the SQL file `backend/schema.sql` in the Supabase SQL Editor.
- **Where to add**: In `.env`:
  ```env
  VITE_SUPABASE_URL=https://your-project.supabase.co
  VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1...
  DATABASE_URL=postgresql://postgres.xxx:password@aws-0-ap-south-1.pooler.supabase.com:6543/postgres
  ```

### 4. Bhashini / MeitY National Language Mission (Telugu Translation)
- **Sign up**: [https://bhashini.gov.in/en/](https://bhashini.gov.in/en/)
- **Where to add**: In `.env`: `VITE_BHASHINI_API_KEY=...`

> **Note**: BharatContent AI features a built-in **Deterministic SIH Benchmark Engine**. Even if no external API keys are configured, the platform runs offline out-of-the-box for evaluation with 100% full UI functionality.

---

## 🖥️ 6. Core Features Walkthrough

### 1. YouTube & Audio Link Direct Ingestion
- In **Step 1: Source Ingestion**, select the **YouTube URL** tab.
- Paste any YouTube link (e.g. `https://www.youtube.com/watch?v=k3_tw44QsZQ`).
- The system automatically extracts the 11-character video ID, fetches oEmbed title/channel metadata, displays an embedded video preview, and generates transcription paragraphs.
- Similarly, paste an **Audio Stream / Podcast URL** to preview with an inline HTML5 audio player.

### 2. Streamlined 1-Line Configuration Panel
- Shows a concise summary: `Audience: General Public • Language: English + Telugu • Tone: Professional [Customize Options ▾]`
- Expand at any time to adjust Target Audience, Tone, Language, Detail Level, Communication Objective, or add Operator Contextual Directives.

### 3. Executive Summary Briefing Dashboard
- Featured as **Deliverable #1**.
- Renders:
  - **Executive Dossier Header** with unique Reference ID and ground-truth badge.
  - **Executive Overview Hero Card** highlighting high-level operational synthesis.
  - **Key Strategic Findings Matrix** with verification seals.
  - **Strategic Impact & Continuity Assessment**.
  - **Actionable Leadership Recommendations Roadmap**.
  - Full formal text document viewer with 1-click copy.
  - Bilingual English / Telugu / Split-screen toggles.

### 4. AI Verification & Traceability
- **AI Verification Modal**: Displays 96%+ fact-preservation score, extracted vs. preserved facts, format compliance, and discrepancy resolver.
- **Source Traceability View**: Click any deliverable claim to see side-by-side highlighting connecting the sentence to its exact source page and paragraph.

### 5. Multi-Format Exporting
- Export as **DOCX**, **Presentation (PPTX)**, **SRT Subtitles** (for video), or complete **JSON Bundle**.

---

## 🧪 7. SIH Evaluation Checklist

- [x] **Problem Statement**: Gen AI Platform for Automated Content Transformation (`SIH26154`)
- [x] **Multi-format Ingestion**: PDF documents, YouTube links, Audio stream links, Free-form prompts, Text.
- [x] **Configurable Operator Settings**: Audience, Tone, Language (Bilingual English + Telugu), Detail level, Contextual directives.
- [x] **7 Core Deliverables Produced**:
  - [x] Executive Summary
  - [x] Video Package (Script, Storyboard, Scenes, Narration, SRT)
  - [x] LinkedIn Post
  - [x] X (Twitter) Thread
  - [x] Official Advisory
  - [x] Infographic Blueprint
  - [x] Presentation (8 slides with speaker notes)
- [x] **AI Verification & Provenance**: Ground-truth preservation score (96%+), claim-level provenance linking.
- [x] **Clean Production Build**: Zero TypeScript errors (`npm run build` passes).

---

## 👥 8. Team & Credits

- **Team**: GRAMX
- **Event**: Smart India Hackathon (SIH) 2026
- **License**: MIT
