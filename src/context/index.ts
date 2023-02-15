import { createContext } from "react";

type durationType = {
  timerDuration: number;
  setTimerDuration: React.Dispatch<React.SetStateAction<number>>;
};

export const TimerDurationContext = createContext<durationType>({
  timerDuration: 5,
  setTimerDuration: () => {},
});
