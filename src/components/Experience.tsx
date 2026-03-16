"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  type MotionValue,
} from "motion/react";
import { useRef, type RefObject } from "react";
import PetTarget from "./pet/PetTarget";

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string;
  tags: string[];
  type: "professional" | "project" | "other";
}

const experiences: ExperienceItem[] = [
  {
    title: "Software Developer",
    company: "Your Company",
    period: "2024 — Present",
    description:
      "Working on building and maintaining web applications. Contributing to frontend and backend systems.",
    tags: ["TypeScript", "React", "Node.js"],
    type: "professional",
  },
  {
    title: "Personal Project",
    company: "Portfolio Website",
    period: "2024",
    description:
      "Designed and built this portfolio site with fancy scroll animations and a love for orange.",
    tags: ["Next.js", "Framer Motion", "Tailwind"],
    type: "project",
  },
  {
    title: "Freelance / Side Work",
    company: "Various",
    period: "2023",
    description:
      "Took on freelance projects and contributed to open source. Built tools and small apps.",
    tags: ["Web Dev", "Open Source"],
    type: "other",
  },
];

/** The dot is positioned at `top: 0.5rem` (8px) inside each card wrapper. */
const DOT_OFFSET = 8;

function ExperienceCard({
  item,
  index,
  scrollYProgress,
  containerRef,
}: {
  item: ExperienceItem;
  index: number;
  scrollYProgress: MotionValue<number>;
  containerRef: RefObject<HTMLDivElement | null>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-100px 0px" });

  // Compute threshold dynamically: dot's pixel offset / container height
  const getThreshold = () => {
    const container = containerRef.current;
    const card = ref.current;
    if (!container || !card) return 0;
    const dotTop = card.offsetTop + DOT_OFFSET;
    return dotTop / container.offsetHeight;
  };

  const dotBorder = useTransform(scrollYProgress, (v) =>
    v >= getThreshold() ? "var(--color-accent)" : "var(--color-card-border)",
  );
  const dotBg = useTransform(scrollYProgress, (v) =>
    v >= getThreshold() ? "var(--color-accent)" : "var(--color-background)",
  );
  const dotScaleRaw = useTransform(scrollYProgress, (v) =>
    v >= getThreshold() ? 1.3 : 0.8,
  );
  const dotScale = useSpring(dotScaleRaw, { stiffness: 400, damping: 15, mass: 0.5 });

  const glowOpacityRaw = useTransform(scrollYProgress, (v) =>
    v >= getThreshold() ? 0.3 : 0,
  );
  const glowOpacity = useSpring(glowOpacityRaw, { stiffness: 300, damping: 20 });

  return (
    <motion.div
      ref={ref}
      className="relative pl-8 md:pl-12 pb-16 last:pb-0"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Timeline dot */}
      <motion.div
        className="absolute left-0 top-2 w-4 h-4 rounded-full border-2 z-10"
        style={{
          borderColor: dotBorder,
          backgroundColor: dotBg,
          scale: dotScale,
        }}
      />

      {/* Animated glow behind the dot */}
      <motion.div
        className="absolute left-[-4px] top-0 w-6 h-6 rounded-full bg-accent/30 blur-sm z-0"
        style={{ opacity: glowOpacity }}
        transition={{ duration: 0.4 }}
      />

      {/* Card */}
      <motion.div
        className="bg-card-bg border border-card-border rounded-xl p-6 hover:border-accent/40 transition-colors"
        initial={{ x: 60, opacity: 0, filter: "blur(8px)" }}
        animate={
          isInView
            ? { x: 0, opacity: 1, filter: "blur(0px)" }
            : { x: 60, opacity: 0, filter: "blur(8px)" }
        }
        transition={{ duration: 0.6, delay: index * 0.1 }}
        whileHover={{
          y: -4,
          boxShadow: "0 8px 30px rgba(247, 127, 67, 0.1)",
          transition: { duration: 0.3 },
        }}
      >
        {/* Type badge */}
        <motion.span
          className="inline-block text-xs font-mono px-2 py-1 rounded-full mb-3 border"
          style={{
            borderColor: "var(--color-accent)",
            color: "var(--color-accent)",
            backgroundColor: "rgba(247, 127, 67, 0.1)",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
          }
          transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
        >
          {item.type === "professional"
            ? "professional"
            : item.type === "project"
              ? "project"
              : "experience"}
        </motion.span>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
          <PetTarget className="inline-block">
            <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
          </PetTarget>
          <span className="text-sm font-mono text-muted">{item.period}</span>
        </div>

        <p className="text-accent font-medium mb-3">{item.company}</p>
        <p className="text-muted leading-relaxed mb-4">{item.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag, i) => (
            <motion.span
              key={tag}
              className="text-xs font-mono px-3 py-1 rounded-full bg-background border border-card-border text-muted"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-32 px-6 max-w-3xl mx-auto">
      {/* Section heading */}
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <PetTarget className="inline-block">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-accent">{"{ "}</span>
            experience
            <span className="text-accent">{" }"}</span>
          </h2>
        </PetTarget>
        <p className="text-muted text-lg">what I&apos;ve been up to</p>
      </motion.div>

      {/* Timeline */}
      <div className="relative" ref={containerRef}>
        {/* Animated timeline line */}
        <div className="absolute left-[7px] top-0 bottom-0 w-[2px] bg-card-border">
          <motion.div
            className="w-full bg-accent origin-top"
            style={{ height: lineHeight }}
          />
        </div>

        {experiences.map((item, index) => (
          <ExperienceCard
            key={index}
            item={item}
            index={index}
            scrollYProgress={scrollYProgress}
            containerRef={containerRef}
          />
        ))}
      </div>
    </section>
  );
}
