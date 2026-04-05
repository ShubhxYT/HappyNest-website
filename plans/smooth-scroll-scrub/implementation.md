# Smooth Scroll-Scrub Video → Image Sequence + Canvas

## Goal
Replace the laggy `video.currentTime` scroll-scrubbing in VideoHero with an Apple-style image-sequence + canvas approach, eliminating the H.264 keyframe-seeking bottleneck for buttery-smooth frame-by-frame scroll animation.

## Prerequisites
Make sure you are currently on the `blanc-belle-landing` branch before beginning implementation.
If not, move to the correct branch. If the branch does not exist, create it from main.

---

### Step-by-Step Instructions

---

#### Step 1: Install ffmpeg & Extract Frames

- [x] Check if ffmpeg is installed:

```bash
which ffmpeg
```

- [x] If not installed, install via Homebrew:

```bash
brew install ffmpeg
```

- [x] Create the hero-frames directory:

```bash
mkdir -p public/images/hero-frames
```

- [x] Extract ~150 WebP frames from the drone video at 30fps:

```bash
ffmpeg -i public/video/drone-entrance.mp4 -vf "fps=30,scale=1920:-1" -quality 80 public/images/hero-frames/frame-%04d.webp
```

- [x] Verify frame count and total size:

```bash
ls public/images/hero-frames/ | wc -l
du -sh public/images/hero-frames/
```

- [x] If total size exceeds 6MB, re-extract at lower fps (90 frames is still smooth at 300vh scroll distance):

```bash
rm public/images/hero-frames/*
ffmpeg -i public/video/drone-entrance.mp4 -vf "fps=18,scale=1920:-1" -quality 75 public/images/hero-frames/frame-%04d.webp
```

##### Step 1 Verification Checklist
- [x] `public/images/hero-frames/` contains 90–150 sequentially numbered WebP files
- [x] Total directory size is under 6MB
- [x] `frame-0001.webp` opens correctly and shows the first frame of the drone video

#### Step 1 STOP & COMMIT
**STOP & COMMIT:** Agent must stop here and wait for the user to test, stage, and commit the change.

---

#### Step 2: Rewrite VideoHero with Canvas + Image Sequence

- [ ] Replace the entire contents of `components/VideoHero.tsx` with:

```tsx
"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// IMPORTANT: Update this to match the actual number of extracted frames.
// Run: ls public/images/hero-frames/ | wc -l
const FRAME_COUNT = 150;

function getFramePath(index: number): string {
  const num = String(index + 1).padStart(4, "0");
  return `/images/hero-frames/frame-${num}.webp`;
}

export default function VideoHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const [loaded, setLoaded] = useState(false);

  // Draw a specific frame onto the canvas with "object-fit: cover" behavior
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = imagesRef.current[frameIndex];
    if (!canvas || !ctx || !img || !img.complete) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    // "cover" logic: scale image to fill canvas, crop overflow
    const scale = Math.max(cw / iw, ch / ih);
    const sw = cw / scale;
    const sh = ch / scale;
    const sx = (iw - sw) / 2;
    const sy = (ih - sh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
  }, []);

  // Resize canvas to match viewport (retina-aware)
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const title = titleRef.current;
    const tagline = taglineRef.current;
    if (!canvas || !container || !title || !tagline) return;

    // --- Preload all frame images ---
    let loadedCount = 0;
    const images: HTMLImageElement[] = new Array(FRAME_COUNT);

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedCount++;
        // Draw first frame as soon as it loads
        if (i === 0) {
          handleResize();
          drawFrame(0);
        }
        if (loadedCount === FRAME_COUNT) {
          setLoaded(true);
        }
      };
      images[i] = img;
    }
    imagesRef.current = images;

    // --- Resize handler ---
    window.addEventListener("resize", handleResize);
    handleResize();

    // --- GSAP context ---
    const ctx = gsap.context(() => {
      // Scrub frames with scroll
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const frameIndex = Math.min(
            FRAME_COUNT - 1,
            Math.floor(self.progress * FRAME_COUNT)
          );

          if (frameIndex !== currentFrameRef.current) {
            currentFrameRef.current = frameIndex;

            // Debounce draws with rAF for maximum smoothness
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(() => {
              drawFrame(frameIndex);
            });
          }
        },
      });

      // Pin the canvas viewport
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        pin: ".video-pin-target",
        pinSpacing: false,
      });

      // Fade out title
      gsap.to(title, {
        opacity: 0,
        y: -40,
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "20% top",
          scrub: true,
        },
      });

      // Fade in tagline
      gsap.fromTo(
        tagline,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: container,
            start: "15% top",
            end: "35% top",
            scrub: true,
          },
        }
      );

      // Fade out tagline
      gsap.to(tagline, {
        opacity: 0,
        scrollTrigger: {
          trigger: container,
          start: "60% top",
          end: "80% top",
          scrub: true,
        },
      });
    }, container);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", handleResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [drawFrame, handleResize]);

  return (
    <section ref={containerRef} className="relative h-[300vh]">
      <div className="video-pin-target min-h-[100dvh] w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-stone-950/30" />

        {/* Title */}
        <div
          ref={titleRef}
          className="absolute inset-0 flex flex-col justify-end pb-24 md:pb-32 px-6 md:px-16 lg:px-24"
        >
          <p className="font-satoshi text-sm md:text-base uppercase tracking-[0.3em] text-cream/70 mb-3">
            A Luxury Farm Stay
          </p>
          <h1 className="font-outfit text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.9] text-cream font-bold">
            HappyNest
          </h1>
          <h2 className="font-outfit text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tighter leading-[0.9] text-gold-light font-light mt-2">
            Blanc Belle
          </h2>
        </div>

        {/* Tagline */}
        <div
          ref={taglineRef}
          className="absolute inset-0 flex items-center justify-center opacity-0"
        >
          <p className="font-outfit text-2xl md:text-4xl lg:text-5xl tracking-tight text-cream text-center max-w-[65ch] px-6 font-light">
            Nestled in the serene embrace of Sohna
          </p>
        </div>
      </div>
    </section>
  );
}
```

