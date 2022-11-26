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
  const [data, setData] = useState([]);
  const [pageState, setPageState] = useState({size:10, page:1, totalCount:0, cursor:""});
  const {name} = useParams();
  // const [cursor, setCursor] = useState({next:"", previous:""});

  useEffect(() => {
    const getSnapshotsCall = async () => {
      contextValue.setIsLoading(true);
      const res = await getSnapshots("aws", {provider:"AWS", "size":pageState.size, "page":pageState.cursor, instanceName: name});
      contextValue.setIsLoading(false);
      console.log(res)
      if (res.status) {
        // setPageState(old=>({...old, totalCount:res.response.meta.total}))
        // setCursor({next:res.response.meta.links.next, previous:res.response.meta.links.prev})
        // console.log(res.response.instances);
        // const data = res.response.instances.map(row=>{
        //   return(
        //     {
        //       name: row.name,
        //       blueprintName:row.blueprintName,
        //       arn: row.arn,
        //       location: row.location.regionName,
        //       ip: row.publicIpAddress,
        //       ram:row.hardware.ramSizeInGb,
        //       cpus:row.hardware.cpuCount,
        //       disk:row.hardware.disks[0].sizeInGb,
        //       state:row.state.name    
        //   })
        // })
        setData(res.response.instanceSnapshots);
      } else {
        contextValue.showToast("error", res.error);
      }
    };
    getSnapshotsCall();
    // eslint-disable-next-line
  }, [pageState.size, pageState.page]);

  const columns = [
    // { field: "sshKeyName", headerName: "Instance ID", width: 300 },
    { field: "fromInstanceName", headerName: "Name", minWidth:250 },
    { field: "name", headerName: "Snapshot", minWidth:250 },
    { field: "resourceType", headerName: "Resource Type", width: 150,},
    { field: "sizeInGb", headerName: "Size", width: 80, },
    { field: "state", headerName: "Status", width: 80, },
    {
      field: "location",
      headerName: "Region",
      width: 130,
      valueFormatter: (params) => params.value.regionName,
    },
    {
      field: "createdAt",
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
          // rowCount={pageState.totalCount}
          columns={columns}
          getRowId={(row) => row.name}
          rowsPerPageOptions={[10, 20, 30]}
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

export default Snapshots;
