# 🎨 DESIGN SYSTEM GOLD STANDARD

> **This is the definitive rulebook for all UI implementation in the Tebra Mental Health MVP.**
> 
> Any agent implementing UI MUST read and follow this guide. No exceptions.

---

## 📸 GOLDEN REFERENCE SCREENSHOTS

These are pixel-perfect implementations of the design system. Use them as your visual north star.

### Dashboard Home Page
![Dashboard Home - Golden Reference](/docs/design-system-screenshots/dashboard-home-golden.png)

**Key Elements Demonstrated:**
- 12-column responsive grid layout
- `WidgetContainer` with `default` variant (white 65% opacity)
- Priority Action card with `bg-vitality-4` (coral) background
- Schedule list with row states (ENDED=`bg-core-4`, IN PROGRESS=`bg-card`)
- Messages widget with avatar/icon patterns
- Tasks widget with `bg-neuron` (yellow) icon containers
- Refills widget with internal dividers and metadata layout

---

### Billing Page
![Billing Page - Golden Reference](/docs/design-system-screenshots/billing-page-golden.png)

**Key Elements Demonstrated:**
- `WidgetContainer` with `highlight` variant (teal `bg-growth-4/65`)
- AI Insights section with sparkle icon and metric cards
- Process stats bar with `divide-x divide-growth-4` dividers
- Radial bar charts for KPIs (Collections Rate, Denial Rate)
- Financial bar chart with `var(--neuron)` yellow bars
- Alert items with `bg-remedy/10` and `bg-neuron/10` backgrounds
- Billing messages with system icon containers

---

## 🏗️ PART 1: PAGE-LEVEL LAYOUT

Every dashboard page follows this exact structure:

```tsx
"use client"

import { motion } from "framer-motion"
import { DesignSystem } from "@/lib/design-system"

export default function PageName() {
  // REQUIRED: Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: DesignSystem.animation.duration, // 0.5s
        ease: DesignSystem.animation.ease // [0.4, 0, 0.2, 1]
      }
    }
  }

  const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: DesignSystem.animation.staggerChildren // 0.1s
      }
    }
  }

  return (
    <motion.div
      className="p-dashboard-padding grid grid-cols-1 md:grid-cols-12 gap-dashboard-gap max-w-dashboard-max-width mx-auto w-full"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {/* Rows go here */}
    </motion.div>
  )
}
```

### Layout Token Reference
| Token | Value | Purpose |
|-------|-------|---------|
| `p-dashboard-padding` | `16px` | Page outer padding |
| `gap-dashboard-gap` | `8px` | Gap between grid items |
| `max-w-dashboard-max-width` | `1600px` | Maximum content width |
| `h-dashboard-row-1` | `650px` | Primary row height |
| `h-dashboard-row-2` | `380px` | Secondary row height |

### Row Structure
```tsx
{/* Row spanning full 12 columns */}
<div className="col-span-1 md:col-span-12 grid grid-cols-1 md:grid-cols-12 gap-dashboard-gap">
  <motion.div className="col-span-1 md:col-span-8 h-auto md:h-dashboard-row-1" variants={fadeInUp}>
    <LargeWidget /> {/* 8/12 columns */}
  </motion.div>
  <motion.div className="col-span-1 md:col-span-4 h-auto md:h-dashboard-row-1" variants={fadeInUp}>
    <SmallWidget /> {/* 4/12 columns */}
  </motion.div>
</div>
```

---

## 🧱 PART 2: WIDGET ARCHITECTURE

**CRITICAL: All widgets MUST use `WidgetContainer`. Never create raw `Card` components.**

```tsx
import { WidgetContainer } from "@/components/ui/widget-container"

// Default variant (white background)
<WidgetContainer
  title="Today's Schedule"
  headerAction={<Badge variant="secondary">39 Appointments</Badge>}
>
  {/* Content */}
</WidgetContainer>

// Highlight variant (teal background for AI/featured content)
<WidgetContainer
  title="AI Real-Time Insights"
  headerIcon={<HugeiconsIcon icon={SparklesIcon} style={{ width: 'var(--size-icon-md)', height: 'var(--size-icon-md)' }} />}
  variant="highlight"
>
  {/* Content */}
</WidgetContainer>
```

