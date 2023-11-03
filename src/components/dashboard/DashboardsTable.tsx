import { GridColDef } from "@mui/x-data-grid";
import Table from "../table/Table";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { getDashboards } from "../../slices/dashboardSlice";
import { useEffect } from "react";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";

interface DashboardsTableProps {
  onClickEdit: (id: string) => void;
}

// type DashboardsTableInfo = {
//   id: number;
//   name: string;
//   status: string;
//   priority: string;
//   projectLabel: string;
//   assigneeLabel: string;
// };

export default function DashboardsTable({ onClickEdit }: DashboardsTableProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const dashboards = useAppSelector((state) => state.dashboards.dashboards);
  const dashboardStatus = useAppSelector((state) => state.dashboards.status);

  const columns: GridColDef[] = [
    { field: "name", headerName: "Dashboard Name", width: 700 },
    { field: "project", headerName: "Project", width: 130 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <IconButton
              color="info"
              aria-label="view-dashboard"
              onClick={() => {
                onClickView(params.row.id);
              }}
            >
              <WysiwygIcon />
            </IconButton>
            <IconButton
              color="warning"
              aria-label="edit-dashboard"
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
    navigate(`/dashboards/${id}`);
  };

  useEffect(() => {
    if (dashboardStatus === "idle") {
      dispatch(getDashboards());
    }
  }, [dispatch]);

  const onClickDashboard = (id: string | number) => {
    console.error("Clicked on dashboard id: " + id);
  };

  return (
    <Table columns={columns} rows={dashboards} onClickRow={onClickDashboard} />
  );
}
