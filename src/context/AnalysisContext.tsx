'use client'
import { createContext, useContext, useState, ReactNode } from "react";

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
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);

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
