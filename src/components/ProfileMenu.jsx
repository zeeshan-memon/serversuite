import React, {useState, useContext} from 'react'
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import styled from "styled-components";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { logout } from '../network/ApiAxios';
import context from '../context/Context';

const MainContaoiner = styled.div`

`;

const Menu = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  /* background: #ffffff; */
  background: rgb(0, 7, 61);
  color: white;
`;
const MenuIitem= styled.div`
  cursor: pointer;
  padding: 5px;
  height: 28px;
  border-bottom: 1px solid rgb(187, 187, 187);
  &:hover {
    /* border-right: 4px solid white; */
    transition: 0.1s cubic-bezier(0.6, -0.28, 0.735, 0.045);
    background-color: rgb(70, 76, 109);
  }
`;


const ProfileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const contextValue = useContext(context)

  const logoutCall = async ()=> {
    setIsOpen(false);
    contextValue.setIsLoading(true);
    const res = await logout();
    contextValue.setIsLoading(false);
    console.log(res);
    if (res.status) {
      localStorage.clear();
    } else {
      contextValue.showToast("error", res.error);
    }

  }  
  return (
    <MainContaoiner>
    {/* <ListIcon /> */}
    <Popup
       trigger={<AccountCircleRoundedIcon style={{"font-size":"35px"}}/>}
      position="bottom right"
      // on="hover"
      closeOnDocumentClick
      // mouseLeaveDelay={300}
      // mouseEnterDelay={0}
      contentStyle={{ paddingTop: "10px", border: "none", backgroundColor:"#00073D"}}
      arrow={false}
      open= {isOpen}
      onOpen = {()=>setIsOpen(true)}
    >
      <Menu>
        <MenuIitem onClick={()=> {setIsOpen(false)}}>Switch Provider User</MenuIitem>
        <MenuIitem onClick={logoutCall}>LogOut</MenuIitem>
      </Menu>
    </Popup>
  </MainContaoiner>
  )
}

export default ProfileMenu