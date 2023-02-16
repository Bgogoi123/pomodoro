import { TIMERS } from "../constants";
import { Button, Flex } from "@mantine/core";
import { ReactComponent as CoffeeIcon } from "../../assets/icons/coffee.svg";
import { ReactComponent as WorkIcon } from "../../assets/icons/keyboard1.svg";
import { durationContainer, textCursor } from "./styles";

const Durations = () => {
  return (
    <Flex
      direction={"row"}
      justify={"center"}
      align={"center"}
      gap={"md"}
      sx={durationContainer}
    >
      <Button
        variant="light"
        color={"yellow"}
        size={"lg"}
        fullWidth
        leftIcon={<CoffeeIcon width={"25px"} height={"25px"} />}
        title={"Break Duration"}
        sx={textCursor}
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
        sx={textCursor}
      >
        {TIMERS.WORK_DURATION} minutes
      </Button>
    </Flex>
  );
};

export default Durations;
