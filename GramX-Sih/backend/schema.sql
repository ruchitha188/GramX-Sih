-- ============================================================================
-- BHARATCONTENT AI - DATABASE SCHEMA (PostgreSQL + pgvector)
-- SIH Problem Statement ID: SIH26154 | Team: GRAMX
-- Compatible with Supabase / Neon / Local PostgreSQL
-- ============================================================================

-- 1. Enable pgvector extension for RAG embeddings
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";

-- 2. Organizations & Workspaces
CREATE TABLE IF NOT EXISTS workspaces (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) DEFAULT 'organization', -- 'organization' or 'personal'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Sources Ingestion Table
CREATE TABLE IF NOT EXISTS sources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
    title VARCHAR(500) NOT NULL,
    filename VARCHAR(500) NOT NULL,
    source_type VARCHAR(50) NOT NULL, -- 'pdf', 'text', 'prompt', 'image', 'audio', 'video'
    pages INTEGER DEFAULT 1,
    file_size VARCHAR(50),
    raw_content TEXT,
    context_summary TEXT,
    contextual_directives TEXT, -- operator guidance injected during transformation
    embedding VECTOR(768), -- Google text-embedding-004 vector
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Source Paragraphs (for granular claim provenance and verification)
CREATE TABLE IF NOT EXISTS source_paragraphs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_id UUID REFERENCES sources(id) ON DELETE CASCADE,
    page_number INTEGER NOT NULL,
    paragraph_number INTEGER NOT NULL,
    content TEXT NOT NULL,
    embedding VECTOR(768)
);

-- 5. Deliverables Table
CREATE TABLE IF NOT EXISTS deliverables (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_id UUID REFERENCES sources(id) ON DELETE CASCADE,
    deliverable_type VARCHAR(50) NOT NULL, -- 'linkedin', 'twitter_thread', 'advisory', 'executive_summary', etc.
    title VARCHAR(500) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    content_en TEXT NOT NULL,
    content_te TEXT, -- Telugu localization
    version INTEGER DEFAULT 1,
    review_status VARCHAR(50) DEFAULT 'Draft', -- 'Draft', 'Pending_Review', 'Approved', 'Rejected'
    approved_by VARCHAR(255),
    approved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Fact Verification & Claim Provenance
CREATE TABLE IF NOT EXISTS fact_verifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    deliverable_id UUID REFERENCES deliverables(id) ON DELETE CASCADE,
    claim_text TEXT NOT NULL,
    source_paragraph_id UUID REFERENCES source_paragraphs(id) ON DELETE SET NULL,
    source_page INTEGER,
    source_paragraph_number INTEGER,
    source_text TEXT,
    confidence_score NUMERIC(5, 4) DEFAULT 0.99,
    verified BOOLEAN DEFAULT TRUE,
    mismatch_warning TEXT,
    suggested_fix TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Audit Log Table (Meets SIH Governance & Compliance requirement)
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    deliverable_id UUID REFERENCES deliverables(id) ON DELETE CASCADE,
    action VARCHAR(100) NOT NULL, -- 'GENERATED', 'FACT_CHECKED', 'EDITED', 'APPROVED', 'EXPORTED'
    performed_by VARCHAR(255) NOT NULL,
    user_role VARCHAR(50) NOT NULL, -- 'Admin', 'Editor', 'Reviewer'
    details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Indexing for semantic search
CREATE INDEX IF NOT EXISTS source_paragraphs_embedding_idx ON source_paragraphs 
USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);
