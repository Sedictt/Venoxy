

# Autonomous Skill: Feature Change Commit & Documentation Manager

## Skill Name

`autonomous_feature_change_manager`

---

# Purpose

Automatically manage repository updates whenever **major product features change**. The agent will:

1. Detect feature-level changes in the codebase
2. Generate a structured **commit message**
3. Update **`docs/list-of-features.md`**
4. Update **`CHANGELOG.md`**
5. Commit everything in a single clean commit

---

# Trigger Conditions

The skill activates when the agent detects **major system-level changes**.

### Trigger Signals

The agent should scan for:

| Signal                        | Meaning                 |
| ----------------------------- | ----------------------- |
| New module or folder          | New feature             |
| New API routes                | New system capability   |
| New database tables           | New domain feature      |
| New UI dashboards             | New user-facing feature |
| Major refactor of core module | Feature update          |
| Removal of module             | Feature deletion        |

---

# Step 1 — Detect Feature Changes

The agent analyzes:

* Git diff
* File tree changes
* Database migrations
* New routes/components
* Removed modules

Example detection:

```
+ src/modules/maintenance-ai/
+ src/services/maintenanceAnalyzer.ts
+ database/migrations/create-maintenance-reports.sql
```

Detected feature:

```
AI Maintenance Triage
```

---

# Step 2 — Classify Change Type

The agent determines:

| Change                   | Commit Prefix |
| ------------------------ | ------------- |
| New feature              | `feat`        |
| Major improvement        | `update`      |
| Removal                  | `remove`      |
| Architecture improvement | `refactor`    |

---

# Step 3 — Generate Commit Message

## Commit Title

Short and direct.

Format:

```
<type>: <feature summary>
```

Example:

```
feat: add AI maintenance triage system
```

---

## Commit Body

Bulletized explanations.

Rules:

* 3–5 bullets
* Each bullet explains **what changed**
* Each bullet explains **why it matters**

Example:

```
• Introduced NLP-based maintenance report analyzer
• Automatically categorizes issues such as plumbing and electrical
• Calculates severity scores and estimated repair costs
• Allows landlords to triage tenant maintenance reports faster
```

---

# Step 4 — Update `list-of-features.md`

The agent must update:

```
/docs/list-of-features.md
```

Rules:

* Insert the new feature under the correct category
* Maintain existing markdown structure
* Do not rewrite unrelated sections

Example addition:

```markdown
### AI Maintenance Triage

A natural language processing system that analyzes tenant maintenance reports and categorizes issues automatically.

Key capabilities:
- Issue categorization
- Severity scoring
- Suggested repair actions
- Estimated cost ranges
```

---

# Step 5 — Update `CHANGELOG.md`

Append a new entry.

Format:

```markdown
## <date>

### Added
- AI Maintenance Triage system for automated maintenance analysis
```

Example:

```markdown
## 2026-03-18

### Added
- AI maintenance triage system for analyzing tenant repair reports
```

---

# Step 6 — Pre-Commit Checks & Execution

1. **Check for Build Errors**: The agent must verify that the project builds successfully (e.g., checking the active dev server logs, or running a manual build command if necessary).
2. **Fix Build Errors**: If any build error is found, the agent **MUST** fix the issue before proceeding to commit.
3. **Execute Commit**: Once all build checks pass, the agent commits all related changes together.

Command:

```
git add .
git commit -m "<generated message>"
```

Example final commit:

```
feat: add AI maintenance triage system

• Introduced NLP-based analyzer for tenant maintenance reports
• Automatically categorizes issues such as plumbing and electrical
• Generates severity levels and estimated repair costs
• Enables faster landlord response to maintenance requests
```

---

# Quality Rules

The agent must ensure:

✔ **No build errors exist before committing** (Fix them first!)
✔ Commits describe **product features**, not code noise
✔ Commit titles remain **short and readable**
✔ Bodies are **bulletized explanations**
✔ Docs remain **synchronized with the system**
✔ No duplicate features appear in documentation

---

# Repository Structure Expected

```
repo/
├─ docs/
│  └─ list-of-features.md
│
├─ CHANGELOG.md
│
├─ src/
│  ├─ modules/
│  ├─ services/
│  └─ components/
```

---

# Example Full Agent Output

If a new messaging system was created:

Commit:

```
feat: add real-time tenant messaging system

• Implemented role-based messaging between tenants and landlords
• Added conversation threads with message history
• Integrated Supabase realtime subscriptions for instant updates
• Enables faster communication for property concerns
```

Docs updated:

```
docs/list-of-features.md
```

Changelog updated:

```
CHANGELOG.md
```

---

# Optional Enhancements (Used by Elite AI Dev Workflows)

You can extend this system to also:

### Automatic Feature Detection

The agent scans for:

```
/modules/*
/features/*
/services/*
```

New folder = potential feature.

---

### PR Description Generation

Automatically write pull request summaries.

---

### Architecture Documentation

Auto-update:

```
docs/architecture.md
```

---

### Feature Usage Analytics

Detect **unused features** and suggest deprecation.

---

# Result

With this system your repository becomes:

* **Self-documenting**
* **Self-maintaining**
* **Clean commit history**
* **Always up-to-date feature docs**

---


