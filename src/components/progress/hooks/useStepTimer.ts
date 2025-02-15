/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

import useTimer from "@/hooks/useTimer";

import type { Step } from "@/types/study";

const INIT_SECONDS = 600;
const SECONDS_PER_MINUTE = 60;

type Params = {
  studyMinutes: number;
  step: Step;
  onStart?: () => void;
  onStop?: () => void;
  onComplete?: () => void;
};

const useStepTimer = ({ studyMinutes, step, onStart, onStop, onComplete }: Params) => {
  const { start, stop, reset, leftSeconds, isTicking } = useTimer(INIT_SECONDS, { onStart, onStop, onComplete });

  useEffect(() => {
    if (step === "planning" || step === "retrospect") {
      reset(INIT_SECONDS);
    } else {
      reset(studyMinutes * SECONDS_PER_MINUTE);
    }

    start();
  }, [studyMinutes, step]);

  return {
    start,
    stop,
    leftSeconds,
    isTicking,
  };
};

export default useStepTimer;
