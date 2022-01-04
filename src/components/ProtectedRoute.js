import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useUserContext } from "../context/userContext";

const ProtectedRoute = ({ element, children, ...rest }) => {
  const { user, login } = useUserContext();

  return !user.isGuestUser ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