### WidgetContainer Props
| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | Widget header title (required) |
| `headerIcon` | `ReactNode` | Icon before title |
| `titleSuffix` | `ReactNode` | Badge/element after title |
| `headerAction` | `ReactNode` | Button/action on right side |
| `variant` | `"default" \| "highlight"` | Background style |
| `hideHeader` | `boolean` | Hide header entirely |
| `contentClassName` | `string` | Additional content classes |

### Spacing Applied by WidgetContainer
- Header: `pt-widget-header-pt` (32px) + `pb-widget-header-pb` (8px)
- Content: `px-widget-padding-x` (24px) + `pb-widget-padding-y` (32px)
- Shadow: `shadow-widget` (0 6px 10px -2px rgba(0,0,0,0.1))

---

## 🎨 PART 3: COLOR SYSTEM

**⛔ NEVER HARDCODE HEX VALUES. ALWAYS USE CSS VARIABLES OR TAILWIND CLASSES.**

### Brand Palettes

#### Growth (Teal) - Primary Brand
| Token | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| `--growth-1` | `#004852` | `bg-growth-1` | Darkest teal, active icons |
| `--growth-1-5` | `#195B63` | `bg-growth-1-5` | Active navigation |
| `--growth-2` | `#417E86` | `bg-growth-2` | System icon backgrounds |
| `--growth-3` | `#8CB2B6` | `bg-growth-3` | Ring colors |
| `--growth-4` | `#C8DDE0` | `bg-growth-4` | Avatar fallbacks, highlight variant |
| `--growth-5` | `#EEF7F9` | `bg-growth-5` | Lightest teal |

#### Vitality (Coral) - Accent Brand
| Token | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| `--vitality-1` | `#DC7B5D` | `bg-primary` | Primary buttons |
| `--vitality-2` | `#FF8D6E` | `bg-accent` | Accent elements |
| `--vitality-4` | `#FFCFBF` | `bg-vitality-4` | Priority action cards |
| `--vitality-5` | `#FFE9E3` | `bg-vitality-5` | Light accents |

### Neutral Palettes

#### Synapse (Grayscale)
| Token | Hex | Semantic | Usage |
|-------|-----|----------|-------|
| `--synapse-1` | `#000000` | `--foreground` | Primary text |
| `--synapse-2` | `#545454` | `--muted-foreground` | Secondary text |
| `--synapse-4` | `#D6D6D6` | `--border` | Borders |
| `--synapse-6` | `#FFFFFF` | `--card` | Card backgrounds |

#### Backbone (Warm)
| Token | Hex | Semantic | Usage |
|-------|-----|----------|-------|
| `--backbone-2` | `#F0EEE8` | `--background` | Page background |
| `--backbone-3` | `#E8E5DF` | `--muted` | Muted elements |

### State Colors

| State | Token | Hex | Background Token | Usage |
|-------|-------|-----|------------------|-------|
| **Success** | `--vigor` | `#2B865A` | `--asana` | Completed, approved |
| **Warning** | `--neuron` | `#F2BA2A` | `--amino` | Task icons, pending |
| **Error** | `--remedy` | `#B51A2C` | `--plasma` | Denials, alerts |

---

## ✍️ PART 4: TYPOGRAPHY

The primary font is **Akkurat LL** (`--font-sans`).

### Font Size Tokens
| Token | Value | Usage |
|-------|-------|-------|
| `--font-size-metric-value` | `1.875rem` (30px) | Large numbers ($18,694) |
| `--font-size-widget-header` | `1.25rem` (20px) | Widget titles |
| `--font-size-body-sm` | `0.875rem` (14px) | Body text, previews |
| `--font-size-metric-subtitle` | `0.75rem` (12px) | Subtitles, timestamps |

### Typography Patterns

**Metric Value:**
```tsx
<span className="font-normal tracking-tight" style={{ fontSize: 'var(--font-size-metric-value)' }}>
  $18,694
</span>
```

**Metric Subtitle:**
```tsx
<span className="font-medium text-muted-foreground" style={{ fontSize: 'var(--font-size-metric-subtitle)' }}>
  +23% vs last month
</span>
```

