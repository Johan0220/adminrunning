'use client'
import { logOutSuccess, logOutStart, logOutFailed, loginFailed, loginStart, loginSuccess, } from "../redux/auth/authSlice";
import { loginError, loginDone } from "../redux/error/errSlice";
import { addProductStart,addProductSuccess,addProductFailed,loadProductStart,loadProductSuccess,loadProductFailed,deleteProductStart,deleteProductSuccess,deleteProductFailed, updateProductStart, updateProductSuccess, updateProductFailed} from "../redux/product/productSlice";
import { cancelOrderStart,cancelOrderSuccess,cancelOrderFailed,comfirmOrderStart,comfirmOrderSuccess,comfirmOrderFailed,loadOrderDetailStart,loadOrderDetailSuccess,loadOrderDetailFailed,loadOrderStart,loadOrderSuccess,loadOrderFailed,deleteOrderStart,deleteOrderSuccess,deleteOrderFailed, updateOrderStart, updateOrderSuccess, updateOrderFailed} from "../redux/order/orderSlice";
import { loadBrandStart,loadBrandSuccess,loadBrandFailed,deleteBrandStart,deleteBrandSuccess,deleteBrandFailed,updateBrandStart,updateBrandSuccess,updateBrandFailed} from "../redux/brand/brandSlice";
import { changePasswordStart,changePasswordSuccess,changePasswordFailed,createStart, createSuccess, createFailed, getUserStart, getUserSuccess,getUserFailed } from "../redux/user/userSlice";
import api from "./api";
import url from "./url";
import { AxiosInstance } from "axios";
import { Dispatch } from "@reduxjs/toolkit";
import { AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import { NewProduct,UpProduct } from "@/components/types/typeProduct";


//Auth
export const handleLogin = (async (data: User, dispatch: Dispatch, navigate: AppRouterInstance) => {
    dispatch(loginStart())
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
    const value = data[key as keyof typeof data];
    if (value !== undefined) {       
        formData.append(key, value.toString());
    }
});
    try {
        const rs = await api.post(`${url.BASE_URL}${url.USER.LOGIN}`, formData, {
            headers: { 'Content-Type': 'application/json'},
            
        });
        const auth = rs.data;
        const tokenStr = auth.access_token;
        dispatch(loginSuccess(auth));
        dispatch(loginDone());
        api.defaults.headers.common["Authorization"] = `Bearer ${tokenStr}`;
        if(rs.data.user.role === 'USER'){
          navigate.push('../admin/home');
        } else if(rs.data.user.role=== 'ADMIN'){
          navigate.push('../admin/home');
        } else if(rs.data.user.role === 'STAFF'){
          navigate.push('../admin/home');        
        }     
    } catch (error: any) {
        dispatch(loginFailed())
        if(error.response.status === 400)
        dispatch(loginError())
    }
})

export const logOut = async (dispatch: Dispatch, navigate: AppRouterInstance,id: number, tokenStr:string) => {
    dispatch(logOutStart());
    try{
        await api.post(`${url.BASE_URL}${url.USER.LOGOUT}${id}`,{
            headers: {"Authorization" : `Bearer ${tokenStr}`},
        });
        localStorage.removeItem('persist:reduxStorage');
        dispatch(logOutSuccess());  
        navigate.push('/login') 
    }catch(error:any){
      localStorage.removeItem('persist:reduxStorage');
      dispatch(logOutSuccess());  
      navigate.push('/login');
      };
}


//Product
export const addProduct = async (newProduct: NewProduct,dispatch: Dispatch, tokenStr: string) => {
    dispatch(addProductStart())
    const formData = new FormData();
    for (let key in newProduct) {
        formData.append(key, newProduct[key]);
    }
    try {
        const rs = await api.post(`${url.BASE_URL}${url.PRODUCT.DEFAULT}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${tokenStr}`},
      });
    dispatch(addProductSuccess(rs.data))
    } catch (error) {
        dispatch(addProductFailed())
    }
};

export const deleteProduct = async (id: number, tokenStr:string, dispatch:Dispatch) => {
    dispatch(deleteProductStart())
    try {
      const rs = await api.delete(`${url.BASE_URL}${url.PRODUCT.DELETE}${id}`,{
        headers: {Authorization: `Bearer ${tokenStr}`},
    });
    dispatch(deleteProductSuccess(id))
    } catch (error) {
      dispatch(deleteProductFailed())
    }
};

