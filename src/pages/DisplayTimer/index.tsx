import { Button, Center, Flex, RingProgress } from "@mantine/core";
import { useEffect, useState } from "react";
import beep2 from "../../assets/audios/beep2.mp3";
import { ReactComponent as CoffeeIcon } from "../../assets/icons/coffee.svg";
import { ReactComponent as WorkIcon } from "../../assets/icons/keyboard1.svg";
import { TIMERS } from "../constants";
import Durations from "../Durations";
import EditTimes from "../EditTimes";
import "../parentStyles.css";
import { toGetTime } from "./calculation";
import { onBreak, working } from "./style";
import "./style.css";

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
    setWorkDuration(TIMERS.WORK_DURATION * 60);
    setBreakDuraton(TIMERS.BREAK_DURATION);
    setCycle(TIMERS.CYCLE_DURATION);
    setIsBreak(false);
    setStartTimer(false);
  };

  useEffect(() => {
    if (cycle > 0 && startTimer) {
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
              setCycle((prev) => {
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
      return () => clearInterval(localStorage.getItem("timerRef") as string);
    }
  }, [isBreak, startTimer]);

  return (
    <Flex
      gap="md"
      align="center"
      direction="column"
      wrap="wrap"
      sx={isBreak ? onBreak : working}
    >
      <p className="headerText">Timer</p>

      {/* <Durations /> */}
      <Flex
        direction={"column"}
        align={"center"}
        gap={"md"}
        sx={{
          width: "200px",
          backgroundColor: "#fff",
          padding: "1em",
          textAlign: "center",
        }}
      >
        <Button
          variant="light"
          color={"yellow"}
          size={"lg"}
          fullWidth
          leftIcon={<CoffeeIcon width={"25px"} height={"25px"} />}
          title={"Break Duration"}
        >
          {TIMERS.BREAK_DURATION} minutes
        </Button>
        <Button
          variant="light"
          color={"green"}
          size={"lg"}
          fullWidth
          leftIcon={<WorkIcon width={"30px"} height={"30px"} />}
          title={"Work Duration"}
        >
          {TIMERS.WORK_DURATION} minutes
        </Button>
      </Flex>

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
      <Flex direction={"row"} align={"center"} gap={"xs"}>
        {isBreak ? (
          <>
            <p>Break Time! Grab your </p>{" "}
            <CoffeeIcon title="Coffee" className="shakedIcon" />
          </>
        ) : (
          <>
            <p>Working </p> <WorkIcon title="Working" className="shakedIcon" />
          </>
        )}
      </Flex>

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
              beepAudio.play();
              return !prev;
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

      <EditTimes
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