**"Tebra Label" (CRITICAL PATTERN):**
```tsx
<span className="text-xs font-bold uppercase tracking-wider text-muted-foreground opacity-70">
  PRIORITY ACTION
</span>
```

**Timestamp:**
```tsx
<span 
  className="uppercase font-bold text-muted-foreground whitespace-nowrap" 
  style={{ fontSize: 'var(--font-size-metric-subtitle)', opacity: 'var(--opacity-timestamp)' }}
>
  5 MIN AGO
</span>
```

---

## 📐 PART 5: SPACING TOKENS

### Dashboard Level
| Token | Value | Utility |
|-------|-------|---------|
| `--spacing-dashboard-padding` | `16px` | `p-dashboard-padding` |
| `--spacing-dashboard-gap` | `8px` | `gap-dashboard-gap` |
| `--spacing-dashboard-max-width` | `1600px` | `max-w-dashboard-max-width` |

### Widget Level
| Token | Value | Utility |
|-------|-------|---------|
| `--spacing-widget-padding-x` | `24px` | `px-widget-padding-x` |
| `--spacing-widget-padding-y` | `32px` | `py-widget-padding-y` |
| `--spacing-widget-gap` | `16px` | `gap-widget-gap` |

### Micro Spacing
| Token | Value | Usage |
|-------|-------|-------|
| `--spacing-widget-gap-xs` | `2px` | Between label lines |
| `--spacing-widget-gap-sm` | `4px` | Small gaps |
| `--spacing-widget-gap-md` | `12px` | List item gaps |
| `--spacing-widget-gap-lg` | `16px` | Standard gaps |
| `--spacing-widget-gap-xl` | `24px` | Section gaps |

---

## 🎯 PART 6: COMPONENT PATTERNS

### 6.1 List Row Item
```tsx
<div className={cn(
  "flex items-center justify-between p-4 border rounded-xl transition-colors",
  isActive ? "bg-card hover:bg-muted/30" : "hover:bg-muted/20"
)}>
  <div className="flex items-start gap-4 flex-1 min-w-0">
    <Avatar className="h-9 w-9 mt-1">
      <AvatarImage src={avatar} />
      <AvatarFallback className="bg-growth-4 text-growth-1 text-xs font-bold">{initials}</AvatarFallback>
    </Avatar>
    <div className="flex-1 min-w-0">
      <div className="font-bold text-sm text-foreground mb-0.5">{title}</div>
      <p className="text-sm text-muted-foreground truncate">{subtitle}</p>
    </div>
  </div>
  <div className="flex items-center gap-2 shrink-0 ml-4">
    <span className="text-xs uppercase font-bold text-muted-foreground opacity-60">{time}</span>
    {isUnread && <div className="h-2 w-2 rounded-full bg-primary" />}
  </div>
</div>
```

### 6.2 System Icon Container
```tsx
<div 
  className="rounded-full bg-growth-2 flex items-center justify-center shrink-0" 
  style={{ width: 'var(--size-avatar)', height: 'var(--size-avatar)' }}
>
  <HugeiconsIcon 
    icon={IconComponent} 
    className="text-primary-foreground" 
    style={{ width: 'var(--size-icon-sm)', height: 'var(--size-icon-sm)' }} 
  />
</div>
```

### 6.3 Priority Action Card
```tsx
<div className="bg-vitality-4 rounded-xl px-6 py-4 flex items-center justify-between border border-border/50 shrink-0">
  <div className="flex items-center gap-4">
    <Avatar className="h-12 w-12 border-2 border-background">
      <AvatarImage src={avatar} />
      <AvatarFallback className="bg-primary/20 text-primary font-bold">{initials}</AvatarFallback>
    </Avatar>
    <div>
      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground opacity-70">Priority Action</span>
      <div className="font-bold text-lg leading-none mb-1">{title}</div>
      <div className="text-sm text-muted-foreground">{subtitle}</div>
    </div>
  </div>
  <Button variant="default" className="rounded-full px-6 font-bold">{actionLabel}</Button>
</div>
```

