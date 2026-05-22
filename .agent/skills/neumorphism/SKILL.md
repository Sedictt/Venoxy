---
name: neumorphism
description: Consistent application of Neumorphism design system using predefined global CSS classes for soft, tactile, embedded UI.
license: MIT
metadata:
  author: AI Assistant
---

# Neumorphism Design System Skill (iReside)

## Mission
You are an expert design-system guideline author for the iReside project.
Your goal is to ensure that the Neumorphism style is applied consistently across all pages (e.g., Dashboard, Community Hub, Navbar) by strictly using the project's predefined global CSS classes.

## Core Principle
**NEVER use arbitrary inline tailwind box-shadow classes** (e.g., `shadow-[inset_...]` or `shadow-[4px_4px_...]`) to implement neumorphism. Instead, always use the predefined global utility classes in `globals.css`. This ensures identical shadow spread, colors, border radii, and dark/light mode transition behaviors across the entire application.

## Predefined Neumorphic Classes

Use the following classes to style elements:

### 1. `.neumorphic-panel`
- **Usage**: Main containers, large background cards, page wrappers, and non-interactive structural surfaces.
- **Effect**: Creates a large, soft extruded surface with subtle borders and broad shadows.
- **Example**: `<main className="neumorphic-panel rounded-[2.5rem] p-6">...</main>`

### 2. `.neumorphic-extruded`
- **Usage**: Interactive elements, secondary buttons, clickable list items, and actionable cards.
- **Effect**: Appears slightly raised from the surface. Includes built-in hover (slightly pressed) and active (inset pressed) state transitions.
- **Example**: `<button className="neumorphic-extruded px-4 py-2 rounded-xl">Click Me</button>`

### 3. `.neumorphic-inset`
- **Usage**: Input fields, text areas, stat boxes, and depressed data containers.
- **Effect**: Appears carved or pushed into the surface with inner shadows.
- **Example**: `<input type="text" className="neumorphic-inset h-12 rounded-2xl px-4" />`

### 4. `.neumorphic-inset-card`
- **Usage**: Small decorative elements, icon wrappers, avatar backgrounds, and toggle tracks.
- **Effect**: A tighter, smaller inset shadow designed for compact elements.
- **Example**: `<div className="size-12 rounded-full neumorphic-inset-card flex items-center justify-center"><Icon /></div>`

### 5. `.neumorphic-primary`
- **Usage**: Primary call-to-action (CTA) buttons and highly emphasized interactive elements.
- **Effect**: Combines the primary theme color with a colored neumorphic shadow. Includes hover and active state transitions.
- **Example**: `<button className="neumorphic-primary w-full py-4 rounded-2xl">Submit Application</button>`

## Best Practices
- **Background Integrity**: Neumorphism requires elements to blend with their parent background. Always ensure the parent container shares the same background color (`var(--background)`) as the neumorphic elements.
- **Avoid Borders**: Rely on the predefined classes which include subtle borders (`1px solid rgba(...)`). Do not manually add Tailwind borders (e.g., `border border-white/10`) unless intentionally overriding a specific edge case.
- **Rounded Corners**: Neumorphism looks best with generous border radii. Use Tailwind's rounded classes extensively (e.g., `rounded-2xl`, `rounded-[2.5rem]`, `rounded-full`).

## QA Checklist
- [ ] Did you use the official `.neumorphic-*` classes instead of inline arbitrary values?
- [ ] Do interactive elements (using `.neumorphic-extruded` or `.neumorphic-primary`) react properly when hovered or clicked?
- [ ] Are input fields and data boxes correctly depressed using `.neumorphic-inset`?
- [ ] Is the parent background matching the surface of the neumorphic elements?