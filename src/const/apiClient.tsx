import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { baseURL } from "./api";


axios.defaults.baseURL = baseURL;
axios.defaults.headers.post["Content-Type"] = "application/json";


const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers['x-token'] = token;
  axios.defaults.headers['authorization'] = token;
}

// intercepting to capture errors
axios.interceptors.response.use(
  function (response) {
    return response.data ? response.data : response;
  },
  function (error) {
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      case 404:
        message = "Sorry! the data you are looking for could not be found";
        break;
      default:
        message = error.message || error;
    }
    return Promise.reject(message);
  }
);

const setAuthorization = (token : any) => {
  axios.defaults.headers['authorization'] = token;
  axios.defaults.headers['x-token'] = token;
};

class APIClient {
  get = (url : any, params : any) => {
    let response;

    let paramKeys : any = [];

    if (params) {
      Object.keys(params).map(key => {
        paramKeys.push(key + '=' + params[key]);
        return paramKeys;
      });

      const queryString = paramKeys && paramKeys.length ? paramKeys.join('&') : "";
      response = axios.get(`${url}?${queryString}`, params);
    } else {
      response = axios.get(`${url}`, params);
    }

    return response;
  };

  create = (url : any, data : any, headers : any = {}) => {
    return axios.post(url, data, headers);
  };

  update = (url : any, data : any) => {
    return axios.patch(url, data);
  };

  put = (url : any, data : any) => {
    return axios.put(url, data);
  };

  delete = (url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
    return axios.delete(url, { ...config });
  };
}
const getLoggedinUser = () => {
  const user = localStorage.getItem("authUser");
  if (!user) {
    return null;
  } else {
    return JSON.parse(user);
  }
};

export { APIClient, setAuthorization, getLoggedinUser };