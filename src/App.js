import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import ContaboInstances from "./pages/contabo/Instances";
import AWS from "./pages/aws/Instances";
import AliCloud from "./pages/alicloud/Instances";
import Vultr from "./pages/vultr/Instances";
import DigitalOcean from "./pages/digitalocean/Instances";
import SideBar from "./components/SideBar";
import styled from "styled-components";
import Login from "./pages/Login";
import LoadingState from "./context/State";
import Loader from "./components/Loader";
import Toast from "./components/Toast";
import ProtectedRoutes from "./ProtectedRoutes";
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
    <LoadingState>
      <MainContainer>
        <Loader />
        <Toast/>
        <Router>
          <SideBar>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<ProtectedRoutes/>}>
            <Route path="/contabo" element={<ContaboInstances />} />
            {/* <Route path="/contabo/screenshots" element={<ContaboScreenshots />} /> */}
            <Route path="/aws" element={<AWS />} />
            <Route path="/alicloud" element={<AliCloud />} />
            <Route path="/vultr" element={<Vultr />} />
            <Route path="/digitalocean" element={<DigitalOcean />} />
         </Route>
        </Routes>
          </SideBar>
      </Router>
      </MainContainer>
    </LoadingState>
  );
};

export default App;
