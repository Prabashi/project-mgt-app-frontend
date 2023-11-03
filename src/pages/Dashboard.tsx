import { Navigate, useParams } from "react-router-dom";
import DashboardUserPanel from "../components/dashboard/DashboardUserPanel";
import PageHeader from "../components/headers/PageHeader";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { useEffect } from "react";
import { getDashboard } from "../slices/dashboardSlice";

export type Task = {
  id: string | number;
  name: string;
  status: string;
  assignee: string;
};

export default function Dashboard() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const tasks = useAppSelector((state) => state.tasks.tasks); // TODO: Tasks for the selected dashboard
  const assignees = useAppSelector((state) => state.users.users); // TODO: Users for the selected dashboard
  const data = useAppSelector((state) => state.dashboards.selectedDashboard);

  useEffect(() => {
    if (id) {
      dispatch(getDashboard(id));
    }
  }, [id]);

  return (
    <>
      {data && (
        <>
          <PageHeader title={`${data.name} for Project ${data.projectId}`} />

          {assignees.map((assignee) => (
            <DashboardUserPanel
              key={assignee.id}
              assignee={assignee}
              tasks={tasks.filter((task) => task.assigneeId === assignee.id)}
            />
          ))}
        </>
      )}
    </>
  );
}
