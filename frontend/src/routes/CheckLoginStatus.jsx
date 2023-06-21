import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const CheckLoginStatus = () => {
  const permissionLevel = localStorage.getItem("permissionLevel");

  if (permissionLevel === "APPLICANT") {
    return <Navigate to="/user" />;

  } else if (permissionLevel === "ADMIN") {
    return <Navigate to="/admin" />;

  } else if (permissionLevel === "COMPANY") {
    return <Navigate to="/company" />;
    
  } else {
    return <Outlet />;
  }

  // If the user is authenticated then redirect to the dashboard
  // Otherwise redirect to the login page
  // return !isAuthenticated ? <Outlet /> : <Navigate to="/dashboard" />;
};

export default CheckLoginStatus;
