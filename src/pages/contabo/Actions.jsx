import React, {useContext, useState} from "react";
// import ListIcon from "@mui/icons-material/List";
import MoreVertSharpIcon from '@mui/icons-material/MoreVertSharp';
import styled from "styled-components";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { createSnapshot, startInstance, restartInstance, stopInstance } from "../../network/ApiAxios";
import context from "../../context/Context";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";

const MainContaoiner = styled.div``;

const Menu = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  /* background: #ffffff; */
  /* background: rgb(0, 7, 61); */
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


const Actions = ({ params, rowId, setRowId }) => {
  const contextValue = useContext(context);
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate();

  const createSnapshotCall = async ()=>{
    setIsOpen(false);
    const desc = `${params.row.name}-${moment().format("MMDDYYYYhmmss")}`
    contextValue.setIsLoading(true);
    const res = await createSnapshot('contabo', {provider: "Contabo", instanceId: params.row.instanceId, instanceName: params.row.name, description: desc})
    console.log(res)
    contextValue.setIsLoading(false);
    if (res.status) {
      contextValue.showToast("success", "Snapshot created.");
    } else {
      contextValue.showToast("error", res.error);
    }
  }
 
  const startInstanceCall = async ()=>{
    setIsOpen(false);
    contextValue.setIsLoading(true);
    const res = await startInstance('contabo', {provider: "Contabo", instanceId: params.row.instanceId})
    console.log(res)
    contextValue.setIsLoading(false);
    if (res.status) {
      contextValue.showToast("success", "Instance Started.");
    } else {
      contextValue.showToast("error", res.error);
    }
  }
  
  const restartInstanceCall = async ()=>{
    setIsOpen(false);
    contextValue.setIsLoading(true);
    const res = await restartInstance('contabo', {provider: "Contabo", instanceId: params.row.instanceId})
    console.log(res)
    contextValue.setIsLoading(false);
    if (res.status) {
      contextValue.showToast("success", "Instance Restarted.");
    } else {
      contextValue.showToast("error", res.error);
    }
  }
  
  const stopInstanceCall = async ()=>{
    setIsOpen(false);
    contextValue.setIsLoading(true);
    const res = await stopInstance('contabo', {provider: "Contabo", instanceId: params.row.instanceId})
    console.log(res)
    contextValue.setIsLoading(false);
    if (res.status) {
      contextValue.showToast("success", "Instance Stopped.");
    } else {
      contextValue.showToast("error", res.error);
    }
  }

  const getSnapshots = ()=>{
    navigate(`/contabo/snapshots/${params.row.instanceId}`);
  }
  
  return (
    <MainContaoiner>
      {/* <ListIcon /> */}
      <Popup
        trigger={<MoreVertSharpIcon />}
        position="left top"
        // on="hover"
        closeOnDocumentClick
        // mouseLeaveDelay={300}
        mouseEnterDelay={0}
        contentStyle={{ padding: "0px", border: "none", backgroundColor:"#00073D" }}
        arrow={false}
        open= {isOpen}
        onOpen = {()=>setIsOpen(true)}
      >
        <Menu>
          <MenuIitem onClick={getSnapshots}>View Snapshots</MenuIitem>
          <MenuIitem onClick={()=> contextValue.showConfirmAlert(setIsOpen, createSnapshotCall)}>Create Snapshot</MenuIitem>
          <MenuIitem onClick={()=> contextValue.showConfirmAlert(setIsOpen, startInstanceCall)}>Start</MenuIitem>
          <MenuIitem onClick={()=> contextValue.showConfirmAlert(setIsOpen, restartInstanceCall)}> Restart</MenuIitem>
          <MenuIitem onClick={()=> contextValue.showConfirmAlert(setIsOpen, stopInstanceCall)}>Stop</MenuIitem>
        </Menu>
      </Popup>
    </MainContaoiner>
  );
};

export default Actions;
