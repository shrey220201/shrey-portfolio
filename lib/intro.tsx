"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useReducedMotion } from "./useReducedMotion";

interface IntroContextType {
  introActive: boolean;
  introComplete: boolean;
  completeIntro: () => void;
}

const IntroContext = createContext<IntroContextType>({
  introActive: true,
  introComplete: false,
  completeIntro: () => {},
});

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const prefersReduced = useReducedMotion();
  const [introActive, setIntroActive] = useState<boolean>(true);
  const [introComplete, setIntroComplete] = useState<boolean>(false);

  useEffect(() => {
    if (prefersReduced) {
      setIntroActive(false);
      setIntroComplete(true);
      return;
    }

    try {
      const hasSeen = sessionStorage.getItem("shrey-seen-intro");
      if (hasSeen) {
        setIntroActive(false);
        setIntroComplete(true);
      } else {
        setIntroActive(true);
        setIntroComplete(false);
      }
    } catch {
      setIntroActive(false);
      setIntroComplete(true);
    }
  }, [prefersReduced]);

  const completeIntro = () => {
    try {
      sessionStorage.setItem("shrey-seen-intro", "true");
    } catch {
      // ignore
    }
    setIntroComplete(true);
  };

  return (
    <IntroContext.Provider value={{ introActive, introComplete, completeIntro }}>
      {children}
    </IntroContext.Provider>
  );
}

export function useIntro() {
  return useContext(IntroContext);
}
