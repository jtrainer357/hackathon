# Tebra Design System Package

> Extracted from Dynamic Canvas MVP - A complete, production-ready design system for healthcare applications.

## Quick Start

### 1. Copy to New Project

```bash
# Copy the entire package to your new project
cp -r tebra-design-system /path/to/your-new-project/
```

### 2. Install Dependencies

```bash
npm install clsx tailwind-merge @radix-ui/react-* framer-motion recharts lucide-react
npm install hugeicons-react @hugeicons/core-free-icons # Icon libraries
```

### 3. Configure Tailwind

Copy/merge `styles/globals.css` into your project's main CSS file. The file contains all CSS variables for:
- Color palettes (Growth, Vitality, Backbone, Core, Care, Synapse)
- Spacing tokens (dashboard, widget, micro)
- Typography tokens
- Animation tokens
- Shadow utilities

### 4. Setup Aliases

Add these path aliases to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/components/*": ["./components/*"],
      "@/lib/*": ["./lib/*"]
    }
  }
}
```

### 5. Load Fonts

Add Akkurat LL fonts to your project. See `assets/fonts/` for the complete family.

```css
@font-face {
  font-family: 'Akkurat LL';
  src: url('/fonts/AkkuratLL-Regular.otf') format('opentype');
  font-weight: 400;
}
/* Add other weights as needed */
/* Add other weights as needed */
```

### 6. Critical Layout Setup (REQUIRED)

The Tebra Design System relies on a specific layout structure using the Sidebar and Header components. This is **CRITICAL** for the application to look and feel correct.

Create a root layout (e.g., `app/dashboard/layout.tsx`) with this exact structure:

```tsx
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar"
import { DashboardHeader } from "@/components/layout/dashboard-header"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-sidebar">
        {/* 1. Critical Left Navigation */}
        <DashboardSidebar />
        
        <SidebarInset>
          {/* 2. Critical Top Header (Practice Switcher + Search) */}
          <DashboardHeader />
          
          {/* 3. Main Content Area */}
          <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
```

> **Note**: The `PracticeSwitcher` in the header includes a "Demo Mode" that works out-of-the-box. When you are ready to connect a real backend, pass the `practices` and `currentPractice` props to it (or modify the component directly).

---

## Package Contents

### Core Tokens (`styles/globals.css`)
- 6 color palettes with 30+ tokens
- Dashboard layout tokens
- Widget spacing tokens
- Typography scale
- Animation timing

### JavaScript Constants (`lib/design-system.ts`)
```typescript
import { DesignSystem } from '@/lib/design-system'

// Animation
DesignSystem.animation.duration   // 0.5s
DesignSystem.animation.ease       // [0.4, 0, 0.2, 1]
DesignSystem.animation.staggerChildren // 0.1s

// Charts (Recharts)
DesignSystem.chart.strokeWidth    // 2
DesignSystem.chart.barSize        // 8
DesignSystem.chart.radius         // 4
```

### UI Components (51 files)
All shadcn/ui primitives customized for Tebra:
- `button`, `card`, `badge`, `avatar`, `input`
- `dialog`, `sheet`, `drawer`, `popover`, `tabs`
- `table`, `chart`, `calendar`, `sidebar`
- **`widget-container`** - Universal widget shell (ALWAYS use this)

### Dashboard Widgets (9 modules)
Production-ready widget templates:
- `schedule-widget` - Appointment lists
- `messages-widget` - Inbox messages  
- `tasks-widget` - Task management
- `refills-widget` - Prescription refills
- `priority-actions-widget` - Priority alerts

### Documentation
- `DESIGN_SYSTEM_GOLD_STANDARD.md` - Complete rulebook with patterns
- `EXISTING_DESIGN_SYSTEM.md` - Historical reference

---

## Key Patterns

### Always Use WidgetContainer

```tsx
import { WidgetContainer } from '@/components/ui/widget-container'

// Default (white) variant
<WidgetContainer title="Today's Schedule">
  {/* content */}
</WidgetContainer>

// Highlight (teal) variant for AI/featured content
<WidgetContainer title="AI Insights" variant="highlight">
  {/* content */}
</WidgetContainer>
```

### Color Usage

```tsx
// ✅ CORRECT - use CSS variables
className="bg-growth-2 text-synapse-6"
style={{ color: 'var(--vitality-1)' }}

// ❌ WRONG - never hardcode hex values
style={{ color: '#DC7B5D' }}
```

### Animation Pattern

```tsx
import { motion } from 'framer-motion'
import { DesignSystem } from '@/lib/design-system'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DesignSystem.animation.duration,
      ease: DesignSystem.animation.ease
    }
  }
}

<motion.div variants={fadeInUp} initial="initial" animate="animate">
  <WidgetContainer title="Widget">...</WidgetContainer>
</motion.div>
```

---

## Color Reference

| Palette | Usage | Primary Token |
|---------|-------|---------------|
| **Growth** (Teal) | Primary brand | `--growth-1` to `--growth-5` |
| **Vitality** (Coral) | Accent/CTAs | `--vitality-1` to `--vitality-5` |
| **Backbone** | Warm neutrals | `--backbone-1` to `--backbone-4` |
| **Synapse** | Grayscale | `--synapse-1` to `--synapse-6` |
| **Success** | Green states | `--vigor`, `--asana` |
| **Warning** | Yellow states | `--neuron`, `--amino` |
| **Error** | Red states | `--remedy`, `--plasma` |

---

## License

Proprietary - Tebra Health
