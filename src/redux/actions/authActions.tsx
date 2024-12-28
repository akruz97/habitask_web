import { createAsyncThunk } from "@reduxjs/toolkit";
import habitaskApi from "../../const/api";
import { AuthResponse, LoginData, LoginResponse } from "../../interfaces";
import { postLogin } from "../../services";

export const loginAction  = createAsyncThunk('autLogin', async ({
    email,
    password
}: LoginData, { rejectWithValue } ) => {
    try {
        const response = await postLogin({
            email: email,
            password: password
        });
        console.log(response);
        if(response.status) {
            sessionStorage.setItem('token', response.data.token);
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

