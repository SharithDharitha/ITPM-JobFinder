import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ permissionLevel }) => {
  const isAuthenticated = localStorage.getItem("token") !== null;

  if (isAuthenticated) {
    return <Outlet />;
  } else {
    if (permissionLevel === "APPLICANT") {
      return <Navigate to="/" />;
    } else if (permissionLevel === "ADMIN") {
      return <Navigate to="/" />;
    } else if (permissionLevel === "COMPANY") {
      return <Navigate to="/" />;
    } else {
      return <Navigate to="/" />;
    }
  }

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  // return isAuthenticated ? <Outlet /> : <Navigate to="/userLogin" />;
};

export default PrivateRoute;
