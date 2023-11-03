import { useAppDispatch } from "../../hooks/redux-hooks";
import { NewProject, createProject } from "../../slices/projectSlice";
import { useState } from "react";
import ProjectPopup from "./ProjectPopup";
interface AddProjectPopupProps {
  //   open: boolean;
}

const AddProjectPopup = ({}: AddProjectPopupProps) => {
  const dispatch = useAppDispatch();

  const [project, setProject] = useState<NewProject>({
    name: "",
    description: "",
  });

  const submitNewProject = () => {
    if (project.name) {
      dispatch(createProject(project as NewProject));
    }
  };

  return (
    <>
      <ProjectPopup
        title="Create Project"
        project={project}
        setProject={setProject}
        onSubmit={submitNewProject}
      />
    </>
  );
};

export default AddProjectPopup;
