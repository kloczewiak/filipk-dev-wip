"use client";

import { motion, useMotionValue, useSpring, animate } from "motion/react";
import { useEffect, useRef } from "react";
import { usePetContext } from "./PetContext";

const PET_SIZE = 14;
const ORBIT_SPEED = 1.2; //1.8;
const ORBIT_PADDING_X = 20;
const ORBIT_PADDING_Y = 12;

export default function Pet() {
  const { getTargets } = usePetContext();

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const springX = useSpring(x, { damping: 20, stiffness: 120, mass: 0.8 });
  const springY = useSpring(y, { damping: 20, stiffness: 120, mass: 0.8 });

  const scale = useMotionValue(1);
  const springScale = useSpring(scale, { damping: 15, stiffness: 300 });

  const activeTarget = useRef<HTMLElement | null>(null);
  const orbitAngle = useRef(0);
  const frame = useRef(0);

  // Find which target is closest to vertical center of the viewport
  const findActiveTarget = (): HTMLElement | null => {
    const targets = getTargets();
    if (targets.size === 0) return null;

    const viewportCenter = window.innerHeight / 2;

    const best = targets
      .values()
      .reduce<{ el: HTMLElement; dist: number } | null>((acc, el) => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -100 || rect.top > window.innerHeight + 100)
          return acc;
        const dist = Math.abs(rect.top + rect.height / 2 - viewportCenter);
        return !acc || dist < acc.dist ? { el, dist } : acc;
      }, null);

    return best ? best.el : null;
  };

  useEffect(() => {
    let prevTarget: HTMLElement | null = null;

    const tick = () => {
      const target = findActiveTarget();

      if (target !== prevTarget && target) {
        prevTarget = target;
        activeTarget.current = target;
        // Pop animation when switching targets
        animate(scale, [1, 1.8, 1], { duration: 0.4 });
      }

      if (activeTarget.current) {
        const rect = activeTarget.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const radiusX = rect.width / 2 + ORBIT_PADDING_X;
        const radiusY = rect.height / 2 + ORBIT_PADDING_Y;

        orbitAngle.current += ORBIT_SPEED * (1 / 60);

        const orbitX =
          centerX + Math.cos(orbitAngle.current) * radiusX - PET_SIZE / 2;
        const orbitY =
          centerY + Math.sin(orbitAngle.current) * radiusY - PET_SIZE / 2;

        x.set(orbitX);
        y.set(orbitY);
      }

      frame.current = requestAnimationFrame(tick);
    };

    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-9999 mix-blend-screen"
      style={{ x: springX, y: springY }}
    >
      {/* Outer glow */}
      <motion.div
        className="absolute rounded-full bg-accent/20 blur-md"
        style={{
          width: PET_SIZE * 2.5,
          height: PET_SIZE * 2.5,
          top: -PET_SIZE * 0.75,
          left: -PET_SIZE * 0.75,
          scale: springScale,
        }}
      />
      {/* Core */}
      <motion.div
        className="rounded-full bg-accent"
        style={{
          width: PET_SIZE,
          height: PET_SIZE,
          scale: springScale,
        }}
      />
      {/* Inner bright spot */}
      <motion.div
        className="absolute rounded-full bg-accent-light"
        style={{
          width: PET_SIZE * 0.4,
          height: PET_SIZE * 0.4,
          top: PET_SIZE * 0.15,
          left: PET_SIZE * 0.15,
          scale: springScale,
        }}
      />
    </motion.div>
  );
}
