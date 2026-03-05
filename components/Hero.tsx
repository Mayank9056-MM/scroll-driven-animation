"use client";

import React, { useEffect, useRef, useCallback } from "react";
import CarScene from "./CarScene";

const NUM_STEPS = 4;
const CAR_TRAVEL_RATIO = 0.9;

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const greenBandRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const stat1Ref = useRef<HTMLDivElement>(null);
  const stat2Ref = useRef<HTMLDivElement>(null);
  const stat3Ref = useRef<HTMLDivElement>(null);
  const stat4Ref = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  const progressRef = useRef<number>(0);
  const gsapRef = useRef<any>(null);

  const initPositions = useCallback(() => {
    const container = containerRef.current;
    const car = carRef.current;
    if (!container || !car || !gsapRef.current) return;
    const gsap = gsapRef.current;
    const carW = car.offsetWidth;

    gsap.set(car, { x: -carW, y: 0 });
    gsap.set(greenBandRef.current, {
      scaleX: 0,
      transformOrigin: "left center",
    });
    gsap.set(textRef.current, { x: -60, opacity: 0 });
    gsap.set(
      [stat1Ref.current, stat2Ref.current, stat3Ref.current, stat4Ref.current],
      { opacity: 0, y: 24, scale: 0.9 },
    );
  }, []);

  const animateToStep = useCallback((step: number) => {
    const container = containerRef.current;
    const car = carRef.current;
    const gsap = gsapRef.current;
    if (!container || !car || !gsap) return;

    const W = container.offsetWidth;
    const carW = car.offsetWidth;
    const travelDistance = W * CAR_TRAVEL_RATIO;
    const stepSize = travelDistance / NUM_STEPS;
    const targetX = -carW + step * stepSize;

    const ease = "power3.out";
    const dur = 0.85;

    gsap.to(car, { x: targetX, duration: dur, ease });

    gsap.to(greenBandRef.current, {
      scaleX: step / NUM_STEPS,
      duration: dur,
      ease,
    });

    gsap.to(textRef.current, {
      x: 0,
      opacity: step >= 1 ? 1 : 0,
      duration: dur,
      ease,
    });

    const stats = [
      { ref: stat1Ref, threshold: 1 },
      { ref: stat2Ref, threshold: 2 },
      { ref: stat3Ref, threshold: 3 },
      { ref: stat4Ref, threshold: 4 },
    ];

    stats.forEach(({ ref, threshold }, i) => {
      const show = step >= threshold;
      gsap.to(ref.current, {
        opacity: show ? 1 : 0,
        y: show ? 0 : 24,
        scale: show ? 1 : 0.9,
        duration: 0.55,
        ease: show ? "back.out(1.6)" : "power2.in",
        delay: show ? i * 0.06 : 0,
      });
    });

    if (step > 0) gsap.to(hintRef.current, { opacity: 0, duration: 0.35 });
  }, []);

  const advance = useCallback(() => {
    if (!gsapRef.current || progressRef.current >= NUM_STEPS) return;
    progressRef.current += 1;
    animateToStep(progressRef.current);
  }, [animateToStep]);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    const init = async () => {
      const gsapMod = await import("gsap");
      const gsap = gsapMod.default || (gsapMod as any).gsap;
      gsapRef.current = gsap;

      requestAnimationFrame(() => {
        initPositions();
        gsap.fromTo(
          hintRef.current,
          { opacity: 0 },
          {
            opacity: 0.7,
            repeat: -1,
            yoyo: true,
            duration: 1.1,
            ease: "sine.inOut",
          },
        );
      });

      let lastTime = 0;
      const onWheel = () => {
        const now = Date.now();
        if (now - lastTime < 750) return;
        lastTime = now;
        advance();
      };

      const onKey = (e: KeyboardEvent) => {
        if (e.code === "Space" || e.code === "Enter") {
          e.preventDefault();
          advance();
        }
      };

      window.addEventListener("wheel", onWheel, { passive: true });
      window.addEventListener("keydown", onKey);

      cleanup = () => {
        window.removeEventListener("wheel", onWheel);
        window.removeEventListener("keydown", onKey);
      };
    };

    init();
    return () => cleanup?.();
  }, [advance, initPositions]);

  useEffect(() => {
    const onResize = () => {
      initPositions();
      animateToStep(progressRef.current);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [initPositions, animateToStep]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden select-none"
      style={{ height: "100vh", minHeight: 500, backgroundColor: "#d0d0d0" }}
    >
      {/* BLACK ROAD */}
      <div
        className="absolute left-0 right-0"
        style={{
          top: "50%",
          transform: "translateY(-50%)",
          height: "32%",
          backgroundColor: "#1a1a1a",
          zIndex: 1,
        }}
      />

      {/* GREEN REVEAL BAND */}
      <div
        ref={greenBandRef}
        className="absolute left-0"
        style={{
          top: "50%",
          transform: "translateY(-50%)",
          height: "32%",
          width: "100%",
          backgroundColor: "#5ce65c",
          zIndex: 2,
          transformOrigin: "left center",
        }}
      />

      {/* WELCOME ITZFIZZ TEXT */}
      <div
        ref={textRef}
        className="absolute left-0 w-full flex items-center pointer-events-none"
        style={{
          top: "50%",
          transform: "translateY(-50%)",
          height: "32%",
          zIndex: 3,
          opacity: 0,
        }}
      >
        <span
          className="font-black leading-none pl-8 md:pl-12 whitespace-nowrap"
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(2.6rem, 8vw, 8rem)",
            color: "#0a0a0a",
            letterSpacing: "0.01em",
          }}
        >
          WELCOME ITZFIZZ
        </span>
      </div>

      {/* TOP STAT CARDS */}
      <div
        className="absolute z-20 flex gap-3"
        style={{ top: "8%", left: "46%" }}
      >
        <div
          ref={stat1Ref}
          className="rounded-xl p-8 flex flex-col items-center text-center justify-center"
          style={{
            backgroundColor: "#d4f542",
            minWidth: 250,
            opacity: 0,
            minHeight: 150,
          }}
        >
          <div
            className="text-5xl font-bold leading-none mb-1"
            style={{ fontFamily: "Inter, sans-serif", color: "#111" }}
          >
            58%
          </div>
          <div className="text-sm font-medium" style={{ color: "#333" }}>
            Increase in pick up point use
          </div>
        </div>

        <div
          ref={stat2Ref}
          className="rounded-xl p-8 flex flex-col items-center text-center justify-center"
          style={{ backgroundColor: "#2a2a2a", minWidth: 185, opacity: 0 }}
        >
          <div
            className="text-5xl font-bold leading-none mb-1"
            style={{ fontFamily: "Inter, sans-serif", color: "#fff" }}
          >
            27%
          </div>
          <div className="text-sm font-medium" style={{ color: "#aaa" }}>
            Increase in pick up point use
          </div>
        </div>
      </div>

      {/* BOTTOM STAT CARDS */}
      <div
        className="absolute z-20 flex gap-3"
        style={{ bottom: "8%", left: "46%" }}
      >
        <div
          ref={stat3Ref}
          className="rounded-xl p-8 flex flex-col items-center text-center justify-center"
          style={{
            backgroundColor: "#a8d8f0",
            minWidth: 250,
            opacity: 0,
            minHeight: 150,
          }}
        >
          <div
            className="text-5xl font-bold leading-none mb-1"
            style={{ fontFamily: "Inter, sans-serif", color: "#111" }}
          >
            23%
          </div>
          <div className="text-sm font-medium" style={{ color: "#333" }}>
            Decreased in customer phone calls
          </div>
        </div>

        <div
          ref={stat4Ref}
          className="rounded-xl p-8 flex flex-col items-center text-center justify-center"
          style={{
            backgroundColor: "#f5a442",
            minWidth: 250,
            opacity: 0,
            minHeight: 150,
          }}
        >
          <div
            className="text-5xl font-bold leading-none mb-1"
            style={{ fontFamily: "Inter, sans-serif", color: "#111" }}
          >
            40%
          </div>
          <div className="text-sm font-medium" style={{ color: "#333" }}>
            Decreased in customer phone calls
          </div>
        </div>
      </div>

      {/* CAR */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          transform: "translateY(-50%)",
          width: "32%",
          zIndex: 10,
        }}
      >
        <CarScene ref={carRef} className="w-full" />
      </div>

      {/* HINT */}
      <div
        ref={hintRef}
        className="absolute bottom-7 left-1/2 flex flex-col items-center gap-2 z-30 pointer-events-none"
        style={{ transform: "translateX(-50%)" }}
      >
        <span
          className="text-xs tracking-widest uppercase"
          style={{ color: "#555", fontFamily: "Inter, sans-serif" }}
        >
          Scroll · Space · Enter
        </span>
        <div style={{ width: 1, height: 32, backgroundColor: "#888" }} />
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M7 1v10M3 8l4 4 4-4"
            stroke="#666"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default Hero;
