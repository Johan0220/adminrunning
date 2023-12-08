
import { createSlice} from '@reduxjs/toolkit';
type OrderState = {
    orders:{
        list: OrderSlice[];
        totalOrder:number| null;
        isFetching : boolean;
        error: boolean;
    },
    orderDetail: {
        orderObj: OrderDetail[];
        isFetching: boolean;
        error: boolean;
    },
    comfirmOrder: {
        error: boolean;
    },
    cancelOrder: {
        isFetching : boolean;
        error: boolean;
    }
}

const initialState: OrderState = {
    orders:{
        list: [],
        totalOrder: null,
        isFetching: false,
        error: false,
    },
    orderDetail: {
        orderObj: [],
        isFetching: false,
        error: false,
    },
    comfirmOrder: {
        error: false,
    },
    cancelOrder: {
        isFetching: false,
        error: false,
    }
    

}
const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers:{
        loadOrderStart: (state) => {
            state.orders.isFetching = true;
        },
        loadOrderSuccess: (state, action) => {
            state.orders.list = action.payload;
            state.orders.isFetching = false;
            state.orders.error = false;
        },
        loadOrderFailed: (state) => {
            state.orders.isFetching = false;
            state.orders.error = true;
        },
        loadOrderDetailStart: (state) => {
            state.orderDetail.isFetching = true;
        },
        loadOrderDetailSuccess: (state, action) => {
            state.orderDetail.orderObj = action.payload;
            state.orderDetail.isFetching = false;
        },
        loadOrderDetailFailed: (state) => {
            state.orderDetail.isFetching = false;
        },
        addOrderStart: (state) => {
            state.orders.isFetching = true;
        },
        addOrderSuccess: (state, action) => {
            state.orders.list.push(action.payload);
            state.orders.isFetching = false;
        },
        addOrderFailed: (state) => {
            state.orders.isFetching = false;
        },
        deleteOrderStart: (state) =>{
            state.orders.isFetching = true;
        },
        deleteOrderSuccess: (state, action) => {
            state.orders.isFetching = false;
            state.orders.list = state.orders.list.filter((order) => order.id !== action.payload);
        },
        deleteOrderFailed:(state) => {
            state.orders.isFetching = false;
        },
        updateOrderStart: (state) =>{
            state.orders.isFetching = true;
        },
        updateOrderSuccess: (state, action) => {
            state.orders.isFetching = false;
            state.orders.list = state.orders.list.map((order) => order.id === action.payload.id ? action.payload : order);
        },
        updateOrderFailed:(state) => {
            state.orders.isFetching = false;
        },
        comfirmOrderStart: (state) => {
            state.orders.isFetching = true;
        },
        comfirmOrderSuccess: (state,action) => {
            state.orders.isFetching = false;
            state.orders.list = state.orders.list.filter((order) => order.id !== action.payload);
        },
        comfirmOrderFailed: (state) => {
            state.orders.isFetching = false;
        },
        cancelOrderStart: (state) => {
            state.orders.isFetching = true;
           
        },
        cancelOrderSuccess: (state,action) => {
            state.orders.isFetching = false;
             state.orders.list = state.orders.list.filter((order) => order.id !== action.payload);
        },
        cancelOrderFailed: (state) => {
            state.orders.isFetching = false;
        }
    }
})
export const {
    loadOrderStart,
    loadOrderSuccess,
    loadOrderFailed,
    addOrderStart,
    addOrderSuccess,
    addOrderFailed,
    deleteOrderStart,
    deleteOrderSuccess,
    deleteOrderFailed,
    loadOrderDetailStart,
    loadOrderDetailSuccess,
    loadOrderDetailFailed,
    updateOrderStart,
    updateOrderSuccess,
    updateOrderFailed,
    comfirmOrderStart,
    comfirmOrderSuccess,
    comfirmOrderFailed,
    cancelOrderStart,
    cancelOrderSuccess,
    cancelOrderFailed
} = orderSlice.actions;
export default orderSlice.reducer;