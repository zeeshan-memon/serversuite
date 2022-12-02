import React, { useState, useEffect, useContext } from "react";
import context from "../../context/Context";
import Actions from "./SnapshotActions";
import { getSnapshots } from "../../network/ApiAxios";
import moment from "moment/moment";
import { useParams } from "react-router-dom";
import Grid from "../../components/Grid";

const Snapshots = () => {
  const contextValue = useContext(context);
  const {instanceId} = useParams();
  const [data, setData] = useState([]);
  const [pageState, setPageState] = useState({size:10, page:1, totalCount:0});

  useEffect(() => {
    const getInstancesCall = async () => {
      contextValue.setIsLoading(true);
      const res = await getSnapshots("alicloud", {provider:"Alicloud", "size":pageState.size, "page":pageState.page, instanceId:instanceId});
      contextValue.setIsLoading(false);
      console.log(res)
      if (res.status) {
        setPageState(old=>({...old, totalCount:res.response.body.totalCount}))
        console.log(res.response.body.snapshots);
        setData(res.response.body.snapshots);
      } else {
        contextValue.showToast("error", res.error);
      }
    };
    getInstancesCall();
    // eslint-disable-next-line
  }, [pageState.size, pageState.page]);

  const columns = [
    { field: "snapshotId", headerName: "Snapshot ID", width: 200 },
    { field: "snapshotName", headerName: "Snapshot Name", width: 200 },
    { field: "regionId", headerName: "Region", width: 130 },
    { field: "status", headerName: "Status", width: 130 },
    {
      field: "creationTime",
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
  <Grid data={data} columns={columns} title={"Snapshots"} rowId={"snapshotId"} paginationMode={"server"} pageState={pageState} setPageState={setPageState}  />
  );
};

export default Snapshots;
