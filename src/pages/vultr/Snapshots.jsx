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
  margin-top: 60px;
`;
const TitleWrapper = styled.div`
 display: flex;
 align-items: center;
 justify-content: center;
 height: 50px;
 width: 150px;
 background-color: rgb(2, 10, 66);
 border-radius: 3px;
 z-index: 1;
 position: absolute;
 top: 15px;
 margin-left: 1px;
 /* border: 2px solid #000000 ; */
 box-shadow: 4px 4px 3px rgba(2, 2, 2, 0.5);
 /* margin-bottom: -1px; */
`;

const Title = styled.h2`
  color: white;
  font-weight: 300;
`;

const Snapshots = () => {
  const contextValue = useContext(context);
  const {osId} = useParams();
  const [data, setData] = useState([]);
  const [pageState, setPageState] = useState({size:10, page:1, totalCount:0, cursor:""});
  const [cursor, setCursor] = useState({next:"", previous:""});

  useEffect(() => {
    const getSnapshotsCall = async () => {
      contextValue.setIsLoading(true);
      const res = await getSnapshots("vultr", {provider:"Vultr", "size":pageState.size, "page":pageState.cursor, os_id: osId});
      contextValue.setIsLoading(false);
      console.log(res)
      if (res.status) {
        setPageState(old=>({...old, totalCount:res.response.meta.total}))
        setCursor({next:res.response.meta.links.next, previous:res.response.meta.links.prev})
        // console.log(res.response.instances);
        setData(res.response.snapshots);
      } else {
        contextValue.showToast("error", res.error);
      }
    };
    getSnapshotsCall();
    // eslint-disable-next-line
  }, [pageState.size, pageState.page]);

  const columns = [
    { field: "id", headerName: "Snapshot ID", width: 300 },
    { field: "os_id", headerName: "Os Id", minWidth:100 },
    { field: "description", headerName: "Description", width: 160 },
    { field: "status", headerName: "Status", width: 160 },
    {
      field: "date_created",
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
      <TitleWrapper>
      <Title>Snapshots</Title>
      </TitleWrapper>
      {data && (
        <DataGrid
        sx={{
          boxShadow: 3,
          border: 2,
          borderColor: '#FFFFFF',

          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "rgb(0, 7, 61)",
            color: "#FFFFFF",
            fontSize: 14
          },
          
          '& .MuiDataGrid-columnHeader:hover': {
            backgroundColor: "#FFFFF",
            color: '#FFFF',
          },
          // '& .MuiDataGrid-row:hover': {
          //   backgroundColor: "rgb(0, 7, 61)",
          //   color: 'white',
          // },
          // '.MuiDataGrid-columnSeparator': {
          //   display: 'none',
          // },
          '.MuiDataGrid-sortIcon': {
            color: '#FFFFFF',
            padding:"5px",
            fontSize:"20px",
            // background:"#FFFFFF"
          },

          '.MuiDataGrid-sortIcon:hover': {
            // color: '#FFFFFF',
            borderRadius:100,
            background:"rgba(223, 221, 221, 0.4)",
            padding:"5px",
            // opacity: 0.7
            // border: "4px solid white" 
          },

          '.MuiDataGrid-menuIconButton': {
            color: '#FFFFFF',
            padding:"5px",
            fontSize:"20px",
            // background:"#FFFFFF"
          },

          '.MuiDataGrid-menuIconButton:hover': {
            // color: '#FFFFFF',
            borderRadius:100,
            background:"rgba(223, 221, 221, 0.4)",
            padding:"5px",
            // opacity: 0.7
            // border: "4px solid white" 
          },        
          
          '.MuiDataGrid-row': {
            // color: '#FFFFFF',
            // borderRadius:100,
            // background:"rgba(223, 221, 221, 0.4)",
            background:"#f3f2f27c",
            // marginBottom:"5px",
            marginTop:"3px",
            // padding:"5px",
            // // opacity: 0.7
            // "border-bottom": "1px solid black" 
          },    

          '.MuiDataGrid-row:hover': {
            background:"#c7c3c379",   
          },        
          
          // background:"#111355",
          // color:"#f8f8f8"          
        }}
          rows={data}
          rowCount={pageState.totalCount}
          columns={columns}
          getRowId={(row) => row.id}
          rowsPerPageOptions={[10, 20, 30]}
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

export default Snapshots;
