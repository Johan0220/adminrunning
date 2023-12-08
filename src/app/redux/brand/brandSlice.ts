import { createSlice } from "@reduxjs/toolkit";



type BrandState = {
    brandList: BrandSlice[];
    isFetching: boolean;
    error: boolean;
}
type InitialState = {
    brands: BrandState;
}
const initialState:InitialState = {
    brands:{
        brandList: [],
        isFetching: false,
        error: false,
    },  
}

const brandSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        loadBrandStart: (state) => {
            state.brands.isFetching = true;
        },
        loadBrandSuccess: (state,action) => {
            state.brands.isFetching = false;
            state.brands.brandList = action.payload;
            state.brands.error = false;
        },
        loadBrandFailed: (state) => {
            state.brands.isFetching = false;
            state.brands.error = true;
        },
        deleteBrandStart: (state) =>{
            state.brands.isFetching = true;
        },
        deleteBrandSuccess: (state, action) => {
            state.brands.isFetching = false;
            state.brands.brandList = state.brands.brandList.filter((brand) => brand.id !== action.payload);
        },
        deleteBrandFailed:(state) => {
            state.brands.isFetching = false;
        },
        updateBrandStart: (state) =>{
            state.brands.isFetching = true;
        },
        updateBrandSuccess: (state, action) => {
            state.brands.isFetching = false;
            state.brands.brandList = state.brands.brandList.map((brand) => brand.id === action.payload.id ? { ...brand, ...action.payload } : brand);
        },
        updateBrandFailed:(state) => {
            state.brands.isFetching = false;
        }
    },
});

export const{
    loadBrandStart,
    loadBrandFailed,
    loadBrandSuccess,
    deleteBrandStart,
    deleteBrandSuccess,
    deleteBrandFailed,
    updateBrandStart,
    updateBrandSuccess,
    updateBrandFailed,
} = brandSlice.actions;
export default brandSlice.reducer;