'use client'
import React, { FormEvent, useState,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import axios from "axios";
import url from "@/app/services/url";
import {default as StaffGird} from "@/components/user/userStaff";
import {default as CustomerGird} from "@/components/user/userCustomer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createUser, loadUser} from "@/app/services/apiRequest";
import Loading from "@/components/home/loading";
import OutsideClickHandler from "react-outside-click-handler";
import createAxios from "@/app/services/createAxios";
import { logOutSuccess } from "@/app/redux/auth/authSlice";
const User = () => {
    let file;
    if (typeof window !== 'undefined') {
        file = new File(['fileBits'], 'fileName', { type: 'text/plain' });
    }
    const user: any = useSelector((state: RootState)=>state.auth.login.currentUser);
    const users: any = useSelector((state: RootState)=>state.user.users.userList);
    const error: any = useSelector((state: RootState)=>state.user.users.error);
    const isFetching :any = useSelector((state: RootState)=>state.user.users.isFetching);
    const tokenStr: string = user?.access_token;
    const navigate = useRouter();
    const dispatch = useDispatch();
    let axiosJWT = createAxios(user,dispatch,logOutSuccess)
    useEffect(() => {
        if(!user)
        navigate.push('/login')
      }, []);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [totalPages, setTotalPages] = useState<number>(1)
    const [add,setAdd] = useState(false)    
    const [name, setName] = useState<string>('') 
    const [proSearch, setProSearch] = useState<[]>([]);
    const [page, setPage] = useState(1);
    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")
    const [category, setCategory] = useState("")
    const [gender, setGender] = useState("")
    const [brand, setBrand] = useState("")
    const [size, setSize] = useState("")
    const [color, setColor] = useState("")
    const [data, setData] = useState<CreateUser>({  
        fullName: '',
        password: '',
        confirmPassword: 'string'

      });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        let value: string = event.target.value; 
        setData(data => ({
            ...data,
            [event.target.name]: value
            
        }));   
    };
    
    const handlePriceChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        const [from, to] = value.split('-');
        setFrom(from)
        setTo(to);
    }
    const handleCategoryChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setCategory(value)
    }
    const handleGenderChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setGender(value)
    }
    const handleBrandChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setBrand(value)
    }
    const handleSizeChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSize(value)
    }
    const handleColorChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setColor(value)
    }


    const handleNextPage = () => {
        if (page < totalPages){
            setPage(page + 1);
        }
      };

      const handlePreviousPage = () => {
        if (page > 1) {      
            setPage(page - 1);             
        }
      };

    const handleAdd = (event:FormEvent) => {
        event.preventDefault();
        createUser(dispatch, tokenStr, data)
    }

    
    
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setName(value);
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (name === '' || name === undefined) {
                return;
            }
    
            try {
                const response = await axios.get(`${url.BASE_URL}${url.PRODUCT.SEARCH}${name}`);
                setProSearch(response.data);
            } catch (error) {
                console.log(error);
            }
        },100)
    
        return () => clearTimeout(delayDebounceFn)
    }, [name])
    
    useEffect(()=>{
        loadUser(dispatch,tokenStr);  
    },[]);
    return(
        <>
            <div className="sm:ml-64"> {/* pt-14 */}
                {/* <!-- Start block --> */}
                    <div className="fixed w-w mx-auto">
                        {/* <!-- Start coding here --> */}
                        <div className="h-screen bg-white dark:bg-gray-800 relative shadow-m overflow-hidden">
                            {isFetching?<Loading/>:null}
                                <div className="flex  flex-col md:flex-row items-center justify-between bg-white dark:bg-gray-800 space-y-3 md:space-y-0 md:space-x-4 p-4">
                                    {/* <div className="w-full md:w-1/2">
                                        <form className="flex items-center relative">
                                            <label htmlFor="simple-search" className="sr-only">Search</label>
                                                <div className="relative w-full">
                                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                <input onClick={() => setDropdownVisible(true)} onChange={handleSearch} value={name} type="text" id="simple-search" className=" w-96 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" required/>
                                            </div>
                                        </form>
                                        <OutsideClickHandler onOutsideClick={() => {setDropdownVisible(false)}}>                                      
                                            <div id="dropdownSearch" className="z-100 absolute mt-4 min-w-max bg-white divide-y divide-gray-100 rounded-lg shadow w-72 dark:bg-gray-700 dark:divide-gray-600">                                                
                                                 { (dropdownVisible && name) ? (
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
                                                    ) : null}
                                                    
                                            </div>
                                        </OutsideClickHandler>
                                    </div> */}
                                    
                                    <div className="w-full md:w-auto flex flex-col  md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                        <button onClick={()=>{setAdd(!add)}} type="button" id="createProductModalButton" data-modal-target="createProductModal" data-modal-add="createProductModal" className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-blue-700 dark:text-white dark:border-gray-600 dark:hover:text-white dark:hover:bg-blue-500">
                                            <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                            </svg>
                                            <span>Add user</span>
                                        </button>
                                        
                                    </div>

                                </div>
                                <div>
                                
                            
                                    <table className="table-auto w-full left-1/4 text-sm text-left text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" className="px-4 py-4">NO</th>
                                                <th scope="col" className="px-4 py-4">User name</th>
                                                <th scope="col" className="px-4 py-4">Email</th>
                                                <th scope="col" className="px-4 py-4">Role</th>
                                                <th scope="col" className="px-4 py-4">Status</th>
                                                <th scope="col" className="px-4 py-3 text-center">Actions</th>
                                                
                                            </tr>
                                        </thead>
                                        {!error                                  
                                        ?
                                        <tbody>
                                            {users.map((u:any,index:number) => (
                                                
                                                <tr key={index} className="border-b relative dark:border-gray-700">
                                                    <CustomerGird users={u} index={index}/>
                                                </tr>))
                                            }
                                        </tbody>
                                        :
                                        <div className="flex w-w h-w absolute flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                                            <h1 className="">Not Found Products</h1>
                                        </div>
                                    }
                                    </table>
                                    {/* <nav className="fixed flex bottom-0 start-2/4 flex-col md:flex-row justify-center items-start md:items-center space-y-3 md:space-y-0 p-8" aria-label="Table navigation">
                                        <ul className="inline-flex items-stretch -space-x-px">
                                            <li>
                                                <button onClick={handlePreviousPage} className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                                    <span className="sr-only">Previous</span>
                                                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </li>
                                            
                                        


                                            {Array.from({length: totalPages || 1}, (_, i) => i + 1).map(pageNumber => {
                                                if (pageNumber === 1 || pageNumber === totalPages || (pageNumber >= page - 2 && pageNumber <= page + 2)) {
                                                    return (
                                                        <button 
                                                            key={pageNumber}
                                                            onClick={() => setPage(pageNumber)}
                                                            className={` ${page === pageNumber ? 'dark:bg-gray-700 dark:text-white '  : 'dark:bg-gray-800 dark:text-gray-400 '}flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700  dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white`}
                                                        >
                                                            {pageNumber}
                                                        </button>
                                                    );
                                                } else if (pageNumber === 2 || pageNumber === totalPages - 1) {
                                                    return <span key={pageNumber}>...</span>;
                                                } else {
                                                    return null;
                                                }
                                            })}
      
                                            <li>
                                                <button onClick={handleNextPage} className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                                    <span className="sr-only">Next</span> 
                                                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </li>
                                        </ul>
                                    </nav> */}
                                </div>
                        </div>
                    </div>
                {/* <!-- End block -->*/}
                {/*<!-- Create modal --> */}
                <div id="createProductModal" tabIndex={-1} aria-hidden="true" style={{display:add?"block":"none"}} className="none overflow-y-auto bg-smoke overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] h-screen">
                    <div className="start-30 relative p-4 w-full max-w-2xl max-h-full">
                        {/* <!-- Modal content --> */}
                        <div className="relative border-solid border-2 rounded-lg p-4 bg-white shadow dark:border-slate-600 dark:bg-gray-800 sm:p-5">
                            {/* <!-- Modal header --> */}
                            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add Product</h3>
                                <button onClick={()=>{setAdd(!add)}} type="button" className="text-gray-400 bg-transparent hover:bg-slate-400 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-target="createProductModal" data-modal-add="createProductModal">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            {/* <!-- Modal body --> */}
                            <form onSubmit={handleAdd} encType="multipart/form-data"  >
                                <div className="grid gap-4 mb-4 sm:grid-cols-2"> 
                                    
                                    <div>
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                        <input type="text" name="fullName" onChange={handleChange} value={data.fullName} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required/>
                                    </div>
                                    <div>
                                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                        <input type="number" name="password" onChange={handleChange} value={data.password} id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$????" required/>
                                    </div>
                                    <div>
                                        <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
                                        <input type="number" name="comfimPassword" onChange={handleChange} value={data.confirmPassword} id="quantity" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Product quantity" required/>
                                    </div>                              
                                    
                                </div>
                                <button onClick={()=>{setAdd(!add)}} type="submit" className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                    <svg className="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                    </svg>
                                    Add new product
                                </button>
                            </form>
                        </div>
                    </div>
                </div>          
                
            </div>
        
        </>
    )
    
}
export default User;