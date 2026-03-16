"use client";

import { motion } from "motion/react";

const links = [
  { label: "about", href: "#about" },
  { label: "experience", href: "#experience" },
  { label: "contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-background/80 backdrop-blur-md border-b border-card-border/50"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 1 }}
    >
      <motion.a
        href="#"
        className="text-xl font-bold font-mono"
        whileHover={{ scale: 1.05 }}

      >
        <span className="text-accent">f</span>
        <span className="text-foreground">k</span>
        <span className="text-accent">.</span>
      </motion.a>

      <div className="flex gap-6">
        {links.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            className="text-sm font-mono text-muted hover:text-accent transition-colors relative"
    
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 1.2 + i * 0.1 }}
            whileHover={{ y: -2 }}
          >
            <span className="text-accent mr-1">{">"}</span>
            {link.label}
          </motion.a>
        ))}
      </div>
    </motion.nav>
  );
}
