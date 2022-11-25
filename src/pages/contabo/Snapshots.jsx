import React, { useState, useEffect, useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import context from "../../context/Context";
import styled from "styled-components";
import Actions from "./SnapshotActions";
import { getSnapshots } from "../../network/ApiAxios";
import { useParams } from "react-router-dom";
import moment from "moment/moment";

const MainContainer = styled.div`
  height: 90%;
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  /* justify-items: center; */
  justify-content: space-between;
  padding-bottom: 10px;
`
const Title = styled.h2`
  padding-left: 10px;
  padding-bottom: 5px;
  line-height: 0px;
`;

const Snapshots = () => {
  const contextValue = useContext(context);
  const [data, setData] = useState([]);
  const [pageState, setPageState] = useState({size:10, page:1, totalCount:0});
  const [rowId, setRowId] = useState(null);
  let { instanceId } = useParams();
  useEffect(() => {
    const getSnapshotsCall = async () => {
      contextValue.setIsLoading(true);
      const res = await getSnapshots("contabo", {provider:"Contabo", "size":pageState.size, "page":pageState.page, instanceId:instanceId});
      contextValue.setIsLoading(false);
      if (res.status) {
        setPageState(old=>({...old, totalCount:res.response.data.length}))
        console.log(res.response.data);
        setData(res.response.data);
      } else {
        contextValue.showToast("error", res.error);
      }
    };
    getSnapshotsCall();
    // eslint-disable-next-line
  }, [pageState.size, pageState.page]);

  const columns = [
    { field: "instanceId", headerName: "Instance ID", width: 130 },
    { field: "name", headerName: "Name", width: 100 },
    { field: "snapshotId", headerName: "Snapshot ID", width: 150 },
    { field: "description", headerName: "Description", width: 220 },
    {
      field: "createdDate",
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
        <Actions {...{ params, rowId, setRowId}} />
      ),
    },
  ];

  return (
    <MainContainer>
      <Wrapper>
          <Title>Snapshots</Title>
          
      </Wrapper>
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
