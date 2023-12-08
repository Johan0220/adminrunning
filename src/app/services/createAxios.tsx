'use client'
import axios from "axios";

import { jwtDecode, JwtPayload } from "jwt-decode";
import { Dispatch } from "@reduxjs/toolkit";
import url from "./url";
const refreshToken = async (id: any) => {
    try {
      const rs = await axios.post(`${url.BASE_URL}${url.USER.REFRESHTOKEN}${id}`,{        
        withCredentials: true,  
      });
      return rs.data;
      
    }catch(error){
      console.log(error)
    }
  }

 const createAxios = (user: CurrentUser , dispatch: Dispatch, stateSuccess: any) => {
    const newInstance = axios.create();
    newInstance.interceptors.request.use(
        async(config) =>{
          let date = Date.now() / 1000;
          const decoded = jwtDecode<JwtPayload>(user?.access_token);
          if (decoded?.exp && decoded.exp < date){
            const data = await refreshToken(user?.user.id);
            const refreshUser = {
              ...user,
              access_token : data.access_token,
            };
            dispatch(stateSuccess(refreshUser));
            config.headers["token"] = "Bearer" + data.access_token
            
          }
          return config;
        },
        (error) => {return Promise.reject(error)}
      )
      return newInstance;
}
export default createAxios;
