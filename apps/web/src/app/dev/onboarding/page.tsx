"use client";

import { Button } from "@nextui-org/button";
import { OnboardingProvider } from "~/shared/ui/onboarding/onboarding-provider";
import Onboarding from "~/shared/ui/onboarding/onboarging";

const Page = () => {
  return (
    <OnboardingProvider>
      <div className="flex flex-col items-center min-h-screen gap-4 p-6 bg-white">
        <div className="flex justify-between w-full">
          <Onboarding stepNumber={0}>
            <Button color="primary">Kek1</Button>
          </Onboarding>
          <Onboarding stepNumber={1}>
            <Button color="primary">Kek2</Button>
          </Onboarding>
        </div>

        <Onboarding stepNumber={2}>
          <Button color="primary">Kek3</Button>
        </Onboarding>

        <Onboarding stepNumber={3}>
          <Button color="primary">Kek4</Button>
        </Onboarding>

        <div className="flex justify-around w-full">
          <Onboarding stepNumber={4}>
            <Button color="primary">Kek4</Button>
          </Onboarding>
          <Onboarding stepNumber={5}>
            <Button color="primary">Kek4</Button>
          </Onboarding>
          <Onboarding stepNumber={6}>
            <Button color="primary">Kek4</Button>
          </Onboarding>
        </div>
      </div>
    </OnboardingProvider>
  );
};

export default Page;
