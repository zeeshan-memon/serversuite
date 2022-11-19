import React from "react";
import styled from "styled-components";
import SidebarItm from "./SidebarItem";

const MainContainer = styled.div`
  display: flex;
  height: 100vh;
  color: white;
`;

const SideBar = styled.div`
  width: 200px;
  flex-shrink: 0;
  background-color: rgba(22, 22, 22, 1);
  height: 100%;
  overflow: auto;
`;

const SideBar3 = () => {
  return (
    <MainContainer>
      <SideBar><SidebarItm/></SideBar>
    </MainContainer>
  );
};

export default SideBar3;
