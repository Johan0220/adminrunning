'use client'
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import Product from "./product/page";
import Brand from "./brand/page";
const Page = ()=>{
  const user: any = useSelector((state: RootState)=>state.auth.login.currentUser);
  
    const navigate = useRouter();
    useEffect(() => {
        if(!user)
        navigate.push('/login')
   
      }, []);
    return(
        <>
        <div className="h-85vh overflow-auto">

        
            <Product/>
            
        </div>
        </>


    )
}
export default Page;