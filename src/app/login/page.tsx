'use client'
import { useForm } from "react-hook-form";
import { handleLogin } from "../services/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { RootState } from "../redux/store";
import Loading from "@/components/home/loadingLogin";


const Login = () => {
    
    const nameRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const {register, handleSubmit, formState:{errors}} = useForm<User>();
    const error:any = useSelector((state: RootState)=>state.error.errorLogin.error);
    const isFetching :any = useSelector((state: RootState)=>state.auth.login.isFetching);
    const dispatch = useDispatch();
    const navigate  = useRouter();
    const onSubmit = (data: User) => {
        handleLogin(data, dispatch, navigate);
    }
    
    return(
            <section className="bg-gray-300 relative">
                {isFetching? 
                    <Loading/>
                    :
                    null
                }
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="lg:text-2xl text-center uppercase font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Sign in to your account
                                </h1>
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                        <input  {...register("email", {
                                            required:true,
                                            pattern: {
                                                value: nameRegex,
                                                message:"Invalid email address"
                                            }})} type="name"  id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:focus-visible:outline-none" placeholder="user name" />
                                        {errors.email && errors.email.type == "required" && <span className="text-red-500">Please enter the user name</span>}
                                        {errors.email && errors.email.message && <span className="text-yellow-300">{errors.email.message}</span>}
                                        
                                    </div>
                                    <div>
                                        <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                        <input {...register("password", {required:true})} type="password"  id="password" autoComplete="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:focus-visible:outline-none"/>
                                        {errors.password && errors.password.type == "required" && <span className="text-red-500">Please enter the password</span>}
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-start">
                                        {error ? <span className="text-red-600">Email or password is not correct!</span>:null}                                   
                                        </div>
                                    </div>
                                    <button type="submit" className="w-full text-gray-600 bg-slate-500 hover:bg-primary-700 focus:ring-2 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-800 dark:bg-slate-700 dark:hover:bg-slate-400  hover:bg-slate-500 focus:bg-slate-500 focus:none">Sumbit</button>                         
                                </form>
                            </div>
                        </div>
                    </div>      
            </section>
    )
}
export default Login;