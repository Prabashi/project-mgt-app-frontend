import ProjectsTable from "../components/project/ProjectsTable";
import PageHeader from "../components/headers/PageHeader";
import AddButton from "../components/buttons/AddButton";
import { openModal, closeModal } from "../slices/modalSlice";
import { useAppDispatch } from "../hooks/redux-hooks";
import Grid from "@mui/material/Grid";

export default function Projects() {
  const dispatch = useAppDispatch();

  const openModalAddProject = () => {
    dispatch(openModal({ modalName: "addProject", modalProps: {} }));
  };

  const handleOpenUpdateProjectPopup = (id: number) => {
    dispatch(
      openModal({ modalName: "updateProject", modalProps: { projectId: id } })
    );
  };

  return (
    <>
      <Grid container justifyContent="space-between">
        <Grid item>
          <PageHeader title="Projects" />
        </Grid>
        <Grid item>
          <AddButton
            text="Create Project"
            onClickAction={() => {
              openModalAddProject();
            }}
          />
        </Grid>
      </Grid>

      <ProjectsTable onClickEdit={handleOpenUpdateProjectPopup} />
    </>
  );
}
