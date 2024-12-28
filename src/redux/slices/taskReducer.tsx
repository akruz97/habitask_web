import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getTasksAction } from '../actions/taskActions';

export interface TaskState {
  tasks: Array<Object>;
  errorMessage: string | null;
  loading: boolean
}

const initialState: TaskState = {
 tasks: [],
 errorMessage: null,
 loading: false
}

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.errorMessage = ''
        }
  },
  extraReducers: (builder) => {
    builder.addCase(getTasksAction.pending, (state, action) => {
        state.loading = true
    }),
    builder.addCase(getTasksAction.fulfilled, (state: TaskState, action: PayloadAction<any>) => {
        state.tasks = action.payload
        state.loading = false
        state.errorMessage = null
    }),
    builder.addCase(getTasksAction.rejected, (state: TaskState, action: PayloadAction<any>) => {
        state.tasks = [...state.tasks]
        state.loading = false
        state.errorMessage = action.payload.errorMessage
    })
  }
})

export const { 
    clearMessage
} = taskSlice.actions

export default taskSlice.reducer