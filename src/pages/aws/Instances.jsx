import React, { useState, useEffect, useContext } from "react";
import context from "../../context/Context";
import Actions from "./Actions";
import { getInstaces } from "../../network/ApiAxios";
import moment from "moment";
import Grid from "../../components/Grid";


const Instances = () => {
  const contextValue = useContext(context);
  const [data, setData] = useState([]);
  const [pageState, setPageState] = useState({size:10, page:1, totalCount:0, cursor:""});
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
              state:row.state.name,   
              createdAt:row.state.createdAt    
          })
        })
        setPageState(old=>({...old, totalCount: data.length}))
        setData(data);
      } else {
        contextValue.showToast("error", res.error);
      }
    };
    getInstances();
    // eslint-disable-next-line
  }, [pageState.size, pageState.page]);

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
      field: "createdAt",
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
        <Actions {...{ params, rowId, setRowId, provider: "aws" }} />
      ),
    },
  ];

  return (
    <Grid data={data} columns={columns} title={"Instances"} rowId={"arn"} paginationMode={"client"} pageState={pageState} setPageState={setPageState}  />
  );
};

export default Instances;
