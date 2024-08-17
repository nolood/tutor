import React, { isValidElement, ReactNode, useEffect, useRef } from "react";
import { useOnboarding } from "./onboarding-provider";
import ChildWithRef from "./child-with-ref";
import { Button } from "@nextui-org/button";
import { cn } from "@nextui-org/theme";

const Onboarding = ({
  children,
  stepNumber,
}: {
  children: ReactNode;
  stepNumber: number;
}) => {
  const childRef = useRef<HTMLElement>(null);
  const { currentStep, setCurrentStep } = useOnboarding();

  useEffect(() => {
    if (childRef.current && currentStep === stepNumber) {
      // childRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [currentStep, stepNumber]);

  if (isValidElement(children)) {
    return (
      <div className="relative">
        {currentStep === stepNumber && (
          <div className="fixed top-0 left-0 z-10 w-full h-full bg-black/70">
            <Button
              onClick={() => setCurrentStep((prev) => prev + 1)}
              className="absolute top-1/2 right-[10%] z-20"
            >
              Далее123
            </Button>
          </div>
        )}
        <div
          className={cn(
            currentStep === stepNumber ? "absolute z-20" : "static z-auto"
          )}
        >
          <ChildWithRef ref={childRef} stepNumber={stepNumber}>
            {children}
          </ChildWithRef>
        </div>
        {currentStep === stepNumber && (
          <ChildWithRef ref={childRef} stepNumber={stepNumber}>
            {children}
          </ChildWithRef>
        )}
      </div>
    );
  }

  return null;
};

export default Onboarding;
