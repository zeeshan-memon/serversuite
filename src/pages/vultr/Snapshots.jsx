import React, { useState, useEffect, useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import context from "../../context/Context";
import styled from "styled-components";
import Actions from "./SnapshotActions";
import { getSnapshots } from "../../network/ApiAxios";
import { useParams } from "react-router-dom";
import moment from "moment";
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
  const {osId} = useParams();
  const [data, setData] = useState([]);
  const [pageState, setPageState] = useState({size:10, page:1, totalCount:0, cursor:""});
  const [rowId, setRowId] = useState(null);
  const [cursor, setCursor] = useState({next:"", previous:""});

  useEffect(() => {
    const getSnapshotsCall = async () => {
      contextValue.setIsLoading(true);
      const res = await getSnapshots("vultr", {provider:"Vultr", "size":pageState.size, "page":pageState.cursor, os_id: osId});
      contextValue.setIsLoading(false);
      console.log(res)
      if (res.status) {
        setPageState(old=>({...old, totalCount:res.response.meta.total}))
        setCursor({next:res.response.meta.links.next, previous:res.response.meta.links.prev})
        // console.log(res.response.instances);
        setData(res.response.snapshots);
      } else {
        contextValue.showToast("error", res.error);
      }
    };
    getSnapshotsCall();
    // eslint-disable-next-line
  }, [pageState.size, pageState.page]);

  const columns = [
    { field: "id", headerName: "Snapshot ID", width: 300 },
    { field: "os_id", headerName: "Os Id", minWidth:100 },
    { field: "description", headerName: "Description", width: 160 },
    { field: "status", headerName: "Status", width: 160 },
    {
      field: "date_created",
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
        <Actions {...{ params, rowId, setRowId, provider: "Vultr" }} />
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
          getRowId={(row) => row.id}
          rowsPerPageOptions={[10, 20, 30]}
          pageSize={pageState.size}
          onPageSizeChange={(newPageSize) =>setPageState(old=>({...old, size: newPageSize}))}
          page={pageState.page - 1}
          onPageChange={(newPage) => {
            if((newPage + 1) > pageState.page ){
              setPageState(old=>({...old, page:newPage + 1, cursor:cursor.next}))
            }else{
              setPageState(old=>({...old, page:newPage + 1, cursor:cursor.previous}))
            }
          
          }}
          pagination
          paginationMode="server"
        />
      )}
    </MainContainer>
  );
};

export default Snapshots;
