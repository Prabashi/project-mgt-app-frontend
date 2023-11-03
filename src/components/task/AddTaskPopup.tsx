import { useAppDispatch } from "../../hooks/redux-hooks";
import {
  NewTask,
  Task,
  NewTaskFinal,
  createTask,
} from "../../slices/taskSlice";
import { useState } from "react";
import TaskPopup from "./TaskPopup";
interface AddTaskPopupProps {
  //   open: boolean;
}

const AddTaskPopup = ({}: AddTaskPopupProps) => {
  const dispatch = useAppDispatch();

  const [task, setTask] = useState<NewTask>({
    project: null,
    name: "",
    description: "",
    priority: "",
    assignee: null,
    status: "",
  });

  const submitNewTask = () => {
    if (task.project && task.assignee) {
      dispatch(createTask(task as NewTaskFinal));
    }
  };

  return (
    <>
      <TaskPopup
        title="Create Task"
        task={task}
        setTask={setTask}
        onSubmit={submitNewTask}
      />
    </>
  );
};

export default AddTaskPopup;
