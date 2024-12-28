import { createAsyncThunk } from "@reduxjs/toolkit";
import habitaskApi from "../../const/api";
import { getTasks } from "../../services";

export const getTasksAction  = createAsyncThunk('getTasksAction', async (_, { rejectWithValue } ) => {
    try {
        const response = await getTasks()
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

