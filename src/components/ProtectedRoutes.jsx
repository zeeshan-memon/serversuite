import React, { useContext } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import context from "../context/Context";

const useAuth = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(context);
  if (localStorage.getItem("token") && !isLoggedIn) setIsLoggedIn(true);
  return localStorage.getItem("token");
};

const ProtectedRoutes = ({allowPermission}) => {
  const isAuth = useAuth();
  const location = useLocation();
  const permissions =  JSON.parse(localStorage.getItem("permissions"));
  // console.log("permissions", permissions["viewSnapshots"])
  console.log(permissions)
  // console.log("allowPermission", allowPermission)
  
    console.log("permissions", permissions)
    return isAuth && permissions[allowPermission] ? (
      <Outlet />
    ) : isAuth ? (
      <Outlet />
    ) : (
      <Navigate to="/login" replace state={{ from: location }} />
    );
  }


export default ProtectedRoutes;
