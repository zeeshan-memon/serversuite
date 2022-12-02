import React, { useState, useEffect, useContext } from "react";
import context from "../../context/Context";
import Actions from "./SnapshotActions";
import { getSnapshots } from "../../network/ApiAxios";
import { useParams } from "react-router-dom";
import moment from "moment/moment";
import Grid from "../../components/Grid";

const Snapshots = () => {
  const contextValue = useContext(context);
  const [data, setData] = useState([]);
  const [pageState, setPageState] = useState({size:10, page:1, totalCount:0});

  let { instanceId } = useParams();
  useEffect(() => {
    const getSnapshotsCall = async () => {
      contextValue.setIsLoading(true);
      const res = await getSnapshots("contabo", {provider:"Contabo", "size":pageState.size, "page":pageState.page, instanceId:instanceId});
      contextValue.setIsLoading(false);
      if (res.status) {
        setPageState(old=>({...old, totalCount:res.response.data.length}))
        console.log(res.response.data);
        setData(res.response.data);
      } else {
        contextValue.showToast("error", res.error);
      }
    };
    getSnapshotsCall();
    // eslint-disable-next-line
  }, [pageState.size, pageState.page]);

  const columns = [
    { field: "instanceId", headerName: "Instance ID", width: 130 },
    { field: "name", headerName: "Name", width: 100 },
    { field: "snapshotId", headerName: "Snapshot ID", width: 150 },
    { field: "description", headerName: "Description", width: 220 },
    {
      field: "createdDate",
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
