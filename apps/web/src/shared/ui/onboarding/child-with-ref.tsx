import {
  cloneElement,
  forwardRef,
  isValidElement,
  ReactElement,
  Ref,
  useEffect,
} from "react";
import { useOnboarding } from "./onboarding-provider";

type ChildWithRefProps = {
  children: ReactElement;
  stepNumber: number;
};

const ChildWithRef = forwardRef<HTMLElement, ChildWithRefProps>(
  ({ children, stepNumber }, ref) => {
    const { setTotalSteps } = useOnboarding();

    useEffect(() => {
      setTotalSteps((prev) => Math.max(prev, stepNumber));
    }, [stepNumber, setTotalSteps]);

    if (isValidElement(children)) {
      return cloneElement(children, { ref } as { ref: Ref<HTMLElement> });
    }

    return null;
  }
);

export default ChildWithRef;
