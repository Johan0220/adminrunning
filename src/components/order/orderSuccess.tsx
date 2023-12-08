import { FormEvent, useState, useEffect } from "react";
import Image from "next/image";
import api from "@/app/services/api";
import createAxios from "@/app/services/createAxios";
import { loginSuccess } from "@/app/redux/auth/authSlice";
import url from "@/app/services/url";
import OutsideClickHandler from "react-outside-click-handler";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { loadOrderDetail, comfirmOrderLast, cancelOrder } from "@/app/services/apiRequest";
function OrderSuccess(props:any){ // properties  
    const order = props.orders;
    const index = props.index;
    const dispatch = useDispatch();
    const user: any = useSelector((state: RootState)=>state.auth.login.currentUser);
    const tokenStr: string = user?.access_token;
    const orderDetail = useSelector((state: RootState)=>state.order.orderDetail?.orderObj)
    const isFetchings = useSelector((state: RootState)=>state.order.orderDetail?.isFetching)
    const error = useSelector((state: RootState)=>state.order.orderDetail?.error)
    let total = orderDetail.reduce((sum:number, item:any) => sum + item.price * item.buyQty, 0);
    const [reason, setReason] = useState('')
    const loadPre = (id:number) => {
        loadOrderDetail(dispatch,tokenStr,id)
    }
    
    
    let axiosJWT = createAxios(user,dispatch,loginSuccess);
    const [actord,setActord] = useState(false)
    const [delord,setDelord] = useState(false)
    const [preord,setPreord] = useState(false)
    const [editord,setEditord] = useState(false)

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        let value = event.target.value;
        setReason(value);
    };

    const handleCancel = (id:number) => {
        cancelOrder(dispatch,tokenStr,id,reason)
    }
    console.log(reason)
    return (
        <>
                <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{index}</th>
                <td className="px-4 py-3">{order.invoiceId}</td>
                <td className="px-4 py-3">{order.status?.name}</td>
                <td className="px-4 py-3">{order.created_at}</td>
                <td className="px-4 py-3">{order.methodPayment?.name}</td>
                <td className="px-4 py-3 max-w-[12rem] truncate">{order.shipping?.name}</td>
                                       
                <td className="px-4 py-3 flex justify-center ">
                    <OutsideClickHandler onOutsideClick={(actord)=>{setActord(!actord)}}>
                    <button onClick={()=>{setActord(!actord)}} id={order.id} data-dropdown-add={order.name} className="inline-flex items-center text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 p-1.5 dark:hover-bg-gray-800 text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100" type="button">
                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                    </button>

                    <div id={order.name} style={{display:actord?"block":"none"}} className="none right-2 absolute z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                        <ul className="py-1 text-sm" aria-labelledby={order.name}>
                            
                            <li>
                                <button onClick={()=>{loadPre(order.id),setPreord(!preord)}} type="button" data-modal-target="readorderModal" data-modal-add="readorderModal" className="flex w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-gray-700 dark:text-gray-200">
                                    <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                    Preview
                                </button>
                            </li>
                            
                        </ul>
                    </div>
                </OutsideClickHandler>
            </td>
            {/* <!-- Comfirm Delete --> */}
            <div id="ComfirmModal" tabIndex={-1} aria-hidden="true" style={{display:delord? "block" : "none"}} className="none bg-smoke overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-100 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="inset-35 relative p-4 w-full max-w-md max-h-full">
                    {/* <!-- Modal content --> */}
                    <div className="relative p-4 text-center bg-white border-solid border rounded-lg shadow dark:border-gray-600 dark:bg-gray-800 sm:p-5">
                        <button onClick={()=>{setDelord(!delord)}} type="button" className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-add="deleteModal">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        
                        <div className="gap-4 mb-4">                                           
                                <div>
                                    <label htmlFor="reason" className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white">Reason for cancellation</label>
                                    <textarea name="reason_cancel" value={reason} onChange={handleChange} id="reason" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter reason" required/>
                                </div>
                                
                            </div>
                        <p className="mb-4 text-gray-500 dark:text-gray-300">Are you sure you want to cancel order {order.invoiceId}?</p>
                        <div className="flex justify-center items-center space-x-4">
                            <button onClick={()=>{setDelord(!delord)}} className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Close</button>
                            <button onClick={()=>{handleCancel(order.id),setDelord(!delord)}}data-modal-add="comfirmModal" type="button" className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">Yes, I&apos;m sure</button>
                        </div>   
                        
                        
                    </div>
                </div>
            </div>
            {/* <!-- Read modal --> */}
            <div id="readOrderModal" tabIndex={-1} aria-hidden="true" style={{display:preord? "block" : "none"}} className="hidden bg-smoke overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-100 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] h-w">
                <div className="start-1/4 relative p-4 w-2/3 max-h-screen">
                    {/* <!-- Modal content --> */}
                    <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        
                        {/* <!-- Modal header --> */}
                        <div className="flex justify-between">
                            <div className="pb-4 text-center font-semibold text-2xl md:text-3xl text-gray-900 dark:text-white">
                                <h3 className="font-semibold">Order Information #{order.invoiceId}</h3>
                            </div>
                            <div>
                                <button onClick={()=>{setPreord(!preord)}} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex dark:hover:bg-gray-600 dark:hover:text-white" data-modal-add="readorderModal">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                        </div>       
                        <div className="flex justify-between mb-4 rounded-t sm:mb-5">         
                            <div className="flex flex-col text-lg flex text-gray-900 md:text-xl dark:text-white">
                            <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                            {orderDetail.map((item,index) => (
                                <li key={index} className="py-3 sm:py-4">
                                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                        {/* <div className="flex-shrink-0">
                                            <img className="w-8 h-8 rounded-full" src={#} alt="Product image"/>
                                        </div> */}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                Name: {item.nameProduct}
                                            </p>
                                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                Style: {item.colorProduct} / {item.sizeProduct}
                                            </p>
                                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                Quantity: {item.buyQty}
                                            </p>
                                        </div>
                                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            Price: ${item.price}
                                        </div>
                                    </div>
                                </li>
                            ))}
                            </ul>
                            
                            </div>
                            <div className="pr-8 w-2/5">
                                <dl className="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                                    <div className="flex flex-col pb-3">
                                        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Name</dt>
                                        <dd className="text-lg font-semibold">{order.user.name}</dd>
                                    </div>
                                    <div className="flex flex-col pb-3">
                                        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Email address</dt>
                                        <dd className="text-lg font-semibold">{order.user.email}</dd>
                                    </div>
                                    <div className="flex flex-col py-3">
                                        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Address</dt>
                                        <dd className="text-lg font-semibold">{order.shipping_address}</dd>
                                    </div>
                                    <div className="flex flex-col pt-3">
                                        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Phone number</dt>
                                        <dd className="text-lg font-semibold">{order.tel}</dd>
                                    </div>
                                </dl>
                            </div>                          
                        </div>
                        <div className="flex justify-between" >
                            <div className="py-3 sm:py-4">
                                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-base font-semibold text-gray-900 dark:text-white">
                                            Method Payment: <span className="text-sm text-gray-500 truncate dark:text-gray-400">{order.methodPayment.name}</span>
                                        </p>
                                    </div>
                                    <span className="text-base font-semibold text-gray-900 dark:text-white">/</span>
                                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    <p className="text-base font-semibold text-gray-900 dark:text-white"> 
                                        Total: <span className="text-sm text-gray-500 truncate dark:text-gray-400">{total}</span>
                                    </p>
                                    </div>
                                </div>    
                            </div>
                        </div>              
                    </div>
                </div>
            </div>
        </>
    )
}
export default OrderSuccess;