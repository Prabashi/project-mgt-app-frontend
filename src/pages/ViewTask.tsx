import PageHeader from "../components/headers/PageHeader";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Task, getTask } from "../slices/taskSlice";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { Typography } from "@mui/material";

export default function ViewTask() {
  const dispatch = useAppDispatch();
  const selectedTask = useAppSelector((state) => state.tasks.selectedTask);

  const { id } = useParams();
  // const [task, setTask] = useState<Task>({
  //   id: "",
  //   project: { id: "", name: "" },
  //   name: "",
  //   description: "",
  //   priority: "",
  //   assignee: { id: "", name: "" },
  //   status: "",
  // });
  const [task, setTask] = useState<Task>();

  useEffect(() => {
    if (id) {
      dispatch(getTask(parseInt(id)));
    }
  }, [id]);

  useEffect(() => {
    if (selectedTask) {
      setTask({
        ...selectedTask,
        project: { id: "", name: "" },
        assignee: { id: "", name: "" },
      });
    } else {
      // TODO: Show error msg
    }
  }, [selectedTask]);

  return (
    <>
      {task && (
        <>
          <PageHeader title="Task" />
          <Typography variant="h5">ID: {task.id}</Typography>
          <Typography variant="h5">Name: {task.name}</Typography>
          <Typography variant="h5">Status: {task.status}</Typography>
        </>
      )}
    </>
  );
}
