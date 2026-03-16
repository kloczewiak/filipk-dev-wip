"use client";

import { useEffect, useRef, useId } from "react";
import { usePetContext } from "./PetContext";

interface PetTargetProps {
  children: React.ReactNode;
  className?: string;
}

export default function PetTarget({ children, className }: PetTargetProps) {
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const { register, unregister } = usePetContext();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    register(id, el);
    return () => unregister(id);
  }, [id, register, unregister]);

  return (
    <div ref={ref} className={className} style={{ position: "relative" }}>
      {children}
    </div>
  );
}
