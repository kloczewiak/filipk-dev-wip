"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import PetTarget from "./pet/PetTarget";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="py-32 px-6 max-w-4xl mx-auto" ref={ref}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-12"
          variants={itemVariants}
        >
          <PetTarget className="inline-block">
            <span className="text-accent">{"// "}</span>
            about me
          </PetTarget>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div className="space-y-6" variants={itemVariants}>
            <p className="text-lg text-muted leading-relaxed">
              I&apos;m a developer who enjoys building things for the web. I
              care about clean code, smooth interactions, and making things that
              feel good to use.
            </p>
            <p className="text-lg text-muted leading-relaxed">
              When I&apos;m not coding, you can probably find me tinkering with
              some new tech or working on side projects that may or may not see
              the light of day.
            </p>
          </motion.div>

          <motion.div className="space-y-4" variants={itemVariants}>
            <h3 className="text-xl font-bold text-accent mb-4">tech I like</h3>
            {[
              "TypeScript / JavaScript",
              "React / Next.js",
              "Node.js",
              "Tailwind CSS",
              "Framer Motion",
            ].map((tech, i) => (
              <motion.div
                key={tech}
                className="flex items-center gap-3 group"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              >
                <motion.span
                  className="w-2 h-2 rounded-full bg-accent"
                  whileHover={{ scale: 2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                />
                <span className="text-muted group-hover:text-foreground transition-colors font-mono text-sm">
                  {tech}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
