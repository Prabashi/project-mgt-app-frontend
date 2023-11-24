import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { Task, updateTask, getTask } from "../../slices/taskSlice";
import { useEffect, useState } from "react";
import TaskPopup from "./TaskPopup";

interface UpdateTaskPopupProps {
  taskId: number | null;
}

const UpdateTaskPopup = ({ taskId }: UpdateTaskPopupProps) => {
  const dispatch = useAppDispatch();
  const selectedTask = useAppSelector((state) => state.tasks.selectedTask);
  const projects = useAppSelector((state) => state.projects.projects);
  const assignees = useAppSelector((state) => state.users.users);

  const [task, setTask] = useState<Task>({
    id: "",
    project: { id: "", name: "" },
    name: "",
    description: "",
    priority: "",
    assignee: { id: "", name: "" },
    status: "",
  });

  // TODO: Handle taskId being null
  useEffect(() => {
    if (taskId) {
      dispatch(getTask(taskId));
    }
  }, [taskId]);

  useEffect(() => {
    if (selectedTask) {
      const project = projects.find(
        (option) => option.id === selectedTask.projectId
      );
      const assignee = assignees.find(
        (option) => option.id === selectedTask.assigneeId
      );

      if (project && assignee) {
        setTask({ ...selectedTask, project: project, assignee: assignee });
      } else {
        // TODO: Error
      }
    } else {
      // TODO: Show error msg
    }
  }, [selectedTask]);

  const submitUpdateTask = () => {
    dispatch(updateTask(task));
  };

  return (
    <>
      <TaskPopup
        title="Update Task"
        task={task}
        setTask={setTask}
        onSubmit={submitUpdateTask}
      />
    </>
  );
};

export default UpdateTaskPopup;
