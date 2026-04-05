"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// IMPORTANT: Update this to match the actual number of extracted frames.
// Run: ls public/images/hero-frames/ | wc -l
const FRAME_COUNT = 91;

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
    const container = containerRef.current;
    const canvas = canvasRef.current;
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
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

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
