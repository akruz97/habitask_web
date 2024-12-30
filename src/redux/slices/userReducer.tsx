import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getListUserAction, getUserProfileAction } from '../actions/userActions';
export interface PublicUser {
    id: number,
    name: string,
    lastname: string,
    email: string
}

export interface TaskProps {
    id: number,
    title: string,
    completed: boolean,
    created: string | null,
    date_completed: string | null,
    user_owner: PublicUser,
    user_asigned: PublicUser
}

export interface UserState {
    profile: {
        id: number,
        name: string,
        lastname: string,
        email: string,
    },
    userList: Array<TaskProps>;
    errorMessage: string | null;
    loading: boolean
}

const initialState: UserState = {
    profile: {
        id: 0,
        name: '',
        lastname: '',
        email: ''
    },
    userList: [],
    errorMessage: null,
    loading: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.errorMessage = ''
        }
  },
  extraReducers: (builder) => {
    builder.addCase(getListUserAction.pending, (state, action) => {
        state.loading = true
    }),
    builder.addCase(getListUserAction.fulfilled, (state: UserState, action: PayloadAction<any>) => {
        state.userList = action.payload
        state.loading = false
        state.errorMessage = null
    }),
    builder.addCase(getListUserAction.rejected, (state: UserState, action: PayloadAction<any>) => {
        state.userList = [...state.userList]
        state.loading = false
        state.errorMessage = action.payload.errorMessage
    }),


    builder.addCase(getUserProfileAction.pending, (state, action) => {
        state.loading = true
    }),
    builder.addCase(getUserProfileAction.fulfilled, (state: UserState, action: PayloadAction<any>) => {
        state.profile = action.payload
        state.loading = false
        state.errorMessage = null
    }),
    builder.addCase(getUserProfileAction.rejected, (state: UserState, action: PayloadAction<any>) => {
        state.profile = {...state.profile}
        state.loading = false
        state.errorMessage = action.payload.errorMessage
    })
  }
})

export const { 
    clearMessage
} = userSlice.actions

export default userSlice.reducer