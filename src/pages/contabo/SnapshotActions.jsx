import React, {useContext} from "react";
import styled from "styled-components";
import "reactjs-popup/dist/index.css";
import { deleteSnapshot } from "../../network/ApiAxios";
import context from "../../context/Context";
import DeleteIcon from '@mui/icons-material/Delete';

const MainContaoiner = styled.div`
  cursor: pointer;
  padding: 5px;
  height: 28px;
  /* border-bottom: 1px solid rgb(187, 187, 187); */
  &:hover {
    /* border-right: 4px solid white; */
    transition: 0.1s cubic-bezier(0.6, -0.28, 0.735, 0.045);
    background-color: rgb(255, 255, 255);
  }
  `;

const SnapshotActions = ({ params}) => {
  const contextValue = useContext(context);
const deleteSnapshotCall = async ()=>{
    contextValue.setIsLoading(true);
    const res = await deleteSnapshot('contabo', {provider: "Contabo", instanceId: params.row.instanceId, snapshotId: params.row.snapshotId})
    console.log(res)
    contextValue.setIsLoading(false);
    if (res.status) {
      contextValue.showToast("success", "Snapshot Deleted.");
    } else {
      contextValue.showToast("error", res.error);
    }
  }

  return (
    <MainContaoiner onClick={()=> contextValue.showConfirmAlert(false, deleteSnapshotCall)}>
      <DeleteIcon/>
    </MainContaoiner>
  );
};

export default SnapshotActions;
