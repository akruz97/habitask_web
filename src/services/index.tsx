import { APIClient } from "../const/apiClient";

import * as url from "./../const/url_api";

const api = new APIClient();

//Custom Login Method
export const postLogin = (data : any) => api.create(url.LOGIN, data);
export const postRegister = (data : any) => api.create(url.REGISTER, data);

export const getTasks = () => api.get(url.GET_TASKS, {});
export const getListUser = () => api.get(url.GET_LIST_USER, {});
