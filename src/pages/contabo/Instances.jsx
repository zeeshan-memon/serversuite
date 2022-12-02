import React, { useState, useEffect, useContext } from "react";
import context from "../../context/Context";
import Actions from "./Actions";
import { getInstaces } from "../../network/ApiAxios";
import moment from "moment";
import Grid from "../../components/Grid";


const Instances = () => {
  const contextValue = useContext(context);
  const [data, setData] = useState([]);
  const [pageState, setPageState] = useState({size:10, page:1, totalCount:0});
  const [rowId, setRowId] = useState(null);

  useEffect(() => {
    const getInstances = async () => {
      contextValue.setIsLoading(true);
      const res = await getInstaces("contabo", {provider:"Contabo", "size":pageState.size, "page":pageState.page});
      contextValue.setIsLoading(false);
      if (res.status) {
        setPageState(old=>({...old, totalCount:res.response._pagination.totalElements}))
        console.log(res.response.data);
        setData(res.response.data);
      } else {
        contextValue.showToast("error", res.error);
      }
    };
    getInstances();
    // eslint-disable-next-line
  }, [pageState.size, pageState.page]);

  const columns = [
    { field: "instanceId", headerName: "Instance ID", width: 130 },
    { field: "name", headerName: "Name", width: 100 },
    {
      field: "ipConfig",
      headerName: "IP",
      width: 130,
      valueFormatter: (params) => params.value.v4.ip,
    },
    { field: "region", headerName: "Region", width: 130 },
    { field: "ramMb", headerName: "Ram", width: 80 },
    { field: "cpuCores", headerName: "Cpu Cores", width: 90 },
    { field: "diskMb", headerName: "Disk Size", width: 100 },
    { field: "status", headerName: "Status", width: 80 },
    { field: "osType", headerName: "OS Type", width: 90 },
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
    <Grid data={data} columns={columns} title={"Instances"} rowId={"instanceId"} paginationMode={"server"} pageState={pageState} setPageState={setPageState}  />
  );
};

export default Instances;
