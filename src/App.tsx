import { Flex } from "@mantine/core/";
import "./App.css";
import DisplayTimer from "./pages/DisplayTimer";
import TaskList from "./pages/TaskList";

function App() {
  return (
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
  );
}

export default App;
