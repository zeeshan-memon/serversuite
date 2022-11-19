import React from "react";
import {Routes, Route } from "react-router-dom";
import ContaboInstances from "./pages/contabo/Instances";
import AWS from "./pages/aws/Instances";
import AliCloud from "./pages/alicloud/Instances";
import Vultr from "./pages/vultr/Instances";
import DigitalOcean from "./pages/digitalocean/Instances";
import Login from "./pages/Login";
import ProtectedRoutes from "./ProtectedRoutes";
const Views = () => {
  return (
    <Routes>
    <Route path="/" element={<div>Login</div>} />
    <Route element={<ProtectedRoutes />}>
      <Route path="/home" element={<div>HOME</div>} />
    </Route>
  </Routes>
  )
}

export default Views