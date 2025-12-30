'use client';
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type RaceData = Record<string, number>;
type AgeData = Record<string, number>;
type GenderData = Record<string, number>;

type AnalysisData = {
  race: RaceData;
  age: AgeData;
  gender: GenderData;
};

type AnalysisContextType = {
  analysis: AnalysisData | null;
  setAnalysis: (data: AnalysisData) => void;
};

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

export const AnalysisProvider = ({ children }: { children: ReactNode }) => {
  const [analysis, setAnalysisState] = useState<AnalysisData | null>(null);

  // Load from sessionStorage on mount
useEffect(() => {
  const stored = sessionStorage.getItem("analysis");
  if (stored) {
    try {
      setAnalysisState(JSON.parse(stored));
    } catch (error) {
      console.error("Failed to parse sessionStorage 'analysis':", error);
      // Optionally, clear corrupted data
      sessionStorage.removeItem("analysis");
    }
  }
}, []);

  // Wrap setAnalysis to also save to sessionStorage
  const setAnalysis = (data: AnalysisData) => {
    setAnalysisState(data);
    sessionStorage.setItem("analysis", JSON.stringify(data));
  };

  return (
    <AnalysisContext.Provider value={{ analysis, setAnalysis }}>
      {children}
    </AnalysisContext.Provider>
  );
};

export const useAnalysis = () => {
  const context = useContext(AnalysisContext);
  if (!context) throw new Error("useAnalysis must be used within AnalysisProvider");
  return context;
};
