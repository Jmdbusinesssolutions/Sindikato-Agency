-- =========================================================================
-- SINDIKATO AGENCY — CLOUDFLARE D1 DATABASE SCHEMA
-- Database Name: sindikato_hosts_db
-- =========================================================================

-- 1. Create Hosts Table
CREATE TABLE IF NOT EXISTS hosts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_number TEXT UNIQUE NOT NULL,       -- e.g. 'SIN-88201'
    id_name TEXT NOT NULL,                -- e.g. 'QueenMia_Live'
    valid_days TEXT NOT NULL DEFAULT '0 Days', -- e.g. '26 Days' (Target: 21 Days)
    live_time TEXT NOT NULL DEFAULT '0 hrs',   -- e.g. '88.5 hrs'
    gift_revenue TEXT NOT NULL DEFAULT '₱0',   -- e.g. '₱94,500'
    game_revenue TEXT NOT NULL DEFAULT '₱0',   -- e.g. '₱42,300'
    app TEXT NOT NULL DEFAULT 'TikTok LIVE',   -- TikTok LIVE, Bigo Live, Poppo Live, etc.
    status TEXT NOT NULL DEFAULT 'Active',     -- Active, Inactive, Suspended
    payout_account TEXT DEFAULT '',            -- GCash / Maya / Bank
    contact_number TEXT DEFAULT '',            -- Mobile / WhatsApp
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Create Search & Performance Indexes
CREATE INDEX IF NOT EXISTS idx_hosts_id_number ON hosts(id_number);
CREATE INDEX IF NOT EXISTS idx_hosts_id_name ON hosts(id_name);
CREATE INDEX IF NOT EXISTS idx_hosts_status ON hosts(status);

-- 3. Initial Seed Data (Sindikato Official Host Roster)
INSERT OR IGNORE INTO hosts (id_number, id_name, valid_days, live_time, gift_revenue, game_revenue, app, status) VALUES
('SIN-88201', 'QueenMia_Live', '26 Days', '88.5 hrs', '₱94,500', '₱42,300', 'TikTok LIVE', 'Active'),
('SIN-77319', 'Boss_King99', '24 Days', '72.0 hrs', '₱145,200', '₱68,900', 'Bigo Live', 'Active'),
('SIN-65482', 'SweetAngel_PH', '28 Days', '115.0 hrs', '₱210,000', '₱95,400', 'Poppo Live', 'Active'),
('SIN-99120', 'ShadowDJ_Live', '22 Days', '64.5 hrs', '₱76,800', '₱31,200', 'TikTok LIVE', 'Active'),
('SIN-54211', 'Bella_Vibe', '25 Days', '80.0 hrs', '₱118,600', '₱54,000', 'Bigo Live', 'Active'),
('SIN-43109', 'PrinceRaven', '21 Days', '58.5 hrs', '₱62,400', '₱28,700', 'Poppo Live', 'Active');
