import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContaboInstances from "./pages/contabo/Instances";
import AWS from "./pages/aws/Instances";
import AliCloud from "./pages/alicloud/Instances";
import Vultr from "./pages/vultr/Instances";
import DigitalOcean from "./pages/digitalocean/Instances";
import SideBar from "./components/SideBar";
import styled from "styled-components";
import Login from "./pages/Login";
import State from "./context/State";
import Loader from "./components/Loader";
import Toast from "./components/Toast";
import ProtectedRoutes from "./ProtectedRoutes";
import Redirect from "./pages/Redirect";
import ContaboSnapshots from "./pages/contabo/Snapshots";
import VulrtSnapshots from "./pages/vultr/Snapshots";
import AlicloudSnapshots from "./pages/alicloud/Snapshots";
import DegitalOceanSnapshots from "./pages/digitalocean/Snapshots";
import AwsSnapshots from "./pages/aws/Snapshots";
const MainContainer = styled.div`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  font-family: "IBM Plex Sana Thai Looped", sans-serif;
`;
// const Body = styled.div`
// flex: 1;
// background-color: red;
// padding: 10px;
// `

const App = () => {
  return (
    <State>
      <MainContainer>
        <Loader />
        <Toast />
        <Router>
          <SideBar>
            <Routes>
            <Route path="/login" element={<Login />} />
              <Route element={<ProtectedRoutes />}>
                <Route path="/contabo" element={<ContaboInstances />} />
                <Route path="/contabo/snapshots/:instanceId" element={<ContaboSnapshots />} />
                <Route path="/aws" element={<AWS />} />
                <Route path="/aws/snapshots/:name" element={<AwsSnapshots />} />
                <Route path="/alicloud" element={<AliCloud />} />
                <Route path="/alicloud/snapshots/:instanceId" element={<AlicloudSnapshots />} />
                <Route path="/vultr" element={<Vultr />} />
                <Route path="/vultr/snapshots/:osId" element={<VulrtSnapshots />} />
                <Route path="/digitalocean" element={<DigitalOcean />} />
                <Route path="/digitalocean/snapshots/:resourceId" element={<DegitalOceanSnapshots />} />
                <Route path="*" element={<Redirect/>} />
              </Route>
            </Routes>
          </SideBar>
        </Router>
      </MainContainer>
    </State>
  );
};

export default App;
