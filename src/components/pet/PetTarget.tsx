"use client";

import { useEffect, useRef, useId } from "react";
import { usePetContext, type PetTargetType } from "./PetContext";

interface PetTargetProps {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
  type?: PetTargetType;
}

export default function PetTarget({
  children,
  className,
  active,
  type = "passive",
}: PetTargetProps) {
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const { register, unregister, setActiveId } = usePetContext();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    register(id, el, type);
    return () => unregister(id);
  }, [id, register, unregister, type]);

  useEffect(() => {
    if (active) setActiveId(id);
  }, [active, id, setActiveId]);

  return (
    <div ref={ref} className={className} style={{ position: "relative" }}>
      {children}
    </div>
  );
}