> **IMPORTANT:** After extracting frames, update `FRAME_COUNT` at the top of the file to match the actual number of frames extracted. Run `ls public/images/hero-frames/ | wc -l` to get the count.

##### Step 2 Verification Checklist
- [ ] `npm run dev` starts without errors
- [ ] First frame appears on page load (no blank canvas)
- [ ] Scrolling through the hero section shows smooth frame-by-frame animation
- [ ] Title fades out in the first 20% of scroll
- [ ] Tagline fades in at 15-35% and fades out at 60-80%
- [ ] No visible frame gaps or jumps during fast scrolling
- [ ] Canvas covers the full viewport without distortion

#### Step 2 STOP & COMMIT
**STOP & COMMIT:** Agent must stop here and wait for the user to test, stage, and commit the change.

---

#### Step 3: Fix CSS Conflicts

- [ ] In `app/globals.css`, remove the `scroll-behavior: smooth` line. Replace the `@layer base` block with:

```css
@layer base {
  body {
    font-family: var(--font-satoshi);
    background-color: var(--color-cream);
    color: var(--color-stone-950);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ::selection {
    background-color: var(--color-gold);
    color: var(--color-white);
  }
}
```

> **Why:** `scroll-behavior: smooth` on `html` causes the browser to interpolate scroll position, which creates a mismatch between the browser's scroll position and GSAP ScrollTrigger's tracking. This introduces input lag and inconsistent frame timing during scroll-scrubbing.

##### Step 3 Verification Checklist
- [ ] No build errors
- [ ] Scroll-scrubbing feels immediately responsive (no input lag)
- [ ] Other scroll-based animations (About, Spaces, etc.) still work correctly
- [ ] Clicking anchor links still scrolls to the right place (verify Navbar links if any)

#### Step 3 STOP & COMMIT
**STOP & COMMIT:** Agent must stop here and wait for the user to test, stage, and commit the change.

---

#### Step 4: Add `.gitignore` Entry for Source Video (Optional)

- [ ] The original `public/video/drone-entrance.mp4` (15MB) can be kept as a source asset or removed to reduce deploy size. If keeping it for future re-extraction but want to exclude from deploys, add to `.gitignore`:

```
# Source video (frames extracted to public/images/hero-frames/)
# public/video/drone-entrance.mp4
```

> **Decision point:** If you want to remove the video entirely to save 15MB from the repo, run:
> ```bash
> rm public/video/drone-entrance.mp4
> rmdir public/video
> ```
> Only do this after verifying the canvas approach works perfectly.

##### Step 4 Verification Checklist
- [ ] `npm run build` completes successfully
- [ ] No references to `/video/drone-entrance.mp4` remain in the codebase (it was only in VideoHero.tsx which has been rewritten)

#### Step 4 STOP & COMMIT
**STOP & COMMIT:** Agent must stop here and wait for the user to test, stage, and commit the change.
