-- Manual partition setup for discord_events table
-- This script should be run in your PostgreSQL database to set up partitioning

-- First, check if the table is already partitioned
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables 
WHERE tablename = 'discord_events';

-- If the table is not partitioned, you'll need to:
-- 1. Backup your data if you have any
-- 2. Recreate the table as partitioned
-- 3. Restore your data

-- Step 1: Create a backup table (if you have existing data)
-- CREATE TABLE discord_events_backup AS SELECT * FROM discord_events;

-- Step 2: Drop the existing table (WARNING: This will delete your data)
-- DROP TABLE IF EXISTS discord_events CASCADE;

-- Step 3: Recreate the table as partitioned
-- CREATE TABLE discord_events (
--     id uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
--     server_id text,
--     event_type event_type NOT NULL,
--     user_id text,
--     channel_id text,
--     data jsonb NOT NULL,
--     created_at timestamp DEFAULT now() NOT NULL
-- ) PARTITION BY RANGE (created_at);

-- Step 4: Create initial partitions for the next 30 days
-- You can modify the dates below to match your needs

-- Today's partition (adjust the date)
CREATE TABLE IF NOT EXISTS discord_events_2025_09_08
PARTITION OF discord_events
FOR VALUES FROM ('2025-09-08 00:00:00') TO ('2025-09-09 00:00:00');

-- Tomorrow's partition
CREATE TABLE IF NOT EXISTS discord_events_2025_09_09
PARTITION OF discord_events
FOR VALUES FROM ('2025-09-09 00:00:00') TO ('2025-09-10 00:00:00');

-- Next few days (add more as needed)
CREATE TABLE IF NOT EXISTS discord_events_2025_09_10
PARTITION OF discord_events
FOR VALUES FROM ('2025-09-10 00:00:00') TO ('2025-09-11 00:00:00');

CREATE TABLE IF NOT EXISTS discord_events_2025_09_11
PARTITION OF discord_events
FOR VALUES FROM ('2025-09-11 00:00:00') TO ('2025-09-12 00:00:00');

CREATE TABLE IF NOT EXISTS discord_events_2025_09_12
PARTITION OF discord_events
FOR VALUES FROM ('2025-09-12 00:00:00') TO ('2025-09-13 00:00:00');

CREATE TABLE IF NOT EXISTS discord_events_2025_09_13
PARTITION OF discord_events
FOR VALUES FROM ('2025-09-13 00:00:00') TO ('2025-09-14 00:00:00');

CREATE TABLE IF NOT EXISTS discord_events_2025_09_14
PARTITION OF discord_events
FOR VALUES FROM ('2025-09-14 00:00:00') TO ('2025-09-15 00:00:00');

CREATE TABLE IF NOT EXISTS discord_events_2025_09_15
PARTITION OF discord_events
FOR VALUES FROM ('2025-09-15 00:00:00') TO ('2025-09-16 00:00:00');

-- Add foreign key constraints to partitions if needed
-- ALTER TABLE discord_events_2025_09_08 ADD CONSTRAINT discord_events_2025_09_08_server_id_fk 
-- FOREIGN KEY (server_id) REFERENCES servers(id);

-- Repeat for other partitions...

-- Step 5: Restore data if you had any
-- INSERT INTO discord_events SELECT * FROM discord_events_backup;
-- DROP TABLE discord_events_backup;

-- Verify partitions were created
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables 
WHERE tablename LIKE 'discord_events%'
ORDER BY tablename;