import { createAsyncThunk } from "@reduxjs/toolkit";
import { getListUser, getUserProfile } from "../../services";
import habitaskApi from "../../const/api";
import * as url from "../../const/url_api";

export const getListUserAction  = createAsyncThunk('getListUserAction', async (_, { rejectWithValue } ) => {
    try {
        const response = await getListUser()
        console.log(response);
        if(response.status) {
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

export const getUserProfileAction  = createAsyncThunk('getUserProfileAction', async (_, { rejectWithValue } ) => {
    try {
        const response = await habitaskApi.get(url.GET_USER_PROFILE);
        const data = response.data.data
        if(response.status) {
            return data;
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

