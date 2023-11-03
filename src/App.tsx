import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserSettings from "./pages/UserSettings";
import NotFound from "./pages/NotFound";
import DefaultLayout from "./layouts/DefaultLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";
import NotificationBar from "./components/notification/NotificationBar";
import { Roles } from "./constants";
import Tasks from "./pages/Tasks";
import ViewTask from "./pages/ViewTask";
import Projects from "./pages/Projects";
import ViewProject from "./pages/ViewProject";
import Dashboards from "./pages/Dashboards";
import Dashboard from "./pages/Dashboard";
import { useAppDispatch, useAppSelector } from "./hooks/redux-hooks";
import { getUsers } from "./slices/userSlice";
import { getProjects } from "./slices/projectSlice";

function App() {
  const dispatch = useAppDispatch();

  const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);

  useEffect(() => {
    if (basicUserInfo) {
      dispatch(getUsers());
      dispatch(getProjects());
    }
  }, [basicUserInfo]);

  return (
    <>
      <NotificationBar />
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route
          element={
            <ProtectedLayout
              allowedRoles={[
                Roles.User,
                Roles.ProjectManager,
                Roles.Lead,
                Roles.Admin,
              ]}
            />
          }
        >
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<ProtectedLayout allowedRoles={[Roles.User]} />}>
          <Route path="/user-settings" element={<UserSettings />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/tasks/:id" element={<ViewTask />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ViewProject />} />
          <Route path="/dashboards" element={<Dashboards />} />
          <Route path="/dashboards/:id" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
