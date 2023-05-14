import {
  ActionIcon,
  Alert,
  Button,
  Checkbox,
  CloseButton,
  Flex,
  Grid,
  Text,
  TextInput,
} from "@mantine/core";
import { IconAlertCircle, IconEdit } from "@tabler/icons-react";
import { useState } from "react";
import "../parentStyles.css";
import { Itasks } from "../../interfaces";
import { generalText, strikeText, taskRoot } from "./styles";

const TaskList = () => {
  const [tasks, setTasks] = useState<Itasks[] | []>([]);
  const [taskLabel, setTaskLabel] = useState<string>("");

  const handleChangeTasks = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskLabel(event.target.value);
  };

  const handleCheckTask = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setTasks((prev) => {
      let temp = [...prev];
      temp.splice(index, 1, {
        label: temp[index].label,
        checked: event.target.checked,
      });
      prev = temp;
      return prev;
    });
  };

  const addTask = () => {
    if (taskLabel !== "") {
      setTasks([...tasks, { label: taskLabel, checked: false }]);
    }
    setTaskLabel("");
  };

  const editTask = (index: number) => {
    let newTaskLabel = prompt("Enter task label: ") as string;
    if (newTaskLabel !== "" && newTaskLabel !== null) {
      setTasks((prev) => {
        let temp = [...prev];
        temp.splice(index, 1, {
          label: newTaskLabel,
          checked: tasks[index].checked,
        });
        prev = temp;
        return prev;
      });
    }
  };

  const deleteTask = (index: number) => {
    setTasks((prev) => {
      let temp = [...prev];
      temp.splice(index, 1);
      prev = temp;
      return prev;
    });
  };

  return (
    <Flex
      direction={"column"}
      justify={"space-between"}
      gap={"xl"}
      wrap={"wrap"}
      sx={taskRoot}
    >
      <div>
        <p className="headerText">Pending Tasks</p>
        <div>
          {tasks.length > 0 ? (
            tasks.map((task, index) => {
              return (
                <Checkbox
                  key={index}
                  checked={task.checked}
                  label={
                    <Flex
                      gap={"10px"}
                      align="center"
                      sx={{ cursor: "pointer" }}
                    >
                      <Text
                        fz="md"
                        sx={task.checked ? strikeText : generalText}
                      >
                        {task.label}
                      </Text>

                      <ActionIcon onClick={() => editTask(index)}>
                        <IconEdit size={"20px"} color={"teal"} />
                      </ActionIcon>
                      {task.checked && (
                        <CloseButton
                          aria-label="Close modal"
                          color={"red"}
                          title="Delete Task"
                          onClick={() => deleteTask(index)}
                        />
                      )}
                    </Flex>
                  }
                  onChange={(event) => handleCheckTask(event, index)}
                />
              );
            })
          ) : (
            <Alert icon={<IconAlertCircle size={16} />} color="yellow">
              <b className="warningText">No Task Left</b>
            </Alert>
          )}
        </div>
      </div>
      <Grid>
        <Grid.Col>
          <TextInput
            placeholder="Enter Task Label"
            onChange={(event) => handleChangeTasks(event)}
            value={taskLabel}
          />
        </Grid.Col>
        <Grid.Col>
          <Button fullWidth bg={"violet"} onClick={addTask}>
            Add Task
          </Button>
        </Grid.Col>
      </Grid>
    </Flex>
  );
};

export default TaskList;
