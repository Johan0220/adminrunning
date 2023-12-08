import { createSlice } from "@reduxjs/toolkit";
type ErrorState = {
    error: Boolean;
}
type InitialState = {
    error: ErrorState;
}
const initialState = {
    errorLogin:{
        error: false,
    },  
}
const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers:{
        loginError: (state) => {
            state.errorLogin.error = true;
        },
        loginDone: (state) => {
            state.errorLogin.error = false;
        },
     
    },
    

});
export const{
    loginDone,
    loginError,

} = errorSlice.actions;
export default errorSlice.reducer;