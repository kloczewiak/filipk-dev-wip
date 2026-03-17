"use client";

import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  type MotionValue,
  stagger,
} from "motion/react";
import { useRef, useState, useEffect, type RefObject } from "react";
import PetTarget from "./pet/PetTarget";
import { usePetContext, type PetTargetType } from "./pet/PetContext";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { Badge } from "./ui/badge";
import { Card, CardHeader, CardContent, CardFooter } from "./ui/card";

const MotionCard = motion.create(Card);

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string;
  tags: string[];
  type: "professional" | "project" | "other";
  details?: string[];
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
    details: [
      "Building and maintaining web applications used by thousands of users daily.",
      "Contributing to both frontend and backend systems with a focus on performance.",
      "Collaborating with cross-functional teams to deliver features on tight deadlines.",
    ],
  },
  {
    title: "Personal Project",
    company: "Portfolio Website",
    period: "2024",
    description:
      "Designed and built this portfolio site with fancy scroll animations and a love for orange.",
    tags: ["Next.js", "Framer Motion", "Tailwind"],
    type: "project",
    details: [
      "Custom scroll-driven timeline with animated dots and a line that follows your progress.",
      "A pet character that follows you around the page and reacts to what you're looking at.",
      "Fully responsive design with smooth animations powered by Framer Motion.",
    ],
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
  isLatestActive,
  onActivate,
  onDeactivate,
  targetType,
  onOpen,
}: {
  item: ExperienceItem;
  index: number;
  scrollYProgress: MotionValue<number>;
  containerRef: RefObject<HTMLDivElement | null>;
  isLatestActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
  targetType: PetTargetType;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Compute threshold dynamically: dot's pixel offset / container height
  const getThreshold = () => {
    const container = containerRef.current;
    const card = ref.current;
    if (!container || !card) return Infinity;
    const dotTop = card.offsetTop + DOT_OFFSET;
    return dotTop / container.offsetHeight;
  };

  const dotIsLit = useTransform(scrollYProgress, (v) => v >= getThreshold());

  useMotionValueEvent(dotIsLit, "change", (lit) => {
    if (lit) onActivate();
    else onDeactivate();
  });

  const dotBorder = useTransform(dotIsLit, (lit) =>
    lit ? "var(--color-accent)" : "var(--color-card-border)",
  );
  const dotBg = useTransform(dotIsLit, (lit) =>
    lit ? "var(--color-accent)" : "var(--color-background)",
  );
  const dotScaleRaw = useTransform(
    dotIsLit,
    (lit) => (lit ? 1.3 : 0.8) as number,
  );
  const dotScale = useSpring(dotScaleRaw, {
    stiffness: 400,
    damping: 15,
    mass: 0.5,
  });

  const glowOpacityRaw = useTransform(
    dotIsLit,
    (lit) => (lit ? 0.3 : 0) as number,
  );
  const glowOpacity = useSpring(glowOpacityRaw, {
    stiffness: 300,
    damping: 20,
  });

  return (
    <motion.div
      ref={ref}
      className="relative pl-8 md:pl-12 pb-16 last:pb-0"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px 0px" }}
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
        initial={{ x: 60, opacity: 0, filter: "blur(8px)" }}
        whileInView={{ x: 0, opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-100px 0px" }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
      >
        <MotionCard
          className="hover:border-accent/40 transition-colors cursor-pointer"
          onClick={onOpen}
          whileHover={{
            y: -4,
            boxShadow: "0 8px 30px rgba(247, 127, 67, 0.1)",
            transition: { duration: 0.3 },
          }}
          layoutId={`card-${index}`}
        >
          <CardHeader>
            <motion.div layoutId={`badge-${index}`} className="w-fit">
              <Badge>{item.type === "other" ? "experience" : item.type}</Badge>
            </motion.div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
              <PetTarget
                className="inline-block"
                active={isLatestActive}
                type={targetType}
              >
                <motion.h3
                  layoutId={`title-${index}`}
                  className="text-xl font-bold text-foreground"
                >
                  {item.title}
                </motion.h3>
              </PetTarget>
              <motion.span
                layoutId={`period-${index}`}
                className="text-sm font-mono text-muted-foreground"
              >
                {item.period}
              </motion.span>
            </div>
            <motion.p
              layoutId={`company-${index}`}
              className="text-primary font-medium w-fit"
            >
              {item.company}
            </motion.p>
          </CardHeader>
          <CardContent>
            <motion.p
              layoutId={`description-${index}`}
              className="text-muted-foreground leading-relaxed"
            >
              {item.description}
            </motion.p>
          </CardContent>
          <CardFooter className="flex-wrap gap-2">
            {item.tags.map((tag) => (
              <motion.div key={tag} layoutId={`tag-${index}-${tag}`}>
                <Badge variant="dark" className="px-3">
                  {tag}
                </Badge>
              </motion.div>
            ))}
          </CardFooter>
        </MotionCard>
      </motion.div>
    </motion.div>
  );
}

function ExperienceModal({
  item,
  index,
  onClose,
}: {
  item: ExperienceItem;
  index: number;
  onClose: () => void;
}) {
  const setLock = useLockBodyScroll();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    setLock(true);
    return () => {
      document.removeEventListener("keydown", handleKey);
      setLock(false);
    };
  }, [onClose, setLock]);

  return (
    <>
      <motion.div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-6"
        onClick={onClose}
      >
        <MotionCard
          className="max-w-lg w-full max-h-[80vh] overflow-y-auto"
          layoutId={`card-${index}`}
          exit={{ opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <CardHeader>
            <motion.div layoutId={`badge-${index}`} className="w-fit">
              <Badge>{item.type === "other" ? "experience" : item.type}</Badge>
            </motion.div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
              <PetTarget active={true}>
                <motion.h3
                  layoutId={`title-${index}`}
                  className="text-xl font-bold text-foreground"
                >
                  {item.title}
                </motion.h3>
              </PetTarget>
              <motion.span
                layoutId={`period-${index}`}
                className="text-sm font-mono text-muted-foreground"
              >
                {item.period}
              </motion.span>
            </div>
            <motion.p
              layoutId={`company-${index}`}
              className="text-primary font-medium w-fit"
            >
              {item.company}
            </motion.p>
          </CardHeader>
          <CardContent className="space-y-4">
            <motion.p
              layoutId={`description-${index}`}
              className="text-muted-foreground leading-relaxed"
            >
              {item.description}
            </motion.p>

            {/* Extended details */}
            {item.details && (
              <motion.ul
                className="space-y-3"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  visible: {
                    transition: {
                      delayChildren: stagger(0.08, { startDelay: 0.23 }),
                    },
                  },
                  hidden: {
                    transition: {
                      delayChildren: stagger(0.04, { from: "last" }),
                    },
                  },
                }}
              >
                {item.details.map((detail, i) => (
                  <motion.li
                    key={i}
                    className="flex gap-3 text-muted-foreground leading-relaxed"
                    variants={{
                      hidden: { opacity: 0, x: -10 },
                      visible: { opacity: 1, x: 0 },
                    }}
                  >
                    <span className="text-primary mt-1 shrink-0">▸</span>
                    {detail}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </CardContent>
          <CardFooter className="flex-col gap-4 items-start">
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <motion.div key={tag} layoutId={`tag-${index}-${tag}`}>
                  <Badge variant="dark" className="px-3">
                    {tag}
                  </Badge>
                </motion.div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground/50 w-full text-center font-mono">
              esc or click outside to close
            </p>
          </CardFooter>
        </MotionCard>
      </div>
    </>
  );
}

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [latestActiveIndex, setLatestActiveIndex] = useState(-1);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { setActiveId } = usePetContext();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const prevProgress = useRef(0);

  // Clear active pet target at boundaries
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const wasAtEnd = prevProgress.current >= 1;

    if (v <= 0) {
      setLatestActiveIndex(-1);
      setActiveId(null);
    } else if (v >= 1) {
      // Line fully done — last card becomes passive so pet transitions smoothly
      setLatestActiveIndex(-1);
      setActiveId(null);
    } else if (wasAtEnd) {
      setLatestActiveIndex(experiences.length - 1);
    }

    prevProgress.current = v;
  });

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
            isLatestActive={latestActiveIndex === index && openIndex === null}
            onActivate={() => setLatestActiveIndex(index)}
            onDeactivate={() =>
              setLatestActiveIndex((prev) =>
                prev === index ? index - 1 : prev,
              )
            }
            targetType={
              index === experiences.length - 1 ? "passive" : "active-only"
            }
            onOpen={() => setOpenIndex(index)}
          />
        ))}
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <ExperienceModal
            key="experience-modal"
            item={experiences[openIndex]}
            index={openIndex}
            onClose={() => setOpenIndex(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
