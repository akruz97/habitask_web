import { createAsyncThunk } from "@reduxjs/toolkit";
import habitaskApi from "../../const/api";
import { deleteTask, getTasks, markAsCompleteTask, postTask } from "../../services";
import { ICreateTask } from "../../interfaces";
import { addTask, removeTask, updateTasks } from "../slices/taskReducer";
import moment from "moment";

interface PaginationProps {
    limit: number,
    offset: number ,
}

export const getTasksAction  = createAsyncThunk('getTasksAction', async ({
    limit,
    offset,
} : PaginationProps, { rejectWithValue } ) => {
    try {
        const response = await getTasks(offset, limit)
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
        const response = await postTask({
            title: data.title,
            completed: data.completed,
            user_asigned_id: data.user_asigned_id
        });
        console.log(response);
        if(response.status) {
            dispatch(addTask({
                ...response.data,
                user_owner: data.user_owner,
                user_asigned: data.user_asigned,
            }))
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

export const deleteTaskAction  = createAsyncThunk('deleteTaskAction', async (taskId : number, { rejectWithValue, dispatch } ) => {
    try {
        const response = await deleteTask(taskId);
        console.log(response);
        if(response.status) {
            dispatch(removeTask({ id: taskId }))
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


export const markAsCompleteTaskAction  = createAsyncThunk('markAsCompleteTaskAction', async (taskId : number, { rejectWithValue, dispatch } ) => {
    try {
        const response = await markAsCompleteTask(taskId);
        console.log('completed: ', response);
        if(response.status) {
            dispatch(updateTasks({
                id: taskId
            }));
            // dispatch(getTasksAction({
            //     limit: 5,
            //     offset: 0
            // }));

            return {...response.data, id: taskId};
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

