import React, {useContext} from "react";
import { Oval } from "react-loader-spinner";
import styled from "styled-components";
import loadingContext from "../context/Context";

const MainContainer = styled.div``;

const LoaderContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color:rgba(0, 0,0, 0.5);  */
  /* transition: cubic-bezier(0.075, 0.82, 0.165, 1); */
  height: 100%;
  width: 100%;
`;
const Loader = () => {
  const context = useContext(loadingContext)   
  return (
   <MainContainer> 
   {context.isLoading && <LoaderContainer>
      <Oval
        height={80}
        width={80}
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass=""
        visible={context.isLoading}
        ariaLabel="oval-loading"
        secondaryColor="#4fa94d"
        strokeWidth={5}
        strokeWidthSecondary={5}
      />
    </LoaderContainer>
   }
   </MainContainer>
  );
};

export default Loader;
