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
  const [pageState, setPageState] = useState({size:1, page:1, totalCount:0, cursor:""});
  const [rowId, setRowId] = useState(null);
  const [cursor, setCursor] = useState({next:"", previous:""});

  useEffect(() => {
    const getInstances = async () => {
      contextValue.setIsLoading(true);
      const res = await getInstaces("vultr", {provider:"Vultr", "size":pageState.size, "page":pageState.cursor});
      contextValue.setIsLoading(false);
      console.log(res)
      if (res.status) {
        setPageState(old=>({...old, totalCount:res.response.meta.total}))
        setCursor({next:res.response.meta.links.next, previous:res.response.meta.links.prev})
        // console.log(res.response.instances);
        setData(res.response.instances);
      } else {
        contextValue.showToast("error", res.error);
      }
    };
    getInstances();
    // eslint-disable-next-line
  }, [pageState.size, pageState.page]);

  const columns = [
    { field: "id", headerName: "Instance ID", width: 300 },
    { field: "label", headerName: "Name", minWidth:250 },
    {
      field: "main_ip",
      headerName: "IP",
      width: 130,
    },
    { field: "region", headerName: "Region", width: 130 },
    { field: "ram", headerName: "Ram", width: 80 },
    { field: "vcpu_count", headerName: "Cpu Cores", width: 90 },
    { field: "disk", headerName: "Disk Size", width: 100 },
    { field: "power_status", headerName: "Status", width: 80 },
    { field: "os", headerName: "OS Type", width: 180 },
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

export default Instances;
