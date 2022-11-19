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
  const [pageState, setPageState] = useState({size:5, page:1, totalCount:0, cursor:""});
  const [rowId, setRowId] = useState(null);
  // const [cursor, setCursor] = useState({next:"", previous:""});

  useEffect(() => {
    const getInstances = async () => {
      contextValue.setIsLoading(true);
      const res = await getInstaces("aws", {provider:"AWS", "size":pageState.size, "page":pageState.cursor});
      contextValue.setIsLoading(false);
      console.log(res)
      if (res.status) {
        // setPageState(old=>({...old, totalCount:res.response.meta.total}))
        // setCursor({next:res.response.meta.links.next, previous:res.response.meta.links.prev})
        // console.log(res.response.instances);
        const data = res.response.instances.map(row=>{
          return(
            {
              name: row.name,
              blueprintName:row.blueprintName,
              arn: row.arn,
              location: row.location.regionName,
              ip: row.publicIpAddress,
              ram:row.hardware.ramSizeInGb,
              cpus:row.hardware.cpuCount,
              disk:row.hardware.disks[0].sizeInGb,
              state:row.state.name    
          })
        })
        setData(data);
      } else {
        contextValue.showToast("error", res.error);
      }
    };
    getInstances();
    // eslint-disable-next-line
  }, []);

  const columns = [
    // { field: "sshKeyName", headerName: "Instance ID", width: 300 },
    { field: "name", headerName: "Name", minWidth:250 },
    {
      field: "ip",
      headerName: "IP",
      width: 130,
    },
    { field: "location", headerName: "Region", width: 130,},
    { field: "ram", headerName: "Ram", width: 80, },
    { field: "cpus", headerName: "Cpu Cores", width: 90,},
    { field: "disk", headerName: "Disk Size", width: 100},
    { field: "state", headerName: "Status", width: 80, },
    { field: "blueprintName", headerName: "OS Type", width: 180 },
    {
      field: "acttions",
      headerName: "Actions",
      width: 80,
      type: "actions",
      renderCell: (params) => (
        <Actions {...{ params, rowId, setRowId, provider: "aws" }} />
      ),
    },
  ];

  return (
    <MainContainer>
      <Title>Instances</Title>
      {data && (
        <DataGrid
          rows={data}
          // rowCount={pageState.totalCount}
          columns={columns}
          getRowId={(row) => row.name}
          rowsPerPageOptions={[5, 10, 20, 30]}
          pageSize={pageState.size}
          onPageSizeChange={(newPageSize) =>setPageState(old=>({...old, size: newPageSize}))}
          page={pageState.page - 1}
          onPageChange={(newPage) => {
              setPageState(old=>({...old, page:newPage + 1}))          
          }}
          // pagination
          // paginationMode="server"
        />
      )}
    </MainContainer>
  );
};

export default Instances;
