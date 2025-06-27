// src/components/ProtectedRoute.jsx

import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedTypes }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // Not logged in? Send to login page
  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  // If allowedTypes is specified, check if user type matches
  if (allowedTypes?.length && !allowedTypes.includes(user.type)) {
    return <Navigate to="/" replace />;
  }

  // All checks passed, render the protected component
  return children;
};

export default ProtectedRoute;
