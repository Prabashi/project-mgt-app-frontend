import React from "react";
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

function App() {
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
        <Route element={<ProtectedLayout allowedRoles={[Roles.Admin]} />}>
          <Route path="/user-settings" element={<UserSettings />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
