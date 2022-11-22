import React, {useContext} from "react";
import { Oval } from "react-loader-spinner";
import styled from "styled-components";
import loadingContext from "../context/Context";

const MainContainer = styled.div`
  /* background-color:rgba(0, 0,0, 0.5);  */
  /* transition: cubic-bezier(0.075, 0.82, 0.165, 1); */
`;

const LoaderContainer = styled.div`
  position: absolute;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color:rgba(0, 0,0, 0.2);  */
  /* transition: cubic-bezier(0.075, 0.82, 0.165, 1); */
  left: 100px;
  height: 100%;
  width: 100%;
`;
const Loader = () => {
  const context = useContext(loadingContext)   
  return (
   <MainContainer> 
   {context.isLoading && <LoaderContainer>
      <Oval
        height={100}
        width={100}
        color="#00073D"
        wrapperStyle={{}}
        wrapperClass=""
        visible={context.isLoading}
        ariaLabel="oval-loading"
        secondaryColor="#00073D"
        strokeWidth={7}
        strokeWidthSecondary={7}
      />
    </LoaderContainer>
   }
   </MainContainer>
  );
};

export default Loader;