### 6.4 Task Item with Warning Icon
```tsx
<div className="flex items-center justify-between p-4 border rounded-xl bg-card hover:bg-muted/30 transition-colors">
  <div className="flex items-start gap-4">
    <div className="h-9 w-9 mt-1 rounded-[12px] bg-neuron flex items-center justify-center shrink-0">
      <HugeiconsIcon icon={Tick02Icon} className="h-5 w-5 text-amino" strokeWidth={3} />
    </div>
    <div>
      <div className="font-bold text-sm text-foreground">{title}</div>
      <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mt-0.5 opacity-70">{subtitle}</div>
    </div>
  </div>
  <Button variant="secondary" className="h-8 rounded-full px-4 font-semibold text-xs">{action}</Button>
</div>
```

### 6.5 Actions Detail Module (Final)
```tsx
<WidgetContainer hideHeader>
  <div className="flex flex-col h-full pt-6">
    <div className="mb-6">
      <div className="bg-growth-2 text-white rounded-xl px-6 py-5 shadow-sm">
        <h2 className="text-2xl font-bold mb-2 text-white">{patientName}</h2>
        {/* Meta Row */}
      </div>
    </div>
    {/* Content Grid */}
    <div className="flex-1 pb-6 grid grid-cols-2 gap-6">
       {/* ... */}
    </div>
  </div>
</WidgetContainer>
```
**Key Traits:**
- `hideHeader={true}` on container
- `bg-growth-2` (Teal) header card
- `pt-6` top padding on content wrapper
- `variant="secondary"` Cancel button

---

## 📊 PART 7: CHART INTEGRATION

Use **Recharts** with design system tokens.

### Chart Constants (from DesignSystem.ts)
```tsx
DesignSystem.chart.strokeWidth  // 2
DesignSystem.chart.barSize      // 8
DesignSystem.chart.radius       // 4
DesignSystem.chart.innerRadius  // "70%"
DesignSystem.chart.outerRadius  // "100%"
```

### Bar Chart Colors
- Financial bars: `fill="var(--neuron)"` (yellow)
- Success bars: `fill="var(--vigor)"` (green)
- Teal bars: `fill="var(--growth-2)"` (teal)

### Radial Chart Pattern
```tsx
<RadialBarChart
  innerRadius={DesignSystem.chart.innerRadius}
  outerRadius={DesignSystem.chart.outerRadius}
  barSize={DesignSystem.chart.barSize}
  data={[{ value: percentage, fill: chartColor }]}
  startAngle={90}
  endAngle={-270}
>
  <RadialBar background dataKey="value" cornerRadius={DesignSystem.chart.radius} />
</RadialBarChart>
```

---

## ✅ PART 8: VERIFICATION CHECKLIST

Before any page is complete, verify:

### Colors
- [ ] No hardcoded hex values (search for `#` in component)
- [ ] All colors use `var(--token)` or Tailwind classes like `bg-growth-2`
- [ ] State colors correct: success=vigor, warning=neuron, error=remedy

### Layout
- [ ] Page uses `p-dashboard-padding`, `gap-dashboard-gap`, `max-w-dashboard-max-width`
- [ ] Grid uses 12-column system with `md:` breakpoints
- [ ] All widgets use `WidgetContainer`

### Typography
- [ ] No hardcoded font sizes
- [ ] Metrics use `--font-size-metric-value`
- [ ] All meta labels use "Tebra Label" pattern

### Animation
- [ ] Page container uses `staggerContainer` variant
- [ ] Widgets wrapped in `motion.div` with `fadeInUp`
- [ ] Values from `DesignSystem.animation`

### Components
- [ ] Avatar fallbacks use `bg-growth-4 text-growth-1`
- [ ] Unread indicators: `h-2 w-2 rounded-full bg-primary`
- [ ] Buttons use `rounded-full` for pill shape
- [ ] `ScrollArea` for all scrollable content

---

## 🔗 KEY FILE REFERENCES

| File | Purpose |
|------|---------|
| [globals.css](./app/globals.css) | All CSS variables and tokens |
| [design-system.ts](./lib/design-system.ts) | Animation and chart constants |
| [widget-container.tsx](./components/ui/widget-container.tsx) | Universal widget shell |
| [Dashboard Home](./app/dashboard/(dashboard)/page.tsx) | Golden reference implementation |
| [Billing Page](./app/dashboard/(dashboard)/billing/page.tsx) | Advanced AI widget implementation |

