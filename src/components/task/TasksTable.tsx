import { GridColDef } from "@mui/x-data-grid";
import Table from "../table/Table";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { useEffect, useState } from "react";
import { getTasks } from "../../slices/taskSlice";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import { useNavigate } from "react-router-dom";

interface TasksTableProps {
  onClickEdit: (id: string) => void;
}

type TasksTableInfo = {
  id: string;
  name: string;
  status: string;
  priority: string;
  projectLabel: string;
  assigneeLabel: string;
};

export default function TasksTable({ onClickEdit }: TasksTableProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [tasksTableInfo, setTasksTableInfo] = useState<TasksTableInfo[]>([]);

  const tasks = useAppSelector((state) => state.tasks.tasks);
  const tasksStatus = useAppSelector((state) => state.tasks.status);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "name", headerName: "Task Name", width: 500 },
    { field: "status", headerName: "Status", width: 130 },
    { field: "priority", headerName: "Priority", width: 130 },
    { field: "projectLabel", headerName: "Project", width: 150 },
    { field: "assigneeLabel", headerName: "Assignee", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <IconButton
              color="info"
              aria-label="view-task"
              onClick={() => {
                onClickView(params.row.id);
              }}
            >
              <WysiwygIcon />
            </IconButton>
            <IconButton
              color="warning"
              aria-label="edit-task"
              onClick={() => onClickEdit(params.row.id)}
            >
              <EditIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  const onClickView = (id: number) => {
    navigate(`/tasks/${id}`);
  };

  useEffect(() => {
    if (tasksStatus === "idle") {
      dispatch(getTasks());
    }
  }, [dispatch]);

  useEffect(() => {
    setTasksTableInfo(
      tasks.map((task) => {
        return {
          id: task.id,
          name: task.name,
          status: task.status,
          priority: task.priority,
          projectLabel: task.projectId,
          assigneeLabel: task.assigneeId,
        };
      })
    );
  }, [tasks]);

  return <Table columns={columns} rows={tasksTableInfo} />;
}
