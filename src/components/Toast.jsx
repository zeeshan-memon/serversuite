import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
const MainContainer = styled.div`
  position: absolute;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const Toast = () => {
  return (
    <MainContainer>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </MainContainer>
  );
};

export default Toast;
