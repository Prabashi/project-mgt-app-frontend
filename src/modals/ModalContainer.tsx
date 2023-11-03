// ModalContainer.tsx
import React from "react";
import { useSelector } from "react-redux";
import AddTaskPopup from "../components/task/AddTaskPopup";
import UpdateTaskPopup from "../components/task/UpdateTaskPopup";
import AddProjectPopup from "../components/project/AddProjectPopup";
import UpdateProjectPopup from "../components/project/UpdateProjectPopup";
import AddDashboardPopup from "../components/dashboard/AddDashboardPopup";
import UpdateDashboardPopup from "../components/dashboard/UpdateDashboardPopup";
import { useAppSelector } from "../hooks/redux-hooks";
// Import other modal components

const ModalContainer = () => {
  const openModal = useAppSelector((state) => state.modal.openModal);
  const modalProps = useAppSelector((state) => state.modal.modalProps);

  const renderModal = () => {
    switch (openModal) {
      case "addTask":
        return <AddTaskPopup />;
      case "updateTask":
        return <UpdateTaskPopup taskId={modalProps?.taskId} />;
      case "addProject":
        return <AddProjectPopup />;
      case "updateProject":
        return <UpdateProjectPopup projectId={modalProps?.projectId} />;
      case "addDashboard":
        return <AddDashboardPopup />;
      case "updateDashboard":
        return <UpdateDashboardPopup dashboardId={modalProps?.dashboardId} />;
      // Add other cases for different modals
      default:
        return null;
    }
  };

  return <>{renderModal()}</>;
};

export default ModalContainer;
