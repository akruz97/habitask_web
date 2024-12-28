import { createAsyncThunk } from "@reduxjs/toolkit";
import { getListUser, getUserProfile } from "../../services";

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
        const response = await getUserProfile()
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

