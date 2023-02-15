import "../parentStyles.css";
import { Flex } from "@mantine/core";
import { ReactComponent as WaitIcon } from "../../assets/icons/paused.svg";
import { ReactComponent as CoffeeIcon } from "../../assets/icons/coffee.svg";
import { ReactComponent as WorkIcon } from "../../assets/icons/keyboard1.svg";

const DurationMessage = ({
  isBreak,
  startTimer,
}: {
  isBreak: boolean;
  startTimer: boolean;
}) => {
  return (
    <Flex direction={"row"} align={"center"} gap={"xs"}>
      {isBreak ? (
        <>
          <p className="messageText">Break Time! Grab your </p>
          <CoffeeIcon title="Coffee" className="swingIcon" />
        </>
      ) : !isBreak && startTimer ? (
        <>
          <p className="messageText">Working </p>
          <WorkIcon title="Working" className="swingIcon" />
        </>
      ) : (
        <>
          <p className="messageText">Start The Timer </p>
          <WaitIcon title="Waiting" className="swingIcon" />
        </>
      )}
    </Flex>
  );
};

export default DurationMessage;
