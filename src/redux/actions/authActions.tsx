import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginData, RegisterData } from "../../interfaces";
import { postLogin, postRegister } from "../../services";
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
        if(response.status) {
            const token = response.data.token;
            localStorage.setItem('token', token);
            setAuthorization(token);
            return response.data;
        }

        return rejectWithValue({
            errorMessage: response.data.message
        });
        
    } catch (error) {
        return rejectWithValue({
            errorMessage: error.message
        });
    }
});



export const registerAction  = createAsyncThunk('registerAction', async (
    data: RegisterData, { rejectWithValue, dispatch } ) => {
    try {
        const response = await postRegister(data);
        if(response.status) return response.data;

        return rejectWithValue({ errorMessage: response.data.message });
        
    } catch (error) {
        return rejectWithValue({
            errorMessage: error.message
        });
    }
});

export const logoutAction = () => async (dispatch : any) => {
    try {
      localStorage.removeItem("token");
      dispatch(clearTasks());
      dispatch(logout());
  
    } catch (error : any) {
        localStorage.removeItem("token");
        dispatch(logout());
    }
  };

