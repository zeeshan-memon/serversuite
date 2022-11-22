import React, { useContext } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import context from "./context/Context";

const useAuth = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(context);
  if (localStorage.getItem("token") && !isLoggedIn) setIsLoggedIn(true);
    return localStorage.getItem("token");
};
const ProtectedRoutes = () => {
  const isAuth = useAuth();
  const location = useLocation();
  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default ProtectedRoutes;
