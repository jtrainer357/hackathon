# EXISTING DESIGN SYSTEM: Tebra Mental Health MVP

## ⚠️ CRITICAL: PRESERVE THIS DESIGN SYSTEM

This document captures the design system already developed over months of prototyping in Antigravity. **All new development MUST use these established patterns, tokens, and components.** Do NOT introduce new design patterns without explicit approval.

---

## Brand Foundation

### Practice Name (For Prototypes)
**Riverside Family Health & Wellness**

This fictional practice name is used in all prototypes and demos.

### Logo
- Tebra logo: A stylized leaf/growth symbol in Forest Green
- Position: Top-left corner of sidebar
- Size: 28-32px height

---

## Color Palette

### Primary Brand Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Terra Cotta** | `#D17B5A` | 209, 123, 90 | Primary actions, highlights, CTAs |
| **Forest Green** | `#1A3D2E` | 26, 61, 46 | Navigation, headers, active states |
| **Warm Sand** | `#F5F1E8` | 245, 241, 232 | Page backgrounds, subtle fills |

### Secondary Colors

| Name | Hex | Usage |
|------|-----|-------|
| **Charcoal** | `#333333` | Primary text |
| **Dark Gray** | `#666666` | Secondary text |
| **Medium Gray** | `#999999` | Placeholder text, disabled |
| **Light Gray** | `#E5E5E5` | Borders, dividers |
| **Off White** | `#FAFAFA` | Card backgrounds |
| **Pure White** | `#FFFFFF` | Content areas |

### Semantic Colors

| State | Hex | Usage |
|-------|-----|-------|
| **Success** | `#2E7D32` | Verified, complete, approved |
| **Warning** | `#ED6C02` | Pending, attention needed |
| **Error** | `#D32F2F` | Denied, error, urgent |
| **Info** | `#0288D1` | Informational |

### Status-Specific Colors

| Status | Background | Text/Border |
|--------|-----------|-------------|
| **Scheduled** | `#E3F2FD` | `#1565C0` |
| **Checked In** | `#E8F5E9` | `#2E7D32` |
| **In Progress** | `#FFF3E0` | `#E65100` |
| **Completed** | `#F5F5F5` | `#616161` |
| **No Show** | `#FFEBEE` | `#C62828` |
| **Cancelled** | `#F5F5F5` | `#9E9E9E` |

---

## Typography

