"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface JarContextType {
  weeklyEarning: number;
  parentMatch: number;
  updateWeeklyEarning: (amount: number) => void;
  updateParentMatch: (amount: number) => void;
}

const JarContext = createContext<JarContextType | undefined>(undefined);

export function JarProvider({ children }: { children: ReactNode }) {
  const [weeklyEarning, setWeeklyEarning] = useState(500);
  const [parentMatch, setParentMatch] = useState(100);

  useEffect(() => {
    const savedEarning = localStorage.getItem("jar_weeklyEarning");
    const savedMatch = localStorage.getItem("jar_parentMatch");
    
    if (savedEarning) setWeeklyEarning(Number(savedEarning));
    if (savedMatch) setParentMatch(Number(savedMatch));
  }, []);

  const updateWeeklyEarning = (amount: number) => {
    setWeeklyEarning(amount);
    localStorage.setItem("jar_weeklyEarning", amount.toString());
  };

  const updateParentMatch = (amount: number) => {
    setParentMatch(amount);
    localStorage.setItem("jar_parentMatch", amount.toString());
  };

  return (
    <JarContext.Provider value={{ weeklyEarning, parentMatch, updateWeeklyEarning, updateParentMatch }}>
      {children}
    </JarContext.Provider>
  );
}

export function useJarContext() {
  const context = useContext(JarContext);
  if (context === undefined) {
    throw new Error("useJarContext must be used within a JarProvider");
  }
  return context;
}
