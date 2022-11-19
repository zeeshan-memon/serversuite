import { useState } from "react";
import Context from "./Context";
import { toast } from "react-toastify";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const LoadingState = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isToast, setIsToast] = useState(false);

  const showToast = (type, message) => {
    const toastConfigs = {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    };

    if (type === "error") {
      toast.error(message, toastConfigs);
    } else if (type === "success") {
      toast.success(message, toastConfigs);
    }
  };

  const showConfirmAlert = (apiCall) => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          style:{backgroundColor:"#00073D"},
          label: 'Yes',
          onClick: () => {apiCall()}
        },
        {
          style:{backgroundColor:"#00073D"},
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  };
 
  
  return (
    <Context.Provider
      value={{ isLoading, setIsLoading, isToast, setIsToast, showToast, showConfirmAlert }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default LoadingState;
