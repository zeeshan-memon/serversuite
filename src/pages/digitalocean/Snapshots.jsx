import React, { useState, useEffect, useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import context from "../../context/Context";
import styled from "styled-components";
import Actions from "./SnapshotActions";
import { getSnapshots } from "../../network/ApiAxios";
import moment from "moment";
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
  const {resourceId} = useParams();
  const [data, setData] = useState([]);
  const [pageState, setPageState] = useState({size:10, page:1, totalCount:0});

  useEffect(() => {
    const getSnapshotsCall = async () => {
      contextValue.setIsLoading(true);
      const res = await getSnapshots("digitalocean", {provider:"Digital Ocean", "size":pageState.size, "page":pageState.page, resourceId:resourceId});
      contextValue.setIsLoading(false);
      console.log(res)
      if (res.status) {
        setPageState(old=>({...old, totalCount:res.response.meta.total}))
        console.log(res.response.snapshots);
        setData(res.response.snapshots);
      } else {
        contextValue.showToast("error", res.error);
      }
    };
    getSnapshotsCall();
    // eslint-disable-next-line
  }, [pageState.size, pageState.page]);

  const columns = [
    { field: "id", headerName: "Snapshot ID", width: 130 },
    { field: "name", headerName: "Name", width: 250},
    { field: "resource_id", headerName: "Instance ID", width: 180 },
    {
      field: "created_at",
      headerName: "Created Date",
      width: 110,
      valueFormatter: (params) => moment(params.value).format("MM-DD-YYYY"),
    },
  ];

  const permissions =  JSON.parse(localStorage.getItem("permissions"));
  if(permissions["deleteSnapshot"])
      columns.push({
        field: "acttions",
        headerName: "Actions",
        width: 80,
        type: "actions",
        renderCell: (params) => (
          <Actions {...{ params}} />
        ),
      });

  return (
    <MainContainer>
      <Title>Snapshots</Title>
      {data && (
        <DataGrid
          rows={data}
          rowCount={pageState.totalCount}
          columns={columns}
          getRowId={(row) => row.id}
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
