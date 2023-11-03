import { Grid, CssBaseline, SelectChangeEvent } from "@mui/material";
import ModalPopup from "../modal/ModalPopup";
import { Dashboard } from "../../slices/dashboardSlice";
import { ReactNode, SyntheticEvent, useEffect, useState } from "react";
import FormTextField from "../form/FormTextField";
import SubmitButton from "../form/SubmitButton";
import CancelButton from "../form/CancelButton";
import FormModal from "../modal/FormModal";
import FormAutoCompleteField from "../form/FormAutoCompleteField";
import FormSelectionField from "../form/FormSelectionField";
// import { NewDashboard } from "../../slices/dashboardSlice";
import FormTextAreaField from "../form/FormTextAreaField";
import "../../styles/task.scss"; // TODO
import ProjectAutoCompleteField from "../dropdowns/ProjectAutoCompleteField";

interface DashboardPopupProps {
  // open: boolean;
  title: string;
  dashboard: any; // TODO: Task, NewTask
  setDashboard: React.Dispatch<React.SetStateAction<any>>; // TODO
  // initialState?: Task;
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

  const handleAutoCompleteChange = (
    e: SyntheticEvent<Element, Event>,
    value: string | null,
    name: string
  ) => {
    setDashboard({
      ...dashboard,
      [name]: value,
    });
  };

  return (
    <>
      {/* <CssBaseline /> */}
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
              onChange={handleAutoCompleteChange}
            />
            {/* <FormAutoCompleteField
              label="Project"
              name="project"
              options={projectOptions}
              value={dashboard.project}
              isRequired={true}
              onChange={handleAutoCompleteChange}
            /> */}
          </Grid>
          {/* <Grid item xs={12} mt={2}>
            <FormSelectionField
              label="Status"
              name="status"
              options={STATUS_LIST}
              value={dashboard.status}
              isRequired={true}
              onChange={handleInputChange}
            />
          </Grid> */}
        </Grid>
      </FormModal>
    </>
  );
};

export default DashboardPopup;
