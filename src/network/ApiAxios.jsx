import axios from "axios";
import { AES, enc } from "crypto-js";
const ENCRYPTIONKEY = "SKs9uZKvZU2VOFjQISEg4tJQyAeqX3Mm";
const ENCRYPTIONIV = "53og3sqCcKdQl5U";
const encrypted = false;

// const encryptData = (data) => {
//   if (encrypted) {
//     const d = AES.encrypt(JSON.stringify(data), enc.Utf8.parse(ENCRYPTIONKEY), {
//       iv: enc.Utf8.parse(ENCRYPTIONIV),
//     });

//     return {
//       d: d.toString(),
//     };
//   } else {
//     return data;
//   }
// };

const decryptData = (data) => {
  if (encrypted) {
    const bytes = AES.decrypt(
      data.d.toString(),
      enc.Utf8.parse(ENCRYPTIONKEY),
      {
        iv: enc.Utf8.parse(ENCRYPTIONIV),
      }
    );

    return JSON.parse(bytes.toString(enc.Utf8));
  } else {
    return data;
  }
};

const instance = axios.create({
  baseURL: "http://localhost:5000/api/v1/",
});

instance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = token;
  config.headers.ContentType = "application/json";
  return config;
});

instance.interceptors.response.use(
  (response) => {
    return decryptData(response.data);
  },
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return {
        status:false,
        error: error.response.data
      };
    } else if (error.message === "Network Error") {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js;
      return {
        status:false,
        error:error.message
      };
    }else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js;
      return {
        status:false,
        error:error.request
      }; 
    }  else {
      // Something happened in setting up the request that triggered an Error
      return {
        status:false,
        error:error.message
      };
    }
  }
);

export const getDomain = async () => await instance.get("domain");

export const login = async (email, password, domain) =>
  await instance.post("adlogin", { email, password, domain });

export const logout = async (token) => await instance.post("logout", { token });

export const getInstaces = async (path, body) =>
  await instance.post(`/${path}/listInstances`, body);

export const getSnapshots = async (path, body) =>
  await instance.post(`/${path}/listsnapshots`, body);

export const createSnapshot = async (path, body) =>
  await instance.post(`/${path}/createsnapshot`, body);

export const startInstance = async (path, body) =>
  await instance.post(`/${path}/startInstance`, body);

export const restartInstance = async (path, body) =>
  await instance.post(`/${path}/restartInstance`, body);

export const stopInstance = async (path, body) =>
  await instance.post(`/${path}/shutdownInstance`, body);

export const deleteSnapshot = async (path, body) =>
  await instance.post(`/${path}/deleteSnapshot`, body);
