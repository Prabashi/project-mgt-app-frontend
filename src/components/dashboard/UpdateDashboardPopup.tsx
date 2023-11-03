import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import {
  Dashboard,
  updateDashboard,
  getDashboard,
} from "../../slices/dashboardSlice";
import { useEffect, useState } from "react";
import DashboardPopup from "./DashboardPopup";

// type NewDashboard = Omit<Dashboard, 'id'>

interface UpdateDashboardPopupProps {
  //   open: boolean;
  dashboardId: string | null;
}

const UpdateDashboardPopup = ({ dashboardId }: UpdateDashboardPopupProps) => {
  const dispatch = useAppDispatch();
  const selectedDashboard = useAppSelector(
    (state) => state.dashboards.selectedDashboard
  );

  const [dashboard, setDashboard] = useState<Dashboard>({
    id: "",
    name: "",
    description: "",
    projectId: "",
  });

  // TODO: Handle dashboardId being null
  useEffect(() => {
    if (dashboardId) {
      dispatch(getDashboard(dashboardId));
    }
  }, [dashboardId]);

  useEffect(() => {
    if (selectedDashboard) {
      setDashboard({ ...selectedDashboard });
    } else {
      // TODO: Show error msg
    }
  }, [selectedDashboard]);

  const submitUpdateDashboard = () => {
    dispatch(updateDashboard(dashboard));
  };

  return (
    <>
      <DashboardPopup
        title="Update Dashboard"
        dashboard={dashboard}
        setDashboard={setDashboard}
        onSubmit={submitUpdateDashboard}
      />
    </>
  );
};

export default UpdateDashboardPopup;
