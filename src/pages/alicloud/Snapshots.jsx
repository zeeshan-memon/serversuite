import React, { useState, useEffect, useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import context from "../../context/Context";
import styled from "styled-components";
import Actions from "./SnapshotActions";
import { getSnapshots } from "../../network/ApiAxios";
import moment from "moment/moment";
import { useParams } from "react-router-dom";

const MainContainer = styled.div`
  height: 90%;
  width: 100%;
`;
const Title = styled.h2`
  padding-left: 10px;
  padding-bottom: 5px;
  line-height: 0px;
`;

const Snapshots = () => {
  const contextValue = useContext(context);
  const {instanceId} = useParams();
  const [data, setData] = useState([]);
  const [pageState, setPageState] = useState({size:10, page:1, totalCount:0});
  const [rowId, setRowId] = useState(null);

  useEffect(() => {
    const getInstancesCall = async () => {
      contextValue.setIsLoading(true);
      const res = await getSnapshots("alicloud", {provider:"Alicloud", "size":pageState.size, "page":pageState.page, instanceId:instanceId});
      contextValue.setIsLoading(false);
      console.log(res)
      if (res.status) {
        setPageState(old=>({...old, totalCount:res.response.body.totalCount}))
        console.log(res.response.body.snapshots);
        setData(res.response.body.snapshots);
      } else {
        contextValue.showToast("error", res.error);
      }
    };
    getInstancesCall();
    // eslint-disable-next-line
  }, [pageState.size, pageState.page]);

  const columns = [
    { field: "snapshotId", headerName: "Snapshot ID", width: 200 },
    { field: "snapshotName", headerName: "Snapshot Name", width: 200 },
    { field: "regionId", headerName: "Region", width: 130 },
    { field: "status", headerName: "Status", width: 130 },
    {
      field: "creationTime",
      headerName: "Created Date",
      width: 110,
      valueFormatter: (params) => moment(params.value).format("MM-DD-YYYY"),
    },
    {
      field: "acttions",
      headerName: "Actions",
      width: 80,
      type: "actions",
      renderCell: (params) => (
        <Actions {...{ params, rowId, setRowId, provider: "Contabo" }} />
      ),
    },
  ];

  return (
    <MainContainer>
      <Title>Snapshots</Title>
      {data && (
        <DataGrid
          rows={data}
          rowCount={pageState.totalCount}
          columns={columns}
          getRowId={(row) => row.snapshotId}
          rowsPerPageOptions={[10, 20, 30]}
          pageSize={pageState.size}
          onPageSizeChange={(newPageSize) =>setPageState(old=>({...old, size: newPageSize}))}
          page={pageState.page - 1}
          onPageChange={(newPage) => setPageState(old=>({...old, page:newPage + 1}))}
          pagination
          paginationMode="server"
        />
      )}
    </MainContainer>
  );
};

export default Snapshots;
