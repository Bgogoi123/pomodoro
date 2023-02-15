import { useState } from "react";

const Timer = () => {
  const timer = 5;
  const [time, setTime] = useState<number>(timer);
  if (time > 0) {
    setTimeout(() => {
      let temp = time - 1;
      setTime(temp);
    }, 1000);
  }

  return (
    <div style={{ padding: "1em", textAlign: "right" }}>
      Timer
      <p>{time}</p>
    </div>
  );
};

export default Timer;
