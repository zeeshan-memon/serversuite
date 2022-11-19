import React from 'react'
import styled from "styled-components";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import {AiOutlineDown } from "react-icons/ai";

const MainContainer = styled.div``;
const TitleContainer = styled.div`
display: flex;
align-items: center;
padding: 15px;
font-size: 15px;
`;
const Title = styled.span`
display: flex;
/* justify-content: center; */
align-items: center;
`;

const SidebarItem = () => {
  return (
    <MainContainer>
    <TitleContainer>
      <Title>
        <HiOutlineDesktopComputer/>
        Contabo
        </Title>
        <AiOutlineDown/>
    </TitleContainer>
  </MainContainer>
);
}

export default SidebarItem