import { createAsyncThunk } from "@reduxjs/toolkit";
import habitaskApi from "../../const/api";
import { AuthResponse, LoginData, LoginResponse, RegisterData } from "../../interfaces";
import { postLogin, postRegister } from "../../services";
import { getUserProfileAction } from "./userActions";
import { logout } from "../slices/authReducer";
import { clearTasks } from "../slices/taskReducer";
import { setAuthorization } from "../../const/apiClient";

export const loginAction  = createAsyncThunk('autLogin', async ({
    email,
    password
}: LoginData, { rejectWithValue, dispatch } ) => {
    try {
        const response = await postLogin({
            email: email,
            password: password
        });
        console.log('loginAction: ', response);
        if(response.status) {
            const token = response.data.token;
            localStorage.setItem('token', token);
            setAuthorization(token);
            // dispatch(getUserProfileAction());
            return response.data;
        }

        return rejectWithValue({
            errorMessage: response.data.message
        });
        
    } catch (error) {
        console.log(error);
        return rejectWithValue({
            errorMessage: error.message
        });
    }
});



export const registerAction  = createAsyncThunk('registerAction', async (
    data: RegisterData, { rejectWithValue, dispatch } ) => {
    try {
        const response = await postRegister(data);
        console.log(response);
        if(response.status) return response.data;

        return rejectWithValue({ errorMessage: response.data.message });
        
    } catch (error) {
        console.log(error);
        return rejectWithValue({
            errorMessage: error.message
        });
    }
});

export const logoutAction = () => async (dispatch : any) => {
    try {
        console.log('logout...');
      localStorage.removeItem("token");
      dispatch(clearTasks());
      dispatch(logout());
  
    } catch (error : any) {
        console.log('error logout')
        localStorage.removeItem("token");
        dispatch(logout());
    }
  };

