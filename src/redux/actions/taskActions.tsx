import { createAsyncThunk } from "@reduxjs/toolkit";
import habitaskApi from "../../const/api";
import { getTasks, postTask } from "../../services";
import { ICreateTask } from "../../interfaces";

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


export const createTaskAction  = createAsyncThunk('createTaskAction', async (data : ICreateTask, { rejectWithValue, dispatch } ) => {
    try {
        const response = await postTask(data);
        console.log(response);
        if(response.status) {
            dispatch(getTasksAction());
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

