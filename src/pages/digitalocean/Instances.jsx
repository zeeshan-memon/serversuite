import React, { useState, useEffect, useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import context from "../../context/Context";
import styled from "styled-components";
import Actions from "./Actions";
import { getInstaces } from "../../network/ApiAxios";

const MainContainer = styled.div`
  height: 90%;
  width: 100%;
`;
const Title = styled.h2`
  padding-left: 10px;
  padding-bottom: 5px;
  line-height: 0px;
`;

const Instances = () => {
  const contextValue = useContext(context);
  const [data, setData] = useState([]);
  const [pageState, setPageState] = useState({size:1, page:1, totalCount:0});
  const [rowId, setRowId] = useState(null);

  useEffect(() => {
    const getInstances = async () => {
      contextValue.setIsLoading(true);
      const res = await getInstaces("digitalocean", {provider:"Digital Ocean", "size":pageState.size, "page":pageState.page});
      contextValue.setIsLoading(false);
      if (res.status) {
        setPageState(old=>({...old, totalCount:res.response.meta.total}))
        console.log(res.response.droplets);
        setData(res.response.droplets);
      } else {
        contextValue.showToast("error", res.error);
      }
    };
    getInstances();
    // eslint-disable-next-line
  }, [pageState.size, pageState.page]);

  const columns = [
    { field: "id", headerName: "Instance ID", width: 130 },
    { field: "name", headerName: "Name", width: 250},
    {
      field: "networks",
      headerName: "IP",
      width: 130,
      valueFormatter: (params) => params.value.v4[0].ip_address,
    },
    {
      field: "region",
      headerName: "Region",
      width: 130,
      valueFormatter: (params) => params.value.name,
    },
    { field: "memory", headerName: "Ram", width: 80 },
    { field: "vcpus", headerName: "Cpu Cores", width: 90 },
    { field: "disk", headerName: "Disk Size", width: 100 },
    { field: "status", headerName: "Status", width: 80 },
    { field: "osType", headerName: "OS Type", width: 90 },
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
      <Title>Instances</Title>
      {data && (
        <DataGrid
          rows={data}
          rowCount={pageState.totalCount}
          columns={columns}
          getRowId={(row) => row.id}
          rowsPerPageOptions={[1, 5, 10, 20, 30]}
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

export default Instances;
