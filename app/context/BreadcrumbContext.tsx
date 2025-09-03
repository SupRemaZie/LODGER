"use client"
import React, { createContext, useState, useContext } from "react";

interface BreadcrumbContextType {
  currentStep: string;
  setCurrentStep: (step: string) => void;
}
// Créer le contexte
const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(undefined);

export const BreadcrumbProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentStep, setCurrentStep] = useState("Etape1");

  return (
    <BreadcrumbContext.Provider value={{ currentStep, setCurrentStep }}>
      {children}
    </BreadcrumbContext.Provider>
  );
};

export const useBreadcrumb = (): BreadcrumbContextType => {
  const context = useContext(BreadcrumbContext);
  if (!context) {
    throw new Error("useBreadcrumb must be used within a BreadcrumbProvider");
  }
  return context;
};
