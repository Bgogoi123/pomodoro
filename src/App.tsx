import { Flex } from "@mantine/core/";
import DisplayTimer from "./pages/DisplayTimer";
import TaskList from "./pages/TaskList";
import { useMediaQuery } from "@mantine/hooks";

function App() {
  const matches = useMediaQuery("(min-width: 56.25em)");
  console.log(matches);
  return (
    <Flex
      mih={50}
      gap="md"
      justify="center"
      align="center"
      direction={{ base: "column", sm: "row" }}
      wrap="wrap"
    >
      {matches ? (
        <>
          <TaskList />
          <DisplayTimer />
        </>
      ) : (
        <>
          <DisplayTimer />
          <TaskList />
        </>
      )}
    </Flex>
  );
}

export default App;
