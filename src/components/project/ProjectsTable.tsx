import { GridColDef } from "@mui/x-data-grid";
import Table from "../table/Table";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { getProjects } from "../../slices/projectSlice";
import { useEffect } from "react";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";

interface ProjectsTableProps {
  onClickEdit: (id: number) => void;
}

export default function ProjectsTable({ onClickEdit }: ProjectsTableProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const projects = useAppSelector((state) => state.projects.projects);
  const projectStatus = useAppSelector((state) => state.projects.status);

  const columns: GridColDef[] = [
    { field: "name", headerName: "Project Name", width: 700 },
    // { field: "project", headerName: "Project", width: 130 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <IconButton
              color="info"
              aria-label="view-project"
              onClick={() => {
                onClickView(params.row.id);
              }}
            >
              <WysiwygIcon />
            </IconButton>
            <IconButton
              color="warning"
              aria-label="edit-project"
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
    navigate(`/projects/${id}`);
  };

  useEffect(() => {
    if (projectStatus === "idle") {
      dispatch(getProjects());
    }
  }, [dispatch]);

  const onClickProject = (id: string | number) => {
    console.error("Clicked on project id: " + id);
    // navigate(`/dashboards/${id}`);
  };

  return (
    <Table columns={columns} rows={projects} onClickRow={onClickProject} />
  );
}
