import { Flex } from "@mantine/core/";
import { useState } from "react";
import "./App.css";
import { TimerDurationContext } from "./context";
import DisplayTimer from "./pages/DisplayTimer";
import TaskList from "./pages/TaskList";

function App() {
  const [timerDuration, setTimerDuration] = useState(5);

  return (
    <TimerDurationContext.Provider
      value={{
        timerDuration,
        setTimerDuration,
      }}
    >
      <Flex
        mih={50}
        gap="md"
        justify="center"
        align="flex-start"
        direction="row"
        wrap="wrap"
      >
        <TaskList />
        <DisplayTimer />
      </Flex>
    </TimerDurationContext.Provider>
  );
}

export default App;
