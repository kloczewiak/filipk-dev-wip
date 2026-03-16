"use client";

import { motion } from "motion/react";
import PetTarget from "./pet/PetTarget";

export default function Contact() {
  return (
    <section className="py-32 px-6 max-w-3xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <PetTarget className="inline-block">
            let&apos;s <span className="text-accent inline-block">talk</span>
          </PetTarget>
        </motion.h2>

        <motion.p
          className="text-muted text-lg mb-10 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Got an idea, a project, or just want to say hi? Feel free to reach
          out.
        </motion.p>

        <motion.a
          href="mailto:hello@filipk.dev"
          className="inline-block px-8 py-4 bg-accent text-background font-bold rounded-full text-lg hover:bg-accent-light transition-colors"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.5 } }}
          viewport={{ once: true }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 30px rgba(247, 127, 67, 0.4)",
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
        >
          say hello
        </motion.a>
      </motion.div>

      {/* Footer */}
      <motion.footer
        className="mt-32 pb-8 text-sm text-muted font-mono"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
      >
        <p>
          built with <span className="text-accent">Next.js</span>,{" "}
          <span className="text-accent">Motion</span>, and a{" "}
          <span className="text-accent">lot of orange</span>
        </p>
      </motion.footer>
    </section>
  );
}
