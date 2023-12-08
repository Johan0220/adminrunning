import { createSlice } from "@reduxjs/toolkit";



type LoginState = {
    currentUser: CurrentUser | null;
    isFetching: boolean;
    error: boolean;
}
type InitialState = {
    login: LoginState;
}
const initialState = {
    login:{
        currentUser: null,
        isFetching: false,
        error: false,
    },  
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        loginStart: (state) => {
            state.login.isFetching = true;
        },
        loginSuccess: (state,action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
        },
        loginFailed: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },
        logOutSuccess: (state) => {
            state.login.isFetching = false;
            state.login.currentUser = null;
            state.login.error = false;
        },
        logOutFailed: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },
        logOutStart: (state) => {
            state.login.isFetching = true;
        }
    },
});

export const{
    loginStart,
    loginFailed,
    loginSuccess,
    logOutStart,
    logOutFailed,
    logOutSuccess,

} = authSlice.actions;
export default authSlice.reducer;