import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productReducer from "../../app/redux/product/productSlice";
import authReducer from "../../app/redux/auth/authSlice";
import errorReducer from "../../app/redux/error/errSlice";
import orderReducer from "../../app/redux/order/orderSlice";
import brandReducer from "../../app/redux/brand/brandSlice";
import userReducer from "../../app/redux/user/userSlice";
import {persistReducer,FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER,} from 'redux-persist';
import storage from "./storage";
const persistConfig = {
    key: 'reduxStorage',
    version: 1,
    storage,
    whitelist: ['auth']
}
const rootReducer = combineReducers({
    product: productReducer,
    auth: authReducer,
    order:orderReducer,
    error: errorReducer,
    brand: brandReducer,
    user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
            middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                },
            }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;