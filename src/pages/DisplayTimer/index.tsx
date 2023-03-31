import { Button, Center, Flex, RingProgress } from "@mantine/core";
import { useEffect, useState } from "react";
import "./style.css";
import "../parentStyles.css";
import Durations from "../Durations";
import { TIMERS } from "../constants";
import { toGetTime } from "./calculation";
import { onBreak, working } from "./style";
import beep2 from "../../assets/audios/beep2.mp3";
import DurationMessage from "../Durations/DurationMessage";
import EditTimesModal from "../EditTimesModal";

const DisplayTimer = () => {
  const [workDuration, setWorkDuration] = useState<number>(
    TIMERS.WORK_DURATION * 60
  );
  const [breakDuration, setBreakDuraton] = useState<number>(
    TIMERS.BREAK_DURATION
  );
  const [cycle, setCycle] = useState<number>(TIMERS.CYCLE_DURATION);

  const [isBreak, setIsBreak] = useState<boolean>(false);
  const [startTimer, setStartTimer] = useState<boolean>(false);

  const [open, setOpen] = useState<boolean>(false);
  const [updatedBreakTime, setUpdatedBreakTime] =
    useState<number>(breakDuration);
  const [updatedWorkTime, setUpdatedWorkTime] = useState<number>(0);

  let beepAudio = new Audio(beep2);

  const openModal = () => {
    setOpen(true);
    setUpdatedBreakTime(breakDuration);
    setUpdatedWorkTime(Math.floor(workDuration / 60));
  };

  const handleChangeBreak = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedBreakTime(parseInt(e.target.value));
  };

  const handleChangeWork = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedWorkTime(parseInt(e.target.value));
  };

  const handleSave = () => {
    if (!isNaN(updatedWorkTime) && !isNaN(updatedBreakTime)) {
      setWorkDuration(updatedWorkTime * 60);
      setBreakDuraton(updatedBreakTime);
      TIMERS.BREAK_DURATION = updatedBreakTime;
      TIMERS.WORK_DURATION = updatedWorkTime;
      setOpen(false);
    }
  };

  const resetTimer = () => {
    TIMERS.BREAK_DURATION = 3;
    TIMERS.WORK_DURATION = 10;
    TIMERS.CYCLE_DURATION = 1;

    setWorkDuration(10 * 60);
    setBreakDuraton(3);
    setCycle(1);
    setIsBreak(false);
    setStartTimer(false);
  };

  useEffect(() => {
    if (TIMERS.WORK_DURATION <= 0) return;
    if (cycle > 0 && startTimer) {
      operations();
      return () => clearInterval(localStorage.getItem("timerRef") as string);
    }
    setStartTimer(false);
    // eslint-disable-next-line
  }, [isBreak, startTimer, cycle, workDuration]);

  const operations = () => {
    let timerRef = setInterval(() => {
      setWorkDuration((prev) => {
        prev = prev - 1;

        if (prev < 0 && !isBreak) {
          setIsBreak(!isBreak);
          clearInterval(localStorage.getItem("timerRef") as string);
          beepAudio.play();
          return breakDuration * 60;
        }

        if (prev < 0 && isBreak) {
          setIsBreak(!isBreak);
          clearInterval(localStorage.getItem("timerRef") as string);
          if (cycle !== 0) {
            setCycle(() => {
              let temp = cycle - 1;
              return temp;
            });
          }
          beepAudio.play();
          return TIMERS.WORK_DURATION * 60;
        }

        if (cycle < 0) {
          setIsBreak(false);
          clearInterval(localStorage.getItem("timerRef") as string);
          beepAudio.play();
          return TIMERS.WORK_DURATION * 60;
        }

        return prev;
      });
    }, 1000);
    localStorage.clear();
    localStorage.setItem("timerRef", JSON.stringify(timerRef));
  };

  return (
    <Flex
      gap="md"
      align="center"
      direction="column"
      wrap="wrap"
      sx={isBreak ? onBreak : working}
    >
      <p className="headerText">POMODORO</p>

      <Durations />

      <Button onClick={openModal} variant="outline" color="violet">
        Edit Timers
      </Button>

      <div className="timerContainer">
        <p className="time">{toGetTime(workDuration)}</p>
      </div>

      <RingProgress
        size={50}
        roundCaps
        thickness={4}
        sections={[{ value: 100, color: "#6888e8" }]}
        label={<Center>{cycle}</Center>}
      />

      <DurationMessage isBreak={isBreak} startTimer={startTimer} />

      <div>
        <Button
          color="violet"
          onClick={() => setCycle((prev) => prev + 1)}
          sx={{ margin: "0.5em" }}
        >
          Add Cycle
        </Button>
        <Button
          color="yellow"
          onClick={() =>
            setCycle((prev) => {
              if (prev > 0) {
                return prev - 1;
              }
              return prev;
            })
          }
        >
          Remove Cycle
        </Button>
      </div>
      <div>
        <Button
          color={startTimer ? "yellow" : "green"}
          onClick={() =>
            setStartTimer((prev) => {
              if (workDuration > 0) {
                beepAudio.play();
                return !prev;
              }
              return prev;
            })
          }
          sx={{ margin: "0.5em" }}
        >
          {startTimer ? "Pause" : "Start"}
        </Button>

        <Button variant="outline" color="lime" onClick={resetTimer}>
          Reset Timer
        </Button>
      </div>

      <EditTimesModal
        open={open}
        setOpen={setOpen}
        handleSave={handleSave}
        updatedWorkTime={updatedWorkTime}
        updatedBreakTime={updatedBreakTime}
        handleChangeWork={handleChangeWork}
        handleChangeBreak={handleChangeBreak}
      />
    </Flex>
  );
};

export default DisplayTimer;
