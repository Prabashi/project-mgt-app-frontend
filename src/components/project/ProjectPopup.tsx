import { Grid, CssBaseline, SelectChangeEvent } from "@mui/material";
import ModalPopup from "../modal/ModalPopup";
import { Project } from "../../slices/projectSlice";
import { ReactNode, SyntheticEvent, useEffect, useState } from "react";
import FormTextField from "../form/FormTextField";
import SubmitButton from "../form/SubmitButton";
import CancelButton from "../form/CancelButton";
import FormModal from "../modal/FormModal";
import FormAutoCompleteField from "../form/FormAutoCompleteField";
import FormSelectionField from "../form/FormSelectionField";
// import { NewProject } from "../../slices/projectSlice";
import FormTextAreaField from "../form/FormTextAreaField";
import { STATUS_LIST, TASK_STATUS_LIST } from "../../constants";
import "../../styles/task.scss"; // TODO

interface ProjectPopupProps {
  // open: boolean;
  title: string;
  project: any; // TODO: Task, NewTask
  setProject: React.Dispatch<React.SetStateAction<any>>; // TODO
  // initialState?: Task;
  onSubmit: () => void;
}

const ProjectPopup = ({
  title,
  project,
  setProject,
  onSubmit,
}: ProjectPopupProps) => {
  const handleSubmit = () => {
    onSubmit();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string | null>
  ) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  const handleAutoCompleteChange = (
    e: SyntheticEvent<Element, Event>,
    value: string | null,
    name: string
  ) => {
    setProject({
      ...project,
      [name]: value,
    });
  };

  return (
    <>
      {/* <CssBaseline /> */}
      <FormModal
        title={title}
        onSubmit={handleSubmit}
        classNames="project modal-form"
      >
        <Grid container>
          <Grid item xs={12} mt={2}>
            <FormTextField
              label="Name"
              name="name"
              value={project.name}
              isRequired={true}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} mt={2}>
            <FormTextAreaField
              label="Description"
              name="description"
              value={project.description}
              isRequired={true}
              onChange={handleInputChange}
            />
          </Grid>
          {/* <Grid item xs={12} mt={2}>
            <FormSelectionField
              label="Status"
              name="status"
              options={STATUS_LIST}
              value={project.status}
              isRequired={true}
              onChange={handleInputChange}
            />
          </Grid> */}
        </Grid>
      </FormModal>
    </>
  );
};

export default ProjectPopup;