---

## 📚 PART 9: LESSONS LEARNED

> **This section captures corrections and refinements discovered during implementation.**
> 
> Agents MUST read this section before implementing UI to avoid repeating past mistakes.

### How to Use This Section
When the user provides feedback via `/review-design`, corrections are documented here with:
1. **Issue**: What was missed or implemented incorrectly
2. **Correct Implementation**: The right way to do it
3. **Why It Matters**: The impact on user experience or design consistency

---

### 🗂️ Corrections Log

#### [2026-01-21] Patients Page Spacing & Layout
**Issue:**
1. Headers misaligned: Left rail header should top-align with main content header.
2. Incorrect shadows/hovers: "Add Patient" button shadow and hover states wrong.
3. Spacing violations:
   - Gap between left rail and main content should be `16px`.
   - Vertical spacing under main header should be `8px`.
   - Gap between metric cards should be `8px`.
   - Spacing under metric cards should be `16px`.
4. Card padding inconsistency: Right rail patient cards look too thin/inconsistent with other modules.

**Correct Implementation:**
```tsx
// Spacing Constants
const GAP_RAIL_CONTENT = "16px"; // gap-4 or gap-dashboard-gap
const GAP_HEADER_CONTENT = "8px"; // mb-2 or gap-2
const GAP_METRIC_CARDS = "8px"; // gap-2
const GAP_SECTION_Vertical = "16px"; // mb-4 or gap-4

// Button Shadow Fix
className="shadow-md hover:shadow-lg transition-all" // Standard button shadow
```

**Why It Matters:**
Consistent rhythm and alignment are critical for the premium feel. Misalignments break the visual grid and make the interface feel "loose" or unpolished.

**Files Updated:**
- `app/dashboard/(dashboard)/patients/page.tsx`
- `components/patients/patient-list-sidebar.tsx`
- `components/patients/patient-header.tsx`
- `components/patients/patient-stats.tsx`

---

---

> **Remember:** When in doubt, refer to the screenshots above. They are the visual truth.

#### [2026-01-21] Sidebar Layout & Artifacts
**Issue:**
1. "Ghost widget" appearance due to mismatched border radii between container and content (xl vs 2xl).
2. Excessive padding (extra 16px) between sidebar and content due to redundant `pr-4`.
3. Shadow clipping risk on left rail.

**Correct Implementation:**
```tsx
// Sidebar Container: No padding, use flex gap
<div className="w-[380px] shrink-0 h-fit hidden xl:block relative z-10">...</div>

// Sidebar Component: Match WidgetContainer radius (2xl)
className="flex-1 rounded-2xl border border-white/20"
```

**Why It Matters:**
Mismatched radii create visual artifacts ("ghost borders") when containers have borders but content has different roundedness. Redundant padding breaks the 16px grid rhythm.

**Files Updated:**
- `app/dashboard/(dashboard)/patients/patients-client-page.tsx`
#### [2026-01-21] Shadow Clipping & Ghost Widgets
**Issue:**
1. Horizontal shadows (negative x-axis) clipped by `overflow-y-auto` containers when `padding-left` is 0, even if parent has gap.
2. `WidgetContainer` background (`bg-card/65`) creates "ghost" artifacts when used in lists where items have their own backgrounds.

**Correct Implementation:**
```tsx
// 1. Shadow Fix: Move gap into padding of the scrolling container
// Parent: gap-0
// Scroll Container: pl-4 (allows shadow to breathe INSIDE scroll box)
<div className="flex-1 overflow-y-auto pl-4">...</div>

// 2. Ghost Widget Fix: Remove background/shadow from container, keep border if needed
<WidgetContainer className="bg-transparent shadow-none border-white/20">
```

**Why It Matters:**
Overflow containers clip everything outside their box. Padding is *inside* the box, so shadows falling into padding are visible. Gaps are *outside*.
Double backgrounds reduce contrast and look like visual bugs.

**Files Updated:**
- `app/dashboard/(dashboard)/patients/patients-client-page.tsx`
- `components/patients/patient-list-sidebar.tsx`

