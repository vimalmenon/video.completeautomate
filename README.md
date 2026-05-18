# Video.CompleteAutomate

## Components

| Composition | Description | Frames | Schema |
|-------------|------------|--------|--------|
| **HelloWorld** | Animated logo + title reveal | 150 | `titleText`, `titleColor`, `logoColor1`, `logoColor2` |
| **Intro** | Typewriter text reveal with audio | 150 | `text` |
| **CodeTyper** | VS Code-style code typing animation | 600 | — |
| **AutomationNextBigThing** | Hero + stats + CTA sequence | 300 | `text`, `subtext` |
| **ServicesShowcase** | Animated service cards (AI, Workflow, Data) | 300 | `title`, `subtitle`, `services[]` |
| **ClientTestimonial** | Testimonial card with stars, quote, author | 240 | `quote`, `author`, `role`, `company`, `rating` |
| **ProcessFlow** | Connected step-by-step process diagram | 300 | `title`, `steps[]` |
| **Comparison** | Before/After split screen with bullet points | 240 | `beforeTitle`, `afterTitle`, `beforePoints[]`, `afterPoints[]` |

### Reusable Components
- **StatCounter** — Animated number counter (value, label, suffix)
- **LogoWall** — Grid of company logos with staggered fade-in

### Design System
- Palette: `#0F172A` (slate bg), `#0891B2` (teal primary), `#22D3EE` (cyan highlight)
- Dark theme throughout, inline styles (no CSS modules)
- All event components export `zod` schema + TypeScript types
- 1920x1080, 30fps

## Quick Start

```bash
npm install
npm run dev    # launches Remotion Studio
npm run build  # bundles for rendering
```

## Render a Video

```bash
npx remotion render src/index.ts <CompositionId> out/video.mp4
```

Example:
```bash
npx remotion render src/index.ts ServicesShowcase out/services.mp4
```

## Rendering with Props

```bash
npx remotion render src/index.ts ClientTestimonial out/testimonial.mp4 \
  --props='{"quote":"Amazing service!","author":"John","role":"CEO","company":"Acme","rating":5}'
```
