"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function VideoHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    const title = titleRef.current;
    const tagline = taglineRef.current;

    if (!container || !video || !title || !tagline) return;

    let ctx = gsap.context(() => {
      // Wait for video metadata to load
      const onLoaded = () => {
        const duration = video.duration;

        // Scrub video with scroll
        ScrollTrigger.create({
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          pin: false,
          onUpdate: (self) => {
            if (video.duration) {
              video.currentTime = self.progress * video.duration;
            }
          },
        });

        // Pin the video viewport
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
      };

      if (video.readyState >= 1) {
        onLoaded();
      } else {
        video.addEventListener("loadedmetadata", onLoaded);
      }
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-[300vh]">
      <div className="video-pin-target sticky top-0 min-h-[100dvh] w-full overflow-hidden">
        <video
          ref={videoRef}
          src="/video/drone-entrance.mp4"
          preload="auto"
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
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
