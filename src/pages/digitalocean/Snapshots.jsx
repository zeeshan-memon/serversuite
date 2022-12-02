import React, { useState, useEffect, useContext } from "react";
import context from "../../context/Context";
import Actions from "./SnapshotActions";
import { getSnapshots } from "../../network/ApiAxios";
import moment from "moment";
import { useParams } from "react-router-dom";
import Grid from "../../components/Grid";

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
    { field: "name", headerName: "Name", width: 350},
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
    <Grid data={data} columns={columns} title={"Snapshots"} rowId={"id"} paginationMode={"server"} pageState={pageState} setPageState={setPageState}  />
  );
};

export default Snapshots;
