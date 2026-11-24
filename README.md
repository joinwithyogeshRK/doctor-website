# Dr. Vivek Sharma — consultant physician

A single-page site for an individual doctor: booking, online consultation,
services, a small medicine store, a mock checkout, clinic details and FAQ.
Frontend only — nothing is sent to a booking API, payment gateway or backend.

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + production bundle into dist/
npm run preview  # serve the built bundle
```

## Stack

React 19 · TypeScript · Vite · Tailwind v4 · Three.js via React Three Fiber and
Drei · GSAP ScrollTrigger · Framer Motion · Lenis · Lucide icons.

## Layout

```
src/
  components/
    layout/      Navbar, Footer, Section + SectionHeading
    sections/    one file per page section, in page order
    three/       the two WebGL scenes, their geometry, and the lazy mounts
    ui/          Button, Field, Modal, StarRating, CountStat, EcgLine, social marks
    cart/        CartDrawer
  context/       CartContext — the only cross-section state
  data/          all copy and dummy data, nothing hardcoded in components
  hooks/         smooth scroll, scroll reveal, magnetic buttons, count-up, reduced motion
  lib/           formatting, validation, and the scroll/pointer snapshot the 3D scene reads
  types/         shared types
scripts/
  clean-assets.py  regenerates public/assets from the supplied source crops
```

## Motion

- One orchestrated GSAP timeline for the hero entrance; everything else is a
  single short rise-and-fade per section, triggered once.
- Lenis drives scrolling and feeds `ScrollTrigger`. It also feeds a plain
  mutable snapshot (`lib/scrollState.ts`) that the 3D scene samples inside
  `useFrame`, so scroll and pointer movement never re-render React.
- Section anchors rely on each section's `scroll-mt-24` for the header gap —
  Lenis and `scrollIntoView` both honour it, so no manual offset is applied.
- `prefers-reduced-motion` removes every entrance, the carousel's autoplay and
  the magnetic buttons, and neither WebGL scene mounts at all.

## 3D

Two scenes, both lazily imported and mounted only once in view:

- **Hero** (`three/HeroScene.tsx`) — a procedurally extruded heart with a
  two-stage beat, floating instruments, a 1,100-point particle field, a
  cursor-tracking point light, and a camera that dollies back as the hero
  scrolls away. Mobile drops to 350 particles, `dpr: 1` and no antialiasing.
- **Consultation** (`three/PulseOrbScene.tsx`) — one faceted orb in a wire cage.

Geometry is created in `three/geometry.ts` and disposed on unmount. `three` and
`@react-three/*` are split into their own chunks, so the initial page does not
pay for them.

## About the images

Everything in `public/assets/` is derived from the supplied collage crops by
`scripts/clean-assets.py`. Two things are worth knowing:

1. **The source is low resolution.** The collage is 1536×1024 and the crops are
   145–335 px wide, so the photographic assets (the doctor, the clinic
   building, the surgery still) are upscaled 2–4× and are soft at display size.
   There is no higher-resolution original. The hero's large visual is WebGL
   rather than a bitmap for exactly this reason, and the icons and avatars are
   used at close to their native size.
2. **The supplied transparency was not real.** The crops carry a rendered
   checkerboard pattern rather than an alpha channel. The script keys it out
   with a border flood fill (seeding already-transparent pixels, so interior
   checkerboard patches are reachable), despeckles the leftovers, strips the
   baked-in label chips, and splits the icon sheets on the grid implied by
   their saturated pixels.

Three source files are deliberately not used:

- `02_hospital_building.png` — the crop is mostly the appointment-form mockup,
  so the clinic photo is cropped straight from the collage instead.
- `10_doctor_full_figure.png` — the doctor keys cleanly but the blue blobs
  behind him tear into a ragged silhouette that shows badly on the dark
  sections.
- `13_social_media_icons.png` and `12_payment_trust_marks.png` — ~30 px brand
  marks. These are redrawn as inline SVG and CSS so they stay crisp.

The decorative sparkles and crosses in `14_misc_medical_decor.png` were too
checkerboard-contaminated to rescue and are rebuilt in CSS and Three.js.

Re-run the pipeline with:

```bash
python3 scripts/clean-assets.py   # needs Pillow and numpy
```

## What is mocked

Appointment booking, consultation slots, the medicine store, the cart,
checkout and payment all run on local state and the dummy data in `src/data`.
Submitting the booking form waits ~850 ms and then opens a confirmation with a
deterministic reference number; paying waits ~1.1 s and then confirms. The
booking form surfaces a genuine error state when the browser reports it is
offline. The video-call panel is an interface mockup — its mic and camera
buttons toggle, but there is no media stack behind it.
