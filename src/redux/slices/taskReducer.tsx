import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createTaskAction, deleteTaskAction, getTasksAction, markAsCompleteTaskAction } from '../actions/taskActions';

export interface TaskState {
  tasks: Array<Object>;
  errorMessage: string | null;
  loading: boolean,
  loadingCreate: boolean,
  errorCreate: string | null,
  successCreate: string | null,
  errorMarkComplete: string | null,
  successMarkComplete: string | null,
  errorDelete: string | null,
  successDelete: string | null
}

const initialState: TaskState = {
 tasks: [],
 errorMessage: null,
 loading: false,
 loadingCreate: false,
 errorCreate: null,
 successCreate: null,
 errorMarkComplete: null,
 successMarkComplete: null,
 errorDelete: null,
 successDelete:  null
}

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.errorMessage = ''
    },
    resetFlagsTask: (state) => {
      state.errorCreate = null,
      state.successCreate = null
      state.loading = false,
      state.errorMarkComplete = null,
      state.successMarkComplete = null,
      state.errorDelete = null,
      state.successDelete =  null
    },
    clearTasks: (state) => {
      state = initialState
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
    }),

    builder.addCase(createTaskAction.pending, (state, action) => {
      state.loadingCreate = true
    }),
    builder.addCase(createTaskAction.fulfilled, (state: TaskState, action: PayloadAction<any>) => {
        state.tasks = [...state.tasks]
        state.loadingCreate = false
        state.errorMessage = null
        state.successCreate = 'Create'
        state.errorCreate = null
    }),
    builder.addCase(createTaskAction.rejected, (state: TaskState, action: PayloadAction<any>) => {
        state.tasks = [...state.tasks]
        state.loadingCreate = false
        // state.errorMessage = action.payload.errorMessage
        state.errorCreate = action.payload.errorMessage
        state.successCreate = null
    }),

    // builder.addCase(deleteTaskAction.pending, (state, action) => {
    //   state.loadingCreate = true
    // }),
    builder.addCase(deleteTaskAction.fulfilled, (state: TaskState, action: PayloadAction<any>) => {
        state.tasks = [...state.tasks]
        state.errorMessage = null
        state.successDelete = action.payload.message
        state.errorDelete = null
    }),
    builder.addCase(deleteTaskAction.rejected, (state: TaskState, action: PayloadAction<any>) => {
        state.tasks = [...state.tasks]
        state.errorDelete = action.payload.errorMessage
        state.successDelete = null
    }),


    builder.addCase(markAsCompleteTaskAction.fulfilled, (state: TaskState, action: PayloadAction<any>) => {
      state.tasks = [...state.tasks]
      state.errorMessage = null
      state.successMarkComplete = action.payload.message
      state.errorMarkComplete = null
  }),
  builder.addCase(markAsCompleteTaskAction.rejected, (state: TaskState, action: PayloadAction<any>) => {
      state.tasks = [...state.tasks]
      state.errorMarkComplete = action.payload.errorMessage
      state.successMarkComplete = null
  })
  }
})

export const { 
    clearMessage,
    resetFlagsTask,
    clearTasks
} = taskSlice.actions

export default taskSlice.reducer