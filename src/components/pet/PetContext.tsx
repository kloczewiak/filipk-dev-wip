"use client";

import { createContext, useContext, useCallback, useRef } from "react";

export type PetTargetType = "passive" | "active-only";

interface TargetEntry {
  el: HTMLElement;
  type: PetTargetType;
}

interface PetContextValue {
  register: (id: string, el: HTMLElement, type: PetTargetType) => void;
  unregister: (id: string) => void;
  getTargets: () => Map<string, TargetEntry>;
  setActiveId: (id: string | null) => void;
  getActiveId: () => string | null;
}

const PetContext = createContext<PetContextValue | null>(null);

export function PetProvider({ children }: { children: React.ReactNode }) {
  const targets = useRef(new Map<string, TargetEntry>());
  const activeId = useRef<string | null>(null);

  const register = useCallback(
    (id: string, el: HTMLElement, type: PetTargetType) => {
      targets.current.set(id, { el, type });
    },
    [],
  );

  const unregister = useCallback((id: string) => {
    targets.current.delete(id);
    if (activeId.current === id) activeId.current = null;
  }, []);

  const getTargets = useCallback(() => targets.current, []);

  const setActiveId = useCallback((id: string | null) => {
    activeId.current = id;
  }, []);

  const getActiveId = useCallback(() => activeId.current, []);

  return (
    <PetContext
      value={{ register, unregister, getTargets, setActiveId, getActiveId }}
    >
      {children}
    </PetContext>
  );
}

export function usePetContext() {
  const ctx = useContext(PetContext);
  if (!ctx) throw new Error("usePetContext must be used within PetProvider");
  return ctx;
}
