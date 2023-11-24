import { useAppDispatch } from "../../hooks/redux-hooks";
import {
  NewDashboard,
  NewDashboardFinal,
  createDashboard,
} from "../../slices/dashboardSlice";
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
    project: null,
  });

  const submitNewDashboard = () => {
    if (dashboard.name && dashboard.project) {
      dispatch(createDashboard(dashboard as NewDashboardFinal));
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
