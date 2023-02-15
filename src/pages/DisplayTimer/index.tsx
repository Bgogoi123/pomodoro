import {
  Button,
  Center,
  Flex,
  Modal,
  RingProgress,
  TextInput,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { ReactComponent as CoffeeIcon } from "../../assets/icons/coffee.svg";
import { ReactComponent as WorkIcon } from "../../assets/icons/keyboard1.svg";
import "../parentStyles.css";
import "./style.css";
import { onBreak, working } from "./style";
import beep2 from "../../assets/audios/beep2.mp3";

let TIMERS = {
  BREAK_DURATION: 3,
  WORK_DURATION: 10,
  CYCLE_DURATION: 1,
};

const DisplayTimer = () => {
  const [workDuration, setWorkDuration] = useState<number>(
    TIMERS.WORK_DURATION
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
  const [workSeconds, setWorkSeconds] = useState<number>(10);

  let beepAudio = { audio: new Audio(beep2) };

  const openModal = () => {
    setOpen(true);
    setUpdatedBreakTime(breakDuration);
    setUpdatedWorkTime(workDuration);
  };

  const handleChangeBreak = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedBreakTime(parseInt(e.target.value));
  };

  const handleChangeWork = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedWorkTime(parseInt(e.target.value));
  };

  const handleSave = () => {
    setWorkDuration(updatedWorkTime);
    setBreakDuraton(updatedBreakTime);
    TIMERS.BREAK_DURATION = updatedBreakTime;
    TIMERS.WORK_DURATION = updatedWorkTime;
    setOpen(false);
  };

  const resetTimer = () => {
    setWorkDuration(TIMERS.WORK_DURATION);
    setBreakDuraton(TIMERS.BREAK_DURATION);
    setCycle(TIMERS.CYCLE_DURATION);
    setIsBreak(false);
    setStartTimer(false);
  };

  function toGetTime() {
    let duration = workDuration.toString();
    let time = `00:${duration}:${workSeconds}`;
    let newtime: any = time.split(":");
    let now = new Date();
    var date = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      ...newtime
    );
    var toTime = date.toLocaleTimeString("it-IT");
    return toTime;
  }

  useEffect(() => {
    if (cycle > 0 && startTimer) {
      let timerRef = setInterval(() => {
        setWorkSeconds((prevSeconds) => {
          if (prevSeconds > 0) {
            prevSeconds = prevSeconds - 1;
          } else {
            // decrement minutes:
            setWorkDuration((prev) => {
              prev = prev - 1;

              if (prev < 0 && !isBreak) {
                setIsBreak(!isBreak);
                clearInterval(localStorage.getItem("timerRef") as string);
                console.log("BEEP");
                beepAudio.audio.play();
                return breakDuration;
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
                console.log("BEEP");
                beepAudio.audio.play();
                return TIMERS.WORK_DURATION;
              }

              if (cycle < 0) {
                setIsBreak(false);
                clearInterval(localStorage.getItem("timerRef") as string);
                console.log("BEEP");
                beepAudio.audio.play();
                return TIMERS.WORK_DURATION;
              }

              return prev;
            });
            prevSeconds = 9;
          }
          return prevSeconds;
        });
      }, 1000);
      localStorage.clear();
      localStorage.setItem("timerRef", JSON.stringify(timerRef));
      return () => clearInterval(localStorage.getItem("timerRef") as string);
    } else {
      // 1 Podoromo Task Duration Completed : Set all to default.
      resetTimer();
    }
  }, [isBreak, startTimer]);

  return (
    <Flex
      gap="md"
      justify="center"
      align="center"
      direction="column"
      wrap="wrap"
      sx={isBreak ? onBreak : working}
    >
      <p className="headerText">Timer</p>
      <Flex
        direction={"column"}
        justify={"center"}
        align={"center"}
        gap={"md"}
        sx={{
          border: "1px solid #d6d6d6",
          boxShadow: "0px 0px 5px 2px #d6d6d6",
          borderRadius: "10px",
          width: "150px",
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
          - {TIMERS.BREAK_DURATION}
        </Button>
        <Button
          variant="light"
          color={"green"}
          size={"lg"}
          fullWidth
          leftIcon={<WorkIcon width={"30px"} height={"30px"} />}
          title={"Work Duration"}
        >
          - {TIMERS.WORK_DURATION}
        </Button>
      </Flex>

      <Button onClick={openModal} variant="outline" color="violet">
        Edit Timers
      </Button>
      <p>{toGetTime()}</p>
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
          color="indigo"
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
              console.log("BEEP ON BUTTON");
              beepAudio.audio.play();
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

      <Modal opened={open} onClose={() => setOpen(false)} title="Edit Timers">
        <Flex
          gap={"md"}
          direction={"column"}
          align="center"
          sx={{ margin: "1em" }}
        >
          <TextInput
            type={"number"}
            placeholder="Enter Break Time"
            label={"Enter Break Time"}
            value={updatedBreakTime}
            onChange={(e) => handleChangeBreak(e)}
          />
          <TextInput
            type={"number"}
            placeholder="Enter Work Time"
            label={"Enter Work Time"}
            value={updatedWorkTime}
            onChange={(e) => handleChangeWork(e)}
          />
          <Button onClick={handleSave}>Save</Button>
        </Flex>
      </Modal>
    </Flex>
  );
};

export default DisplayTimer;
