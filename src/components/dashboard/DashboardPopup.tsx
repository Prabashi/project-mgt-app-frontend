import { Grid, SelectChangeEvent } from "@mui/material";
import { SyntheticEvent } from "react";
import FormTextField from "../form/FormTextField";
import FormModal from "../modal/FormModal";
import FormTextAreaField from "../form/FormTextAreaField";
import "../../styles/dashboard.scss";
import ProjectAutoCompleteField from "../dropdowns/ProjectAutoCompleteField";
import { Project } from "../../slices/taskSlice";
import { Dashboard, NewDashboard } from "../../slices/dashboardSlice";

interface DashboardPopupProps {
  title: string;
  dashboard: Dashboard | NewDashboard;
  setDashboard: React.Dispatch<React.SetStateAction<any>>;
  onSubmit: () => void;
}

const DashboardPopup = ({
  title,
  dashboard,
  setDashboard,
  onSubmit,
}: DashboardPopupProps) => {
  const handleSubmit = () => {
    onSubmit();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string | null>
  ) => {
    setDashboard({
      ...dashboard,
      [e.target.name]: e.target.value,
    });
  };

  const handleProjectAutoCompleteChange = (
    e: SyntheticEvent<Element, Event>,
    value: Project | null,
    name: string
  ) => {
    setDashboard({
      ...dashboard,
      [name]: value,
    });
  };

  return (
    <>
      <FormModal
        title={title}
        onSubmit={handleSubmit}
        classNames="dashboard modal-form"
      >
        <Grid container>
          <Grid item xs={12} mt={2}>
            <FormTextField
              label="Name"
              name="name"
              value={dashboard.name}
              isRequired={true}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} mt={2}>
            <FormTextAreaField
              label="Description"
              name="description"
              value={dashboard.description}
              isRequired={true}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} mt={2}>
            <ProjectAutoCompleteField
              value={dashboard.project}
              onChange={handleProjectAutoCompleteChange}
            />
          </Grid>
        </Grid>
      </FormModal>
    </>
  );
};

export default DashboardPopup;
