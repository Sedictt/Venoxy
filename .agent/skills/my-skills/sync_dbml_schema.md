

# Agent Skill: Database Schema Sync

## Skill Name

`sync_dbml_schema`

---

# Purpose

Automatically update the database schema documentation file:

```
docs/DBML.sql
```

whenever a **database migration is created, modified, or executed**.

This ensures that the repository always contains a **human-readable representation of the current database structure**.

---

# Trigger Conditions

Run this skill whenever the agent detects **database schema changes**.

### Trigger Signals

| Signal                 | Meaning                         |
| ---------------------- | ------------------------------- |
| New migration file     | Schema change                   |
| Modified migration     | Schema change                   |
| New table              | Feature expansion               |
| Column added           | Feature update                  |
| Column removed         | Schema cleanup                  |
| Constraint/index added | Performance or integrity change |

Typical migration directories:

```
/migrations/
/supabase/migrations/
/prisma/migrations/
/db/migrations/
```

---

# Step 1 — Detect Migration Changes

The agent scans new or modified migration files for statements like:

```
CREATE TABLE
ALTER TABLE
DROP TABLE
ADD COLUMN
DROP COLUMN
CREATE INDEX
ADD CONSTRAINT
```

Example migration:

```sql
CREATE TABLE maintenance_reports (
    id UUID PRIMARY KEY,
    tenant_id UUID,
    property_id UUID,
    category TEXT,
    severity INT,
    description TEXT,
    created_at TIMESTAMP
);
```

---

# Step 2 — Parse Schema Changes

The agent extracts schema information:

* Tables
* Columns
* Types
* Constraints
* Foreign keys
* Indexes

Example interpretation:

```
Table: maintenance_reports

Columns:
- id (UUID, primary key)
- tenant_id (UUID)
- property_id (UUID)
- category (TEXT)
- severity (INT)
- description (TEXT)
- created_at (TIMESTAMP)
```

---

# Step 3 — Update `docs/DBML.sql`

File location:

```
docs/DBML.sql
```

The agent must update the schema documentation to reflect the **latest database structure**.

### Rules

* Maintain **one definition per table**
* Preserve **existing formatting**
* Do not duplicate tables
* Remove tables that were dropped

---

# Step 4 — Insert or Modify Table Definitions

Example schema entry:

```sql
Table maintenance_reports {
  id uuid [pk]
  tenant_id uuid
  property_id uuid
  category text
  severity int
  description text
  created_at timestamp
}
```

---

# Step 5 — Update Relationships

If foreign keys exist, the agent adds references.

Example:

```sql
Ref: maintenance_reports.tenant_id > tenants.id
Ref: maintenance_reports.property_id > properties.id
```

---

# Step 6 — Handle Schema Changes

### Table Added

Append new table definition.

Example:

```
Table maintenance_reports { ... }
```

---

### Column Added

Modify the table block.

Example change:

```
ALTER TABLE maintenance_reports ADD COLUMN status TEXT
```

Updated schema:

```sql
Table maintenance_reports {
  id uuid [pk]
  tenant_id uuid
  property_id uuid
  category text
  severity int
  description text
  status text
  created_at timestamp
}
```

---

### Column Removed

Remove the column from the table block.

---

### Table Removed

Delete the entire table block.

---

# Step 7 — Keep Table Order Consistent

Recommended ordering:

1. Core entities
2. Relationship tables
3. Transaction tables
4. Logs / analytics tables

Example ordering:

```
users
properties
units
tenants
leases
payments
maintenance_reports
messages
tasks
```

---

# Step 8 — Commit Schema Changes

After updating the schema file:

```
git add docs/DBML.sql
git commit
```

Commit format:

```
update: sync DBML schema with latest migrations

• Added new table definitions from recent migrations
• Updated modified table structures and columns
• Removed deprecated schema entries
```

---

# Formatting Rules

The schema file must follow **DBML-style SQL documentation**.

Example:

```sql
Table users {
  id uuid [pk]
  email text
  password_hash text
  created_at timestamp
}

Table properties {
  id uuid [pk]
  landlord_id uuid
  name text
  address text
  created_at timestamp
}

Ref: properties.landlord_id > users.id
```

---

# Safety Rules

The agent must:

✔ Only update tables affected by migrations
✔ Preserve manual comments in the file
✔ Avoid rewriting unrelated sections
✔ Keep schema definitions readable

---

# Example Workflow

### Migration detected

```
supabase/migrations/20260318_create_messages.sql
```

Migration contains:

```
CREATE TABLE messages (...)
```

---

### Agent updates

```
docs/DBML.sql
```

Adds:

```sql
Table messages {
  id uuid [pk]
  sender_id uuid
  receiver_id uuid
  content text
  created_at timestamp
}
```

---

### Commit generated

```
update: sync DBML schema with latest migrations

• Added messages table from new messaging system migration
• Updated schema documentation to reflect current database structure
```

---

# Result

Your repository gains:

* **Always accurate database schema documentation**
* **Readable DB structure for developers**
* **Easy onboarding for new contributors**
* **Reliable schema history**

---

