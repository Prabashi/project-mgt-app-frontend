import DashboardsTable from "../components/dashboard/DashboardsTable";
import PageHeader from "../components/headers/PageHeader";
import AddButton from "../components/buttons/AddButton";
import { openModal, closeModal } from "../slices/modalSlice";
import { useAppDispatch } from "../hooks/redux-hooks";
import Grid from "@mui/material/Grid";

export default function Dashboards() {
  const dispatch = useAppDispatch();

  const openModalAddDashboard = () => {
    dispatch(openModal({ modalName: "addDashboard", modalProps: {} }));
  };

  const handleOpenUpdateDashboardPopup = (id: string) => {
    dispatch(
      openModal({
        modalName: "updateDashboard",
        modalProps: { dashboardId: id },
      })
    );
  };

  return (
    <>
      <Grid container justifyContent="space-between">
        <Grid item>
          <PageHeader title="Dashboards" />
        </Grid>
        <Grid item>
          <AddButton
            text="Create Dashboard"
            onClickAction={() => {
              openModalAddDashboard();
            }}
          />
        </Grid>
      </Grid>

      <DashboardsTable onClickEdit={handleOpenUpdateDashboardPopup} />
    </>
  );
}
