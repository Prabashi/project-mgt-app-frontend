import { useAppDispatch } from "../../hooks/redux-hooks";
import { NewDashboard, createDashboard } from "../../slices/dashboardSlice";
import { useState } from "react";
import DashboardPopup from "./DashboardPopup";
interface AddDashboardPopupProps {
  //   open: boolean;
}

const AddDashboardPopup = ({}: AddDashboardPopupProps) => {
  const dispatch = useAppDispatch();

  const [dashboard, setDashboard] = useState<NewDashboard>({
    name: "",
    description: "",
    projectId: "",
  });

  const submitNewDashboard = () => {
    if (dashboard.name && dashboard.projectId) {
      dispatch(createDashboard(dashboard as NewDashboard));
    }
  };

  return (
    <>
      <DashboardPopup
        title="Create Dashboard"
        dashboard={dashboard}
        setDashboard={setDashboard}
        onSubmit={submitNewDashboard}
      />
    </>
  );
};

export default AddDashboardPopup;
