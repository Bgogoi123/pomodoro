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
      align="center"
      direction={{ base: "column", sm: "row" }}
      wrap="wrap"
    >
      <DisplayTimer />
      <TaskList />
    </Flex>
  );
}

export default App;
