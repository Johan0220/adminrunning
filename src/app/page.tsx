"use client"
import Link from "next/link";
import React,{useEffect} from "react";
import { RootState } from "./redux/store";
import { useSelector,useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { loginSuccess } from "./redux/auth/authSlice";
import  createAxios  from "./services/createAxios";
import Loading from "@/components/home/loadingLogin";
export default function Home() {
  const user: any = useSelector((state: RootState)=>state.auth.login.currentUser);
  useEffect(() => {
    if(user)
    navigate.push('/admin/home')

  }, []);
  const dispatch = useDispatch();
  const navigate = useRouter();
  const isFetching: any = useSelector((state: RootState)=>state.auth.login.isFetching);
  
  
  return ( 
        <div className="main">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 bg-white border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div className="bg-slate-500 dark:bg-slate-400 rounded-lg">
              <div className="w-57.5 h-612 relative">
                {isFetching ? 
                (<Loading/>)
                      :
                (<img className="rounded-t-lg" src="https://runkeeper.com/cms/wp-content/uploads/sites/4/2021/12/ASICS_Color-Injection-Pack_Highlight_0253-scaled.jpg" alt="picture" />)
                }
              </div>
                
                <div className="p-5">
                <Link href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">WELCOME PAGE FOR SATFF</h5>
                </Link>
                <p className="mb-3 font-normal text-gray-700 dark:text-white">This website is for employees. Please log in to continue. If you are not an employee, please leave the site.</p>
                <Link href="/login" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Login
                  <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                  </svg>
                </Link>
                </div>
            </div>
          </div>
        </div>
      
            
  )
}
