import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { Project, getProject, updateProject } from "../../slices/projectSlice";
import { useEffect, useState } from "react";
import ProjectPopup from "./ProjectPopup";

interface UpdateProjectPopupProps {
  projectId: number | null;
}

const UpdateProjectPopup = ({ projectId }: UpdateProjectPopupProps) => {
  const dispatch = useAppDispatch();
  const selectedProject = useAppSelector(
    (state) => state.projects.selectedProject
  );

  const [project, setProject] = useState<Project>({
    id: "",
    name: "",
    description: "",
  });

  // TODO: Handle projectId being null
  useEffect(() => {
    if (projectId) {
      dispatch(getProject(projectId));
    }
  }, [projectId]);

  useEffect(() => {
    if (selectedProject) {
      setProject({ ...selectedProject });
    }
  }, [selectedProject]);

  const submitUpdateProject = () => {
    dispatch(updateProject(project));
  };

  return (
    <>
      <ProjectPopup
        title="Update Project"
        project={project}
        setProject={setProject}
        onSubmit={submitUpdateProject}
      />
    </>
  );
};

export default UpdateProjectPopup;