### Font Family
```css
--font-family-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Type Scale

| Name | Size | Weight | Line Height | Usage |
|------|------|--------|-------------|-------|
| **Display** | 32px | 600 | 1.2 | Page titles (rare) |
| **Heading 1** | 24px | 600 | 1.3 | Section headers |
| **Heading 2** | 20px | 600 | 1.4 | Card titles |
| **Heading 3** | 16px | 600 | 1.4 | Subsection titles |
| **Body Large** | 16px | 400 | 1.5 | Primary content |
| **Body** | 14px | 400 | 1.5 | Default text |
| **Body Small** | 13px | 400 | 1.4 | Secondary info |
| **Caption** | 12px | 400 | 1.4 | Labels, metadata |
| **Tiny** | 11px | 500 | 1.2 | Badges, tags |

### Font Weights
- **Regular**: 400
- **Medium**: 500
- **Semibold**: 600
- **Bold**: 700 (sparingly)

---

## Spacing System

Based on 4px grid:

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 4px | Minimal spacing |
| `--space-2` | 8px | Tight spacing |
| `--space-3` | 12px | Default compact |
| `--space-4` | 16px | Default comfortable |
| `--space-5` | 20px | Component gaps |
| `--space-6` | 24px | Section spacing |
| `--space-8` | 32px | Large gaps |
| `--space-10` | 40px | Major sections |
| `--space-12` | 48px | Page sections |

---

## Layout Structure

### Main Layout
```
┌─────────────────────────────────────────────────────────────────────┐
│                          HEADER BAR (64px)                          │
│  [Logo]  Practice Name                    [Search]  [Voice] [+ Add] │
├──────┬──────────────────────────────────────────────────────────────┤
│      │                                                              │
│ SIDE │                      MAIN CONTENT                            │
│ BAR  │                       (Dynamic Canvas)                       │
│ 64px │                                                              │
│      │                                                              │
│  8   │                                                              │
│ nav  │                                                              │
│items │                                                              │
│      │                                                              │
├──────┴──────────────────────────────────────────────────────────────┤
│                    VOICE INPUT BAR (Optional)                       │
│  [Mic Icon]  "Click the microphone to enable voice assistant"       │
└─────────────────────────────────────────────────────────────────────┘
```

### Sidebar Navigation (8 Items)
1. **Home** (🏠) - Dynamic Canvas dashboard
2. **Patients** (👤) - Patient management
3. **Messages** (💬) - Unified inbox
4. **Calendar** (📅) - Scheduling
5. **Outcome Measures** (📊) - PHQ-9, GAD-7, etc.
6. **Documents** (📄) - Clinical documentation
7. **Reports** (📈) - Analytics
8. **Billing** (💰) - Claims, payments

### Sidebar Specifications
- Width: 64px (collapsed, icon-only)
- Width: 240px (expanded, with labels) - optional future state
- Background: `#FFFFFF`
- Active item: Forest Green (#1A3D2E) background with white icon
- Hover: Light gray background (#F5F5F5)
- Icon size: 20-24px
- Icon color: #666666 (inactive), #1A3D2E (active)

---

## Component Patterns

### Cards

**Standard Card**
```css
.card {
  background: #FFFFFF;
  border-radius: 12px;
  border: 1px solid #E5E5E5;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}
```

**Priority Action Card** (e.g., "Patient is arriving")
```css
.priority-card {
  background: #1A3D2E; /* Forest Green */
  color: #FFFFFF;
  border-radius: 12px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
```

### Buttons

**Primary Button** (Terra Cotta)
```css
.btn-primary {
  background: #D17B5A;
  color: #FFFFFF;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-weight: 500;
  font-size: 14px;
}
.btn-primary:hover {
  background: #B8694D;
}
```

**Secondary Button** (Outlined)
```css
.btn-secondary {
  background: transparent;
  color: #333333;
  border: 1px solid #E5E5E5;
  border-radius: 8px;
  padding: 10px 20px;
  font-weight: 500;
  font-size: 14px;
}
.btn-secondary:hover {
  background: #F5F5F5;
}
```

**Ghost Button**
```css
.btn-ghost {
  background: transparent;
  color: #1A3D2E;
  border: none;
  padding: 8px 16px;
  font-weight: 500;
}
.btn-ghost:hover {
  background: rgba(26, 61, 46, 0.05);
}
```

### Status Badges

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 500;
}

.badge-active { background: #E8F5E9; color: #2E7D32; }
.badge-new { background: #E3F2FD; color: #1565C0; }
.badge-pending { background: #FFF3E0; color: #E65100; }
.badge-ended { background: #F5F5F5; color: #616161; }
.badge-in-progress { background: #FFF8E1; color: #F57C00; }
```

### Form Inputs

```css
.input {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #E5E5E5;
  border-radius: 8px;
  font-size: 14px;
  color: #333333;
  background: #FFFFFF;
}
.input:focus {
  border-color: #1A3D2E;
  outline: none;
  box-shadow: 0 0 0 3px rgba(26, 61, 46, 0.1);
}
.input::placeholder {
  color: #999999;
}
```

### Search Bar

```css
.search-bar {
  display: flex;
  align-items: center;
  background: #F5F1E8;
  border-radius: 9999px;
  padding: 10px 16px;
  min-width: 400px;
}
.search-bar input {
  background: transparent;
  border: none;
  flex: 1;
  font-size: 14px;
}
```

---

## Dashboard Widgets

### Schedule Widget
- Card with "Today's Schedule" header
- Date display: "SATURDAY, JAN 3" format
- Appointment count badge
- Priority action card at top (if patient arriving)
- Appointment list with:
  - Time (9:00 AM format)
  - Patient avatar (circular, 32px)
  - Patient name (bold)
  - Appointment type (all caps, smaller text)
  - Provider name
  - Status badge
  - Room assignment

### Messages Widget
- "Messages" header with "Inbox" button
- Message cards with:
  - Icon or avatar (40px)
  - Title/sender (bold)
  - Preview text (truncated, gray)
  - Time ("5 MIN AGO" format)
  - Unread indicator (orange dot)

### Tasks Widget
- "Today's Tasks" header
- Task count badge
- Task items with:
  - Checkbox (circular, green when complete)
  - Task description
  - Source/system (smaller, gray)
  - Action button ("Start", "Open", "View")

### Refills Widget
- "Refills" header with "Fill All" action
- Urgent count indicator
- Patient cards with:
  - Patient name
  - Provider name (smaller)
  - Medication name
  - Dosage
  - Days overdue badge

### Metrics Cards
- Compact cards for KPIs
- Label at top (gray, small)
- Large number/value
- Comparison text below ("+/- vs last period")

---

## Patient-Centric Patterns

### Patient Card (in list)
```
┌─────────────────────────────────────────────┐
│ [Avatar] Sarah Johnson         [ACTIVE]     │
│          Age 40 • DOB: 03/15/1985          │
│          (555) 123-4567                     │
│          Next: Nov 15, 2025 at 2:00 PM     │
│                              [📧] [💬] [📄] │
└─────────────────────────────────────────────┘
```

### Patient Detail Header
```
┌─────────────────────────────────────────────────────────────┐
│  [Large Avatar]   Sarah Johnson              [ACTIVE]       │
│                   📅 DOB: 03/15/1985 (Age 40)  📞 (555) 123 │
│                   ✉️ sarah.j@email.com                      │
│                   🏥 Blue Cross Blue Shield                 │
├─────────────────────────────────────────────────────────────┤
│  LAST VISIT     │  APPOINTMENTS  │  BALANCE                │
│  Oct 25, 2025   │  3 Total       │  $125.50                │
└─────────────────────────────────────────────────────────────┘
```

### Patient Detail Tabs
- Overview (default)
- Appointments
- Medical Records
- Messages
- Billing
- Reviews

---

## AI Interface Elements

### Ask Tebra Search Bar
- Positioned in header, center-right
- Placeholder: "Ask me! I can help with patients, appointments, billing, messages, and more..."
- Voice icon button
- Add/quick action button

### AI Response Panel
- Slides in from right
- Header: "Ask Tebra" with close button
- User query displayed at top
- AI response below
- Action suggestions at bottom

---

## Responsive Considerations

### Breakpoints
```css
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
--breakpoint-2xl: 1536px;
```

### Mobile Adaptations
- Sidebar becomes bottom tab bar
- Cards stack vertically
- Search moves to dedicated screen
- Voice input becomes primary interaction

---

## Animation & Transitions

### Standard Transitions
```css
--transition-fast: 150ms ease;
--transition-base: 200ms ease;
--transition-slow: 300ms ease;
```

### Hover States
- All interactive elements should have visible hover state
- Use subtle background color changes
- Avoid jarring transitions

### Loading States
- Use skeleton loaders for content
- Subtle pulse animation
- Maintain layout to prevent shift

---

## Accessibility Requirements

### Color Contrast
- All text must meet WCAG AA (4.5:1 for normal text)
- Interactive elements must have visible focus states
- Don't rely solely on color to convey meaning

### Focus States
```css
:focus-visible {
  outline: 2px solid #1A3D2E;
  outline-offset: 2px;
}
```

### Screen Reader Support
- All images have alt text
- Form inputs have associated labels
- Interactive elements have aria-labels
- Status changes announced via aria-live

---

## Implementation Notes

### Tailwind Config Extension
```javascript
// tailwind.config.ts
{
  theme: {
    extend: {
      colors: {
        'terra-cotta': '#D17B5A',
        'forest-green': '#1A3D2E',
        'warm-sand': '#F5F1E8',
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
    }
  }
}
```

### Component Library
Use shadcn/ui as the base, but customize all components to match this design system. Key customizations:
- Button variants (primary = terra cotta)
- Card styling (12px radius, light shadow)
- Input styling (8px radius, forest green focus)
- Badge variants (status colors)

---

## Reference Screenshots

The following prototype screenshots establish the visual language:
1. `TebraHomeUIDesign.png` - Main dashboard with all widgets
2. `TebraMVPDesignSystem_pt1_011826.png` - Color palette, typography, components
3. `TebraMVPDesignSystem_pt2_011826.png` - Additional components, charts, forms

**ALWAYS reference these images before implementing any UI.**
