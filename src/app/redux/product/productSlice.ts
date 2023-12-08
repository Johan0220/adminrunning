
import { ProductSlice,ProductDetail } from '@/components/types/typeProduct';
import { createSlice } from '@reduxjs/toolkit';

type ProductState = {
    products:{
        list: ProductSlice[];
        productDetail: ProductDetail | null ;
        totalProduct:number| null;
        isFetching : boolean;
        error: boolean;
    }
}

const initialState: ProductState = {
    products:{
        list: [],
        productDetail:null,
        totalProduct: null,
        isFetching: false,
        error: false,

    }

}
const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers:{
        loadProductStart: (state) => {
            state.products.isFetching = true;
        },
        loadProductSuccess: (state, action) => {
            state.products.list = action.payload;
            state.products.isFetching = false;
            state.products.error = false;
        },
        loadProductFailed: (state) => {
            state.products.isFetching = false;
            state.products.error = true;
        },
        loadProductDetailStart: (state) => {
            state.products.isFetching = true;
        },
        loadProductDetailSuccess: (state, action) => {
            state.products.productDetail = action.payload;
            state.products.isFetching = false;
        },
        loadProductDetailFailed: (state) => {
            state.products.isFetching = false;
        },
        addProductStart: (state) => {
            state.products.isFetching = true;
        },
        addProductSuccess: (state, action) => {
            state.products.list.push(action.payload);
            state.products.isFetching = false;
        },
        addProductFailed: (state) => {
            state.products.isFetching = false;
        },
        deleteProductStart: (state) =>{
            state.products.isFetching = true;
        },
        deleteProductSuccess: (state, action) => {
            state.products.isFetching = false;
            state.products.list = state.products.list.filter((product) => product.id !== action.payload);
        },
        deleteProductFailed:(state) => {
            state.products.isFetching = false;
        },
        updateProductStart: (state) =>{
            state.products.isFetching = true;
        },
        updateProductSuccess: (state, action) => {
            state.products.isFetching = false;
            state.products.list = state.products.list.map((product) => product.id === action.payload.id ? { ...product, ...action.payload } : product);
        },
        updateProductFailed:(state) => {
            state.products.isFetching = false;
        }
    }
})
export const {
    loadProductStart,
    loadProductSuccess,
    loadProductFailed,
    addProductStart,
    addProductSuccess,
    addProductFailed,
    deleteProductStart,
    deleteProductSuccess,
    deleteProductFailed,
    loadProductDetailStart,
    loadProductDetailSuccess,
    loadProductDetailFailed,
    updateProductStart,
    updateProductSuccess,
    updateProductFailed} = productSlice.actions;
export default productSlice.reducer;