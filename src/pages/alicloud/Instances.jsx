import React, { useState, useEffect, useContext } from "react";

import context from "../../context/Context";
import Actions from "./Actions";
import { getInstaces } from "../../network/ApiAxios";
import moment from "moment/moment";
import Grid from "../../components/Grid";



const Instances = () => {
  const contextValue = useContext(context);
  const [data, setData] = useState([]);
  const [pageState, setPageState] = useState({size:10, page:1, totalCount:0});
  const [rowId, setRowId] = useState(null);

  useEffect(() => {
    const getInstances = async () => {
      contextValue.setIsLoading(true);
      const res = await getInstaces("alicloud", {provider:"Alicloud", "size":pageState.size, "page":pageState.page});
      contextValue.setIsLoading(false);
      if (res.status) {
        setPageState(old=>({...old, totalCount:res.response.body.totalCount}))
        console.log(res.response.body.instances);
        setData(res.response.body.instances);
      } else {
        contextValue.showToast("error", res.error);
      }
    };
    getInstances();
    // eslint-disable-next-line
  }, [pageState.size, pageState.page]);

  const columns = [
    { field: "instanceId", headerName: "Instance ID", width: 300 },
    { field: "instanceName", headerName: "Name", width: 200 },
    {
      field: "publicIpAddress",
      headerName: "IP",
      width: 130,
    },
    { field: "regionId", headerName: "Region", width: 130 },
    { field: "status", headerName: "Status", width: 80 },
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
    <Grid data={data} columns={columns} title={"Instances"} rowId={"instanceId"} paginationMode={"server"} pageState={pageState} setPageState={setPageState}  />
  );
};

export default Instances;
