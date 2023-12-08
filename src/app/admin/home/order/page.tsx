'use client'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import {useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import { loadOrder } from "@/app/services/apiRequest";
import createAxios from "@/app/services/createAxios";
import { loginSuccess } from "@/app/redux/auth/authSlice";
import {default as OrderPeding } from "@/components/order/orderPending";
import {default as OrderDelivery } from "@/components/order/orderDelivery";
import {default as OrderSuccess } from "@/components/order/orderSuccess";
import Loading from "@/components/home/loading";
import url from "@/app/services/url";
const Cart = () => {
    const orders: any = useSelector((state: RootState)=>state.order.orders.list);
    
    const error: any = useSelector((state: RootState)=>state.order.orders.error);
    const user: any = useSelector((state: RootState)=>state.auth.login.currentUser);
    const isFetching :any = useSelector((state: RootState)=>state.order.orders.isFetching);
    const tokenStr: string = user?.access_token;
    const dispatch = useDispatch();
    const navigate = useRouter();
    const [status,setStatus] = useState(url.ORDER.PEDING);
    const [componentShow, setComponentShow] = useState('Pending');
    let axiosJWT = createAxios(user,dispatch,loginSuccess)
    const handleClick = (componentName:string) => {
        setComponentShow(componentName);
    }
    useEffect(() => {
                if(!user)
                navigate.push('/login')
            }, []);
    useEffect(()=>{
        loadOrder(dispatch,tokenStr,status);     
    },[status]);           
    return(
        <>
        <div className="sm:ml-64"> {/* pt-14 */}
                {/* <!-- Start block --> */}
                    <div className="fixed w-w mx-auto">
                        {/* <!-- Start coding here --> */}
                        <div className="h-screen bg-white dark:bg-gray-800 relative shadow-m overflow-hidden">
                        {isFetching?<Loading/>:null}
                                <div className="flex  flex-col md:flex-row items-center justify-between bg-white dark:bg-gray-800 space-y-3 md:space-y-0 md:space-x-4 p-4">
                                    <div className="w-full md:w-1/2">
                                        <form className="flex items-center relative">
                                            <label htmlFor="simple-search" className="sr-only">Search</label>
                                                <div className="relative w-full">
                                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                <input value="Name" type="text" id="simple-search" className=" w-96 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" required/>
                                            </div>
                                        </form>
                                        <div id="dropdownSearch" className="z-100 absolute mt-4 min-w-max bg-white divide-y divide-gray-100 rounded-lg shadow w-72 dark:bg-gray-700 dark:divide-gray-600">
                                            

                                                {/* {name ? (
                                                    proSearch.length > 0 ? (
                                                        <ul>
                                                            {proSearch.map((product, index) => (
                                                              <li key={index}>
                                                              <Link href="#">
                                                                  <div className="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                                      <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{product.name}</span>
                                                                  </div> 
                                                              </Link>
                                                              
                                                          </li>
                                                            ))}
                                                        </ul>
                                                    ) : (
                                                        <div className="flex p-2 rounded">
                                                            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Cannot find product</span>
                                                        </div> 
                                                    )
                                                ) : null} */}




                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3 w-full md:w-auto">
                                        
                                        <button onClick={()=>{handleClick('Pending'),setStatus(url.ORDER.PEDING)}} id="filterName" name="filterName" className="w-40 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ">
                                            Pending
                                        </button> 

                                        <button onClick={()=>{handleClick('Delivery'),setStatus(url.ORDER.PAID)}} id="filterCategory" name="fillCategory" className="w-40 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ">
                                            Paid
                                        </button>   
                                        
                                        <button onClick={()=>{handleClick('Success'),setStatus(url.ORDER.COMPLETED)}} id="filterPrice" name="fillPrice" className="w-40 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ">
                                            Completed
                                        </button>                                 
                                    </div>    
                                </div>
                                
                                

                                <div className="h-85vh overflow-auto">
                                    
                                    <table className="table-auto  w-w left-1/4 text-sm text-left text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs sticky top-0 z-10 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" className="px-4 py-4">NO</th>
                                                <th scope="col" className="px-4 py-4">Invoice ID</th>
                                                <th scope="col" className="px-4 py-3">Status</th>
                                                <th scope="col" className="px-4 py-3">Create Date</th>
                                                <th scope="col" className="px-4 py-3">Method payment</th>
                                                <th scope="col" className="px-4 py-3">Shipping</th>
                                                <th scope="col" className="px-4 py-3 text-center">Actions</th>
                                                
                                            </tr>
                                        </thead>
                                        {!error                                  
                                        ?
                                            <tbody className="">
                                                {orders.map((o:any,index:number) => (
                                                    
                                                    <tr key={index} className="border-b relative dark:border-gray-700">
                                                        {componentShow === 'Pending' && <OrderPeding orders={o} index={index}/>}
                                                        {componentShow === 'Delivery' && <OrderDelivery orders={o} index={index}/>}
                                                        {componentShow === 'Success' && <OrderSuccess orders={o} index={index}/>} 
                                                    </tr>))
                                                } 
                                            </tbody>
                                        :
                                            <div className="flex w-w h-w absolute flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                                                <h1 className="">Not Found Order</h1>
                                            </div>
                                        }                                                                            
                                    </table>
                                </div>
                        </div>
                    </div>
                {/* <!-- End block -->*/}
                
            </div>
        </>
    )
}
export default Cart;
