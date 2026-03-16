"use client";

import { createContext, useContext, useCallback, useRef } from "react";

interface PetContextValue {
  register: (id: string, el: HTMLElement) => void;
  unregister: (id: string) => void;
  getTargets: () => Map<string, HTMLElement>;
}

const PetContext = createContext<PetContextValue | null>(null);

export function PetProvider({ children }: { children: React.ReactNode }) {
  const targets = useRef(new Map<string, HTMLElement>());

  const register = useCallback((id: string, el: HTMLElement) => {
    targets.current.set(id, el);
  }, []);

  const unregister = useCallback((id: string) => {
    targets.current.delete(id);
  }, []);

  const getTargets = useCallback(() => targets.current, []);

  return (
    <PetContext value={{ register, unregister, getTargets }}>
      {children}
    </PetContext>
  );
}

export function usePetContext() {
  const ctx = useContext(PetContext);
  if (!ctx) throw new Error("usePetContext must be used within PetProvider");
  return ctx;
}
