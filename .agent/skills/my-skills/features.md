
# Agent Skill: Maintain `list-of-features.md`

## Skill Name

`update_feature_documentation`

## Purpose

Automatically maintain the `list-of-features.md` documentation file whenever a **major feature is added, updated, or deleted** in the codebase or product specification. The agent ensures that the documentation always reflects the **current system capabilities**.

---

# Trigger Conditions

The agent must run this skill whenever one of the following occurs:

### 1. Feature Added

A **new major feature** is introduced such as:

* New system module
* New dashboard or tool
* New AI capability
* New tenant/landlord workflow
* New payment or financial feature
* New administrative control

Examples:

* "Add maintenance AI triage system"
* "Create tenant messaging module"
* "Add map-based property discovery"

---

### 2. Feature Updated

A **significant modification** occurs to an existing feature including:

* Major UI workflow changes
* Additional functionality added
* Behavioral changes
* New integrations
* New capabilities inside an existing module

Examples:

* GCash payment verification added to invoicing
* Messaging module upgraded to real-time subscriptions
* Map discovery updated with radius filtering

---

### 3. Feature Removed

A feature or module is **deprecated or deleted** from the system.

The agent must:

* Remove the feature entry
* Ensure section structure remains valid

---

# Responsibilities

When triggered, the agent must:

### 1. Read Current Documentation

Open and analyze:

```
/docs/list-of-features.md
```

Understand:

* Current feature sections
* Feature descriptions
* Module categories

---

### 2. Detect Feature Category

Map the change to one of the core sections:

1. **Visual Property & Spatial Management**
2. **Intelligent Tenant Lifecycle & Discovery**
3. **Advanced Financial Operations & Payments**
4. **AI-Driven Utilities & Automation**
5. **Communication & Community Engagement**
6. **Administrative Oversight & Security**

If the feature does not belong to an existing category, create a **new section**.

---

### 3. Update the Markdown

The agent must:

#### If Feature Added

* Insert a new subsection
* Include:

  * Feature title
  * Clear explanation
  * Key capabilities list

Example structure:

```markdown
### Feature Name
Short explanation of the feature.

Key capabilities:
- capability 1
- capability 2
- capability 3
```

---

#### If Feature Updated

Update the relevant section:

* Modify description
* Add/remove capabilities
* Keep formatting consistent

---

#### If Feature Removed

* Delete the subsection
* Ensure headers remain valid
* Do not leave empty sections

---

# Formatting Rules

The agent must maintain this structure:

```
# Property Management System – Feature Overview

## I. Section Name
### Feature Name
Description

Key capabilities:
- item
- item
```

Rules:

* Use **Markdown headings only**
* Use **bullet lists for capabilities**
* Keep descriptions concise
* Avoid duplication
* Maintain section numbering

---

# Quality Standards

The agent must ensure:

✔ Features are grouped logically
✔ Descriptions are concise and technical
✔ No duplicate features exist
✔ All sections remain readable
✔ Markdown formatting is valid

---

# Example Update Behavior

### Example Input

Change detected:

```
Added feature: AI Rent Price Estimator
```

### Agent Action

Append under **AI-Driven Utilities & Automation**:

```markdown
### AI Rent Price Estimator
An AI model that analyzes local rental market data and property attributes to suggest optimal rent pricing.

Key capabilities:
- Market comparison analysis
- Price range recommendations
- Revenue optimization insights
```

---

# Safety Rules

The agent **must NOT**:

* Remove unrelated features
* Rewrite the entire document unnecessarily
* Change section ordering unless required
* Modify wording outside the affected feature

---

# Expected Output

The agent must produce:

```
Updated /docs/list-of-features.md
```

with:

* Clean formatting
* Accurate feature descriptions
* Updated sections reflecting the latest system state