export const updateProduct = async (id:number, dataProd:UpProduct, tokenStr:string, dispatch: Dispatch) => {
  dispatch(updateProductStart())
  const formData = new FormData();
  for (let key in dataProd) {
      formData.append(key, dataProd[key]);
  }
  try {
      const rs = await api.put(`${url.BASE_URL}${url.PRODUCT.UPDATE}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data',Authorization: `Bearer ${tokenStr}`},
    });
    const data = rs.data;
    dispatch(updateProductSuccess(data)) 
  } catch (error) {
      dispatch(updateProductFailed())
  }
};

export const loadProduct = async (from:string,to:string,category:string,gender:string,brand:string,size:string,color:string,page: number,dispatch:Dispatch)=>{
  dispatch(loadProductStart())
  try {
      const rs = await api.get(`${url.BASE_URL}${url.PRODUCT.LOAD.FROM}${from}${url.PRODUCT.LOAD.TO}${to}
      ${url.PRODUCT.LOAD.CATEGORY}${category}
      ${url.PRODUCT.LOAD.GENDER}${gender}
      ${url.PRODUCT.LOAD.BRAND}${brand}
      ${url.PRODUCT.LOAD.SIZE}${size}
      ${url.PRODUCT.LOAD.COLOR}${color}
      ${url.PRODUCT.LOAD.PAGE}${page}`);
      dispatch(loadProductSuccess(rs.data))
  } catch (error) {
      dispatch(loadProductFailed())
    }
};
// Order
export const loadOrder = async (dispatch: Dispatch,tokenStr: string,status: string) => {
    dispatch(loadOrderStart())
    try {
        const rs = await api.get(`${url.BASE_URL}${status}`,{
            headers: {Authorization : `Bearer ${tokenStr}`}
        });
        dispatch(loadOrderSuccess(rs.data))
    } catch (error:any) {
        dispatch(loadOrderFailed())
    }
}

export const loadOrderDetail = async (dispatch: Dispatch, tokenStr: string, id: number) => {
    dispatch(loadOrderDetailStart())
    try {
        const rs = await api.post(`${url.BASE_URL}${url.ORDER.DETAIL}${id}`,{
            headers: {Authorization : `Bearer ${tokenStr}`}
        });
        dispatch(loadOrderDetailSuccess(rs.data))
    } catch (error:any) {
        dispatch(loadOrderDetailFailed())
    }
}

export const comfirmOrderFirst = async (dispatch: Dispatch, tokenStr: string, id: number) => {
    dispatch(comfirmOrderStart())
    try {
        const rs = await api.post(`${url.BASE_URL}${url.ORDER.COMFIRM.FRIST}${id}`,{
            headers: {Authorization : `Bearer ${tokenStr}`}
        });
        dispatch(comfirmOrderSuccess(id))
    } catch (error:any) {
        dispatch(comfirmOrderFailed())
    }
}
export const comfirmOrderLast = async (dispatch: Dispatch, tokenStr: string, id: number) => {
    dispatch(comfirmOrderStart())
    try {
        const rs = await api.post(`${url.BASE_URL}${url.ORDER.COMFIRM.LAST}${id}`,{
            headers: {Authorization : `Bearer ${tokenStr}`}
        });
        dispatch(comfirmOrderSuccess(id))
    } catch (error:any) {
        dispatch(comfirmOrderFailed())
    }
}

export const cancelOrder = async (dispatch: Dispatch, tokenStr: string, id: number, reason: string ) => {
    dispatch(cancelOrderStart())
    
    try {
        const rs = await api.post(`${url.BASE_URL}${url.ORDER.CANCEL.ID}${id}${url.ORDER.CANCEL.REASON}${reason}`,{
            headers: {Authorization : `Bearer ${tokenStr}`}
        });
        dispatch(cancelOrderSuccess(id))
    } catch (error:any) {
        dispatch(cancelOrderFailed())
    }
}

//
export const loadBrand = async (dispatch: Dispatch, tokenStr: string ,page: number) => {
    dispatch(loadBrandStart())
    try{
        const rs = await api.get(`${url.BASE_URL}${url.BRAND.LOAD}${page}`,{
            headers: {Authorization : `Bearer ${tokenStr}`}
        });
        dispatch(loadBrandSuccess(rs.data))
    } catch{
        dispatch(loadBrandFailed())
    }
}

export const deleteBrand = async (dispatch:Dispatch, tokenStr:string, id: number) => {
    dispatch(deleteBrandStart())
    try{
        const rs = await api.post(`${url.BASE_URL}${url.BRAND.DELETE}${id}`,{
            headers: {Authorization : `Bearer ${tokenStr}`}
        });
        dispatch(deleteBrandSuccess(id))
    } catch{
        dispatch(deleteBrandFailed())
    }
}
export const updateBrand = async (dispatch:Dispatch, tokenStr: string, data: Brand) => {
    dispatch(updateBrandStart())
    const formData = new FormData();
    for (let key in data) {
        formData.append(key, data[key]);
    }
    try{
        const rs = await api.put(`${url.BASE_URL}${url.BRAND.UPDATE}`,formData,{
            headers: {'Content-Type': 'application/json', Authorization : `Bearer ${tokenStr}`}
        });
        dispatch(updateBrandSuccess(formData))
    } catch{
        dispatch(updateBrandFailed())
    }
}

export const addBrand = async (dispatch:Dispatch, tokenStr: string, data: any) => {
    dispatch(updateBrandStart())
    try{
        const rs = await api.post(`${url.BASE_URL}${url.BRAND.ADD}`,data,{
            headers: {Authorization : `Bearer ${tokenStr}`}
        });
        dispatch(updateBrandSuccess(rs.data))
    } catch{
        dispatch(updateBrandFailed())
    }
}
// User
export const createUser = async (dispatch: Dispatch, tokenStr:string, data: CreateUser) => {
    dispatch(createStart())
    try{
        const rs = await api.post(`${url.BASE_URL}${url.USER.CREATE}`,data,{
            headers: {Authorization : `Bearer ${tokenStr}`}
        });
        dispatch(createSuccess(rs.data))
    } catch{
        dispatch(createFailed())
    }
}

export const loadUser = async (dispatch: Dispatch, tokenStr:string) => {
    dispatch(getUserStart())
    try{
        const rs = await api.get(`${url.BASE_URL}${url.USER.LOAD.USER}`,{
            headers: {Authorization : `Bearer ${tokenStr}`}
        });
        dispatch(getUserSuccess(rs.data))
    } catch{
        dispatch(getUserFailed())
    }
}

export const changePassword = async (dispatch: Dispatch, tokenStr: string, data: ChangePassword) => {
    dispatch(changePasswordStart())
    try{
        const rs = await api.get(`${url.BASE_URL}${url.USER.CHANGEPASSWORD}`,{
            headers: {Authorization : `Bearer ${tokenStr}`}
        });
        dispatch(changePasswordSuccess())
    } catch{
        dispatch(changePasswordFailed())
    }
}
