import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
const useAuth = () => {
    const user = localStorage.getItem("token")?true:false
    return user;
  };
const ProtectedRoutes = () => {
    const location =  useLocation();
    const isAuth = useAuth();
    return isAuth ? (<Outlet/>) : (<Navigate to="/" replace={true} state={{from:location}}/>)
};

export default ProtectedRoutes;

