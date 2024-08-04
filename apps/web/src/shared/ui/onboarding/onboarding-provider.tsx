import React, { createContext, useContext, useState, ReactNode } from "react";

interface OnboardingContextProps {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  totalSteps: number;
  setTotalSteps: React.Dispatch<React.SetStateAction<number>>;
}

const OnboardingContext = createContext<OnboardingContextProps | undefined>(
  undefined
);

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within a OnboardingProvider");
  }
  return context;
};

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);

  return (
    <OnboardingContext.Provider
      value={{ currentStep, setCurrentStep, totalSteps, setTotalSteps }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};
