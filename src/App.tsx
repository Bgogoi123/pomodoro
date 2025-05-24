import { Flex } from "@mantine/core/";
import DisplayTimer from "./pages/DisplayTimer";
import TaskList from "./pages/TaskList";

function App() {
  return (
    <Flex direction="row" gap="7rem" wrap="wrap" p="1rem" justify="center" sx={{}}>
      <DisplayTimer />
      <TaskList />
    </Flex>
  );
}

export default App;
