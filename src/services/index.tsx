import { APIClient } from "../const/apiClient";
import { RegisterData } from "../interfaces";

import * as url from "./../const/url_api";

const api = new APIClient();

//Custom Login Method
export const postLogin = (data : any) => api.create(url.LOGIN, data);
export const postRegister = (data : RegisterData) => api.create(url.REGISTER, data);

export const getTasks = () => api.get(url.GET_TASKS, {});
export const getListUser = () => api.get(url.GET_LIST_USER, {});
export const getUserProfile= () => api.get(url.GET_USER_PROFILE, {});

export const postTask = (data: any) => api.create(url.POST_TASK, data);
export const deleteTask = (taskId: number) => api.get(`${url.DELETE_TASK}/${taskId}`, {});
export const markAsCompleteTask = (taskId: number) => api.put(`${url.MARK_COMPLETED_TASK}/${taskId}`, {});