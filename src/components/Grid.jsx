import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import styled from "styled-components";

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


const Grid = ({data, columns, title, rowId, pageState, setPageState, paginationMode}) => {
  return (
    <MainContainer>
      <TitleWrapper>
      <Title>{title}</Title>
      </TitleWrapper>
      {data && (
        <DataGrid
        sx={{
          boxShadow: 2,
          // border: 1,
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
            marginBottom:"3px",
            // marginTop:"5px",
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
          getRowId={(row) => row[rowId]}
          rowsPerPageOptions={[10, 20, 30]}
          pageSize={pageState.size}
          onPageSizeChange={(newPageSize) =>setPageState(old=>({...old, size: newPageSize}))}
          page={pageState.page - 1}
          onPageChange={(newPage) => setPageState(old=>({...old, page:newPage + 1}))}
          pagination
          paginationMode={paginationMode}
        />
      )}
    </MainContainer>
  );
}

export default Grid