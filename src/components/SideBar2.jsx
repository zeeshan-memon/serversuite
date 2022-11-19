import React from "react";
import styled from "styled-components";
import TocRoundedIcon from '@mui/icons-material/TocRounded';

const MainContainer = styled.div`
    background-color: green;
    height: 100vh;
    position: sticky;
    top: 0;
    left: 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const SideBar = styled.div`
    width: 225px;
    height: 90%;
    display: flex;
    justify-content: start;
    align-items: start;
    flex-direction: column;
    border: 1px solid black;
    padding: 15px;
    margin: 10px;
`

const MenuIcon = styled.div`
    display: flex;
    align-self: flex-end;
    border-radius: 5%;
    border: 1px solid black;
`

const SideBar2 = () => {
  return <MainContainer>
    <SideBar>
        <MenuIcon><TocRoundedIcon/></MenuIcon>
    </SideBar>
    </MainContainer>;
};

export default SideBar2;
