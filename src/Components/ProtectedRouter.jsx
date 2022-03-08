import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import clientPath from "../constants/clientPath";

function ProtectedRoute({ children }) {
  const location = useLocation();
  const accessToken = localStorage.getItem("AdminAccessToken");
  console.log(accessToken);
  const isLoggedIn = Boolean(accessToken);
  localStorage.setItem("CACHED_URL", location.pathname);
  const cachedUrl = localStorage.getItem("CACHED_URL");
  console.log(cachedUrl);
  if (isLoggedIn) {
    return children;
  }
  if (isLoggedIn && cachedUrl) {
    return <Navigate to={cachedUrl} />;
  }
  if (!isLoggedIn && cachedUrl) {
    localStorage.removeItem("CACHED_URL");
    return <Navigate to={clientPath.LOGIN} />;
  }
  return <Navigate to={clientPath.LOGIN} />;
}

export default ProtectedRoute;