#### [2026-01-21] Sidebar Fixes (Ghost Bg & Height)
**Issue:**
1. "Ghost Background": `WidgetContainer`'s default `bg-card` persists. `shadow-widget` persists even with `shadow-none` due to custom utility conflicts.
2. Sidebar Scroll: `ScrollArea` with `flex` layout inside constrained `WidgetContainer` failed to scroll.

**Correct Implementation:**
```tsx
// 1. Ghost Bg & Shadow Fix: Standard Widget Styling is preferred
// Restore standard WidgetContainer props. Transparency caused loss of depth.
<WidgetContainer 
    className="flex-1 rounded-2xl border border-white/20" 
/>

// 2. Scroll Fix: Use native overflow for robust scrolling in sidebars
<div className="flex-1 overflow-y-auto min-h-0">
    {/* List Content */}
</div>
```

**Why It Matters:**
- Sidebars should maintain visual weight and consistency with other modules.
- Native scrolling (`overflow-y-auto`) is often more robust than custom scrollbars for complex flex layouts.

**Files Updated:**
- `components/ui/widget-container.tsx`
- `components/patients/patient-list-sidebar.tsx`
- `app/dashboard/(dashboard)/patients/patients-client-page.tsx`

#### [2026-01-22] Hardcoded Colors and Non-Design-System Tokens
**Issue:**
1. Hardcoded hex colors used in modal text (`text-[#202020]`, `text-[#6b6b6b]`)
2. Hardcoded font sizes (`text-[15px]`, `text-[13px]`)
3. Purple color tokens used for AI badges (not in design system)
4. Appointment provider colors using random hex values instead of design system tokens

**Correct Implementation:**
```tsx
// ❌ WRONG - Hardcoded hex colors
<h3 className="text-[15px] font-medium text-[#202020]">
<div className="text-[13px] text-[#6b6b6b]">

// ✅ CORRECT - Use semantic tokens
<h3 className="text-sm font-medium text-foreground">
<div className="text-xs text-muted-foreground">

// ❌ WRONG - Purple (not in design system)
<Badge className="bg-purple-50 text-purple-700 border-purple-100">

// ✅ CORRECT - Use growth palette for AI features
<Badge className="bg-growth-5 text-growth-1 border-growth-3">

// ❌ WRONG - Hardcoded appointment colors
color: '#8B5CF6', // Purple
color: '#EF4444', // Red

// ✅ CORRECT - Map to design system tokens
color: 'var(--vitality-1)', // Coral - Initial sessions
color: 'var(--remedy)', // Red - Urgent/crisis
color: 'var(--neuron)', // Yellow - Assessment
color: 'var(--vigor)', // Green - Group wellness
color: 'var(--growth-1)', // Deep teal - Standard sessions
color: 'var(--growth-2)', // Teal - Clinical management
```

**Why It Matters:**
- **Consistency**: Using semantic tokens ensures colors remain consistent across the app
- **Maintainability**: Changing a design system token updates all usages automatically
- **No Purple**: Purple is not part of the Tebra design system. Growth (teal) palette is the correct choice for AI/tech features
- **Meaningful Mapping**: Appointment colors should map to semantic meaning (crisis=red, assessment=yellow, wellness=green)

**Files Updated:**
- `components/dashboard/actions-completion-modal.tsx`
- `components/clinical/session-note-editor.tsx`
- `components/patients/medical-records-tab.tsx`
- `lib/types/appointment.ts`
- `components/calendar/appointment-card.tsx`

#### [2026-01-22] Inconsistent Spacing Classes
**Issue:**
Using inconsistent padding combinations like `py-dashboard-padding pr-dashboard-padding pl-dashboard-gap` instead of uniform `p-dashboard-padding`.

**Correct Implementation:**
```tsx
// ❌ WRONG - Inconsistent padding
<div className="py-dashboard-padding pr-dashboard-padding pl-dashboard-gap">

// ✅ CORRECT - Uniform padding
<div className="p-dashboard-padding">
```

**Why It Matters:**
Consistent spacing creates visual rhythm and makes the interface feel cohesive. Mixing different padding values breaks the grid system.

**Files Updated:**
- `app/dashboard/(dashboard)/clinical/page.tsx`

---
