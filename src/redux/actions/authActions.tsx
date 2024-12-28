import { createAsyncThunk } from "@reduxjs/toolkit";
import habitaskApi from "../../const/api";
import { AuthResponse, LoginData, LoginResponse } from "../../interfaces";
import { postLogin } from "../../services";
import { getUserProfileAction } from "./userActions";

export const loginAction  = createAsyncThunk('autLogin', async ({
    email,
    password
}: LoginData, { rejectWithValue, dispatch } ) => {
    try {
        const response = await postLogin({
            email: email,
            password: password
        });
        console.log(response);
        if(response.status) {
            sessionStorage.setItem('token', response.data.token);
            dispatch(getUserProfileAction());
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

