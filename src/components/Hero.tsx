"use client";

import { motion } from "motion/react";
import PetTarget from "./pet/PetTarget";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background gradient orbs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-[120px]"
        style={{ background: "var(--color-accent)" }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 0.2,
          x: [0, 100, -50, 0],
          y: [0, -80, 60, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          opacity: { duration: 4 },
          x: { duration: 15, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 15, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 15, repeat: Infinity, ease: "easeInOut" },
        }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full blur-[100px] -right-20 top-20"
        style={{ background: "var(--color-accent-light)" }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 0.1,
          x: [0, -60, 40, 0],
          y: [0, 50, -70, 0],
          scale: [1, 0.8, 1.1, 1],
        }}
        transition={{
          opacity: { duration: 4, delay: 0.6 },
          x: { duration: 12, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 12, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 12, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      <div className="relative z-10 text-center px-6">
        {/* Greeting line */}
        <motion.p
          className="text-accent font-mono text-lg mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
        >
          hey, I&apos;m
        </motion.p>

        {/* Name */}
        <PetTarget className="inline-block">
          <motion.h1
            className="text-6xl md:text-8xl font-bold tracking-tight mb-6"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.9, ease: "easeOut" }}
          >
            <span className="text-foreground">Filip </span>
            <motion.span
              className="text-accent inline-block"
              animate={{ rotate: [0, -2, 2, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              K.
            </motion.span>
          </motion.h1>
        </PetTarget>

        {/* Tagline */}
        <motion.p
          className="text-xl md:text-2xl text-muted max-w-xl mx-auto mb-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 1.4, ease: "easeOut" }}
        >
          in the process of building this&nbsp;website
        </motion.p>
      </div>
    </section>
  );
}
