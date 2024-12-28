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

    } catch (error) {
        return rejectWithValue({
            errorMessage: error.message
            // errorMessage: ERROR_AUTH_UNKNOWN
        });
    }
});

