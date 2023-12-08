
import { createSlice } from "@reduxjs/toolkit";

type USerState = {
    userList: User[];
    isFetching: Boolean;
    error: Boolean;
    changeIsFetching: boolean;
}
type InitialState = {
    users: USerState;
}

const initialState: InitialState = {
    users: {
        userList:[],
        isFetching: false,
        error: false,
        changeIsFetching: false
    }

}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        getUserStart: (state) => {
            state.users.isFetching = true
        },
        getUserSuccess: (state,action) => {
            state.users.isFetching = false;
            state.users.userList = action.payload;
            state.users.error = false;

        },
        getUserFailed: (state) => {
            state.users.isFetching = false;
            state.users.error = true;
        },
        createStart: (state) => {
            state.users.isFetching = true;
        },
        createSuccess: (state,action) => {
            state.users.changeIsFetching = false;
            state.users.userList.push(action.payload);
            state.users.error = false;

        },
        createFailed: (state) => {
            state.users.changeIsFetching = false;
            state.users.error = true;
        },
        changePasswordStart: (state) => {
            state.users.changeIsFetching = true;
        },
        changePasswordSuccess: (state) => {
            state.users.changeIsFetching = false;
            state.users.error = false;

        },
        changePasswordFailed: (state) => {
            state.users.changeIsFetching = false;
            state.users.error = true;
        }
    }
});
export const {
    createStart,
    createSuccess,
    createFailed,
    getUserStart,
    getUserSuccess,
    getUserFailed,
    changePasswordStart,
    changePasswordSuccess,
    changePasswordFailed
    } = userSlice.actions;
export default userSlice.reducer;