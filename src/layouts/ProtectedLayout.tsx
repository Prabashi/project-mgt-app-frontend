import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { Navigate } from "react-router-dom";
import AccessDenied from "../pages/AccessDenied";

type ProtectedLayoutType = {
  allowedRoles: string[];
};

const ProtectedLayout = ({ allowedRoles }: ProtectedLayoutType) => {
  const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);

  if (!basicUserInfo) {
    return <Navigate replace to={"/login"} />;
  }

  if (
    !basicUserInfo.roles ||
    !basicUserInfo.roles.some((role: string) => allowedRoles.includes(role))
  ) {
    return <AccessDenied />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedLayout;
