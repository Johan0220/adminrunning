import { FormEvent, useState, useEffect } from "react";
import Image from "next/image";
import api from "@/app/services/api";
import createAxios from "@/app/services/createAxios";
import { loginSuccess } from "@/app/redux/auth/authSlice";
import url from "@/app/services/url";
import {UpProduct,ProductDetail } from "../types/typeProduct";
import OutsideClickHandler from "react-outside-click-handler";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { deleteProduct, updateProduct } from "@/app/services/apiRequest";
function Product(props:any){ // properties  
    const product = props.products;
    const index = props.index;
    const page = props.page;
    const id: number = product.id
    const dispatch = useDispatch();
    const user: any = useSelector((state: RootState)=>state.auth.login.currentUser);
    const tokenStr: string = user?.access_token;
    let file;
    if (typeof window !== 'undefined') {
        file = new File(['fileBits'], 'fileName', { type: 'text/plain' });
    }
    let axiosJWT = createAxios(user,dispatch,loginSuccess);
    const [actprod,setActprod] = useState(false)
    const [delprod,setDelprod] = useState(false)
    const [preprod,setPreprod] = useState(false)
    const [editprod,setEditprod] = useState(false)
    const [dataProd,setDataProd] = useState<UpProduct>({
        id: 0,
        name: '',
        price: 0,
        qty: 0,
        description: '',
        gender_id: 0,
        color_id: 0,
        brand_id: 0,
        size_id: 0,
        category_id: 0,
        thumbnail: file,
    })
    const [oldProduct,setOldProduct] = useState<UpProduct>({
        id: 0,
        name: '',
        price: 0,
        qty: 0,
        description: '',
        gender_id: 0,
        color_id: 0,
        brand_id: 0,
        size_id: 0,
        category_id: 0,
        gender:{
            name: ''
        },
        color: {
            name: ''
        },
        brand: {
            name: ''
        },
        size: {
            name: ''
        },    
        category: {
            name: ''  
        },
        thumbnail: file,
    });
    const [detailProduct, setDetailProduct] = useState<ProductDetail>({
        gender:{
            name: ''
        },
        color: {
            name: ''
        },
        brand: {
            name: ''
        },
        size: {
            name: ''
        },
        thumbnail: '',
        category: {
            name: ''
        }
    });

    const handleDelete = () => {
        deleteProduct(id,tokenStr,dispatch)
    }
    
    const editProduct = (detailProduct: any) => {
        if (detailProduct) {
            setOldProduct({
                ...detailProduct,
                thumbnail: new File([""], "filename"), // Tạo mới thuộc tính thumbnail
                
            });
        }        
    };  
    // Hàm để loại bỏ các thuộc tính không mong muốn
    const dataUpdate = (oldProduct:UpProduct) => {
        // Sao chép product
        const data = { ...oldProduct };
        // Loại bỏ các thuộc tính không mong muốn
        delete data.gender;
        delete data.color;
        delete data.brand;
        delete data.size;
        delete data.category;
        delete data.createDate;
        // Trả về bản sao đã được chỉnh sửa
        setDataProd(data);
    };
    

    const loadDetail = async (id: any)=>{
            try {
                const rs = await api.get(`${url.PRODUCT.DETAIL}${id}`,{
                });
                setDetailProduct(rs.data);
            } catch (error) {
                
            }
            
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        let value: string | File = event.target.value;
        if ((event.target as HTMLInputElement).type === 'file') {
            // Xử lý cho trường hợp input là file
            const files = (event.target as HTMLInputElement).files;
            if (files && files.length > 0) {
                value = files[0];
            }
        }
        setOldProduct(oldProduct => ({
            ...oldProduct,
            [event.target.name]: value,
        }));
        
    };
    
    
    
    const callUpdate =(event: FormEvent) => {
        event.preventDefault();
        updateProduct(dataProd.id,dataProd,tokenStr,dispatch)
    };


    useEffect(()=>{
        editProduct(detailProduct);
    },[detailProduct]);

    useEffect(()=>{
        dataUpdate(oldProduct);
    },[oldProduct]);
    return (
        <>
                <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{(page - 1) * 10 + index + 1}</th>
                <td className="px-4 py-3">{product.id}</td>
                <td className="px-4 py-3">{product.name}</td>
                <td className="px-4 py-3">{product.price}</td>
                <td className="px-4 py-3">{product.qty}</td>
                <td className="px-4 py-3 max-w-[12rem] truncate">{product.description}</td>
                <td className="px-4 py-3">{product.category?.name}</td>                         
                <td className="px-4 py-3 flex justify-center ">
                    <OutsideClickHandler onOutsideClick={(actprod)=>{setActprod(!actprod)}}>
                    <button onClick={()=>{setActprod(!actprod)}} id={product.id} data-dropdown-add={product.name} className="inline-flex items-center text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 p-1.5 dark:hover-bg-gray-800 text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100" type="button">
                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                    </button>
                    <div id={product.name} style={{display:actprod?"block":"none"}} className="none right-2 absolute z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                        <ul className="py-1 text-sm" aria-labelledby={product.name}>
                            <li>
                                <button onClick={()=>{setEditprod(!editprod)}} type="button" data-modal-target="updateProductModal" data-modal-add="updateProductModal" className="flex w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-gray-700 dark:text-gray-200">
                                    <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                                    </svg>
                                    Edit
                                </button>
                            </li>
                            <li>
                                <button onClick={()=>{setPreprod(!preprod),loadDetail(product.id)}} type="button" data-modal-target="readProductModal" data-modal-add="readProductModal" className="flex w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-gray-700 dark:text-gray-200">
                                    <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                    Preview
                                </button>
                            </li>
                            <li> 
                                <button onClick={()=>{setDelprod(!delprod)}} type="button" data-modal-target="deleteModal" data-modal-add="deleteModal" className="flex w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 text-red-500 dark:hover:text-red-400">
                                    <svg className="w-4 h-4 mr-2" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path fillRule="evenodd" clipRule="evenodd" fill="currentColor" d="M6.09922 0.300781C5.93212 0.30087 5.76835 0.347476 5.62625 0.435378C5.48414 0.523281 5.36931 0.649009 5.29462 0.798481L4.64302 2.10078H1.59922C1.36052 2.10078 1.13161 2.1956 0.962823 2.36439C0.79404 2.53317 0.699219 2.76209 0.699219 3.00078C0.699219 3.23948 0.79404 3.46839 0.962823 3.63718C1.13161 3.80596 1.36052 3.90078 1.59922 3.90078V12.9008C1.59922 13.3782 1.78886 13.836 2.12643 14.1736C2.46399 14.5111 2.92183 14.7008 3.39922 14.7008H10.5992C11.0766 14.7008 11.5344 14.5111 11.872 14.1736C12.2096 13.836 12.3992 13.3782 12.3992 12.9008V3.90078C12.6379 3.90078 12.8668 3.80596 13.0356 3.63718C13.2044 3.46839 13.2992 3.23948 13.2992 3.00078C13.2992 2.76209 13.2044 2.53317 13.0356 2.36439C12.8668 2.1956 12.6379 2.10078 12.3992 2.10078H9.35542L8.70382 0.798481C8.62913 0.649009 8.5143 0.523281 8.37219 0.435378C8.23009 0.347476 8.06631 0.30087 7.89922 0.300781H6.09922ZM4.29922 5.70078C4.29922 5.46209 4.39404 5.23317 4.56282 5.06439C4.73161 4.8956 4.96052 4.80078 5.19922 4.80078C5.43791 4.80078 5.66683 4.8956 5.83561 5.06439C6.0044 5.23317 6.09922 5.46209 6.09922 5.70078V11.1008C6.09922 11.3395 6.0044 11.5684 5.83561 11.7372C5.66683 11.906 5.43791 12.0008 5.19922 12.0008C4.96052 12.0008 4.73161 11.906 4.56282 11.7372C4.39404 11.5684 4.29922 11.3395 4.29922 11.1008V5.70078ZM8.79922 4.80078C8.56052 4.80078 8.33161 4.8956 8.16282 5.06439C7.99404 5.23317 7.89922 5.46209 7.89922 5.70078V11.1008C7.89922 11.3395 7.99404 11.5684 8.16282 11.7372C8.33161 11.906 8.56052 12.0008 8.79922 12.0008C9.03791 12.0008 9.26683 11.906 9.43561 11.7372C9.6044 11.5684 9.69922 11.3395 9.69922 11.1008V5.70078C9.69922 5.46209 9.6044 5.23317 9.43561 5.06439C9.26683 4.8956 9.03791 4.80078 8.79922 4.80078Z" />
                                    </svg>
                                    Delete
                                </button>
                            </li>
                        </ul>
                    </div>
                </OutsideClickHandler>
            </td>
            {/* <!-- Comfirm Delete --> */}
            <div id="deleteModal" tabIndex={-1} aria-hidden="true" style={{display:delprod? "block" : "none"}} className="none bg-smoke overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-100 justify-center items-center w-full md:inset-0 h-w">
                <div className="inset-35 relative p-4 w-full max-w-md max-h-full">
                    {/* <!-- Modal content --> */}
                    <div className="relative p-4 text-center bg-white border-solid border rounded-lg shadow dark:border-gray-600 dark:bg-gray-800 sm:p-5">
                        <button onClick={()=>{setDelprod(!delprod)}} type="button" className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-add="deleteModal">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <svg className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <p className="mb-4 text-gray-500 dark:text-gray-300">Are you sure you want to delete this item?</p>
                        <div className="flex justify-center items-center space-x-4">
                            <button onClick={()=>{setDelprod(!delprod)}} data-modal-add="deleteModal" type="button" className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
                            <button onClick={()=>{handleDelete(),setDelprod(!delprod)}} className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">Yes, I&apos;m sure</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Read modal --> */}
            <div id="readProductModal" tabIndex={-1} aria-hidden="true" style={{display:preprod? "block" : "none"}} className="none h-w bg-smoke overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-100 justify-center items-center w-full md:inset-0">
                <div className="start-1/4 relative p-4 w-2/3 max-h-screen">
                    {/* <!-- Modal content --> */}
                    <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        {/* <!-- Modal header --> */}
                        <div className="flex justify-between mb-4 rounded-t sm:mb-5">
                            <div className="text-lg flex text-gray-900 md:text-xl dark:text-white">
                                <div className="">
                                    <h3 className="font-semibold">Preview</h3>
                                    <p className="font-bold">{detailProduct.name}</p>
                                </div>
                                
                            </div>
                            <div>
                                <button onClick={()=>{setPreprod(!preprod)}} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex dark:hover:bg-gray-600 dark:hover:text-white" data-modal-add="readProductModal">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-between" >
                            <dl>
                                <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Price</dt>
                                <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">{detailProduct.price}</dd>
                                <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Details</dt>
                                <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">{detailProduct.description}</dd>
                                <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Quantity</dt>
                                <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">{detailProduct.qty}</dd>
                                <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Category</dt>
                                <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">{detailProduct.category.name}</dd>
                                <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Brand</dt>
                                <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">{detailProduct.brand.name}</dd>
                                <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Gender</dt>
                                <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">{detailProduct.gender.name}</dd>
                                <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Size</dt>
                                <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">{detailProduct.size.name}</dd>
                                <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Color</dt>
                                <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">{detailProduct.color.name}</dd>
                                <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Creator</dt>
                                <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">{detailProduct.category.name}</dd>
                                <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Create Date</dt>
                                <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">{detailProduct.createDate}</dd>
                            </dl>
                            <dl className="mt-20 mr-20">
                                <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Thumbnail</dt>
                                <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">{detailProduct.thumbnail && <Image src={detailProduct.thumbnail} width="500" height="500" alt="picture" />}</dd>
                            </dl>
                        </div>
                        
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-3 sm:space-x-4">
                                <button onClick={()=>{setPreprod(!preprod),setEditprod(!editprod)}} type="button" className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm  font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700  dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                    <svg aria-hidden="true" className="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                                    </svg>
                                    Edit
                                </button>
                            </div>
                            <button onClick={()=>{setPreprod(!preprod),setDelprod(!delprod)}} type="button" className="inline-flex items-center text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
                                <svg aria-hidden="true" className="w-5 h-5 mr-1.5 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Update modal --> */}
            <div id="updateProductModal" tabIndex={-1} aria-hidden="true" style={{display:editprod? "block" : "none"}} className="none overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-100 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="start-30 relative p-4 w-full max-w-2xl max-h-full">
                    {/* <!-- Modal content --> */}
                    <div className="relative border-solid border-2 rounded-lg p-4 bg-white shadow dark:border-slate-600 dark:bg-gray-800 sm:p-5">
                        {/* <!-- Modal header --> */}
                        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5  dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Update Product</h3>
                            <button onClick={()=>{setEditprod(!editprod)}} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-add="updateProductModal">
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                                <span  className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* <!-- Modal body --> */}
                        <form action="#" onSubmit={callUpdate} encType="multipart/form-data">
                        <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                <div className="hidden">                          
                                    <input type="hidden" name="id" onChange={handleChange} value={oldProduct.id} id="id" className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required/>
                                </div>                            
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                    <input type="text" name="name" onChange={handleChange} value={oldProduct.name} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required/>
                                </div>
                                <div>
                                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                    <input type="number" name="price" onChange={handleChange} value={oldProduct.price} id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$????" required/>
                                </div>
                                <div>
                                    <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
                                    <input type="number" name="qty" onChange={handleChange} value={oldProduct.qty} id="quantity" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Product quantity" required/>
                                </div>                              
                                <div>
                                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                                    <select id="category" name="category_id" onChange={handleChange} value={oldProduct.category_id} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                        <option value={oldProduct.category_id}>{oldProduct.category.name}</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand</label>
                                    <select id="brand" name="brand_id" onChange={handleChange} value={oldProduct.brand_id} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                        <option value={oldProduct.brand_id}>{oldProduct.brand.name}</option>
                                        
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                                    <select id="gender" name="gender_id" onChange={handleChange} value={oldProduct.gender_id} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                        <option value={oldProduct.gender_id}>{oldProduct.gender.name}</option>
                                        
                                        
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="size" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Size</label>
                                    <select id="size" name="size_id" onChange={handleChange} value={oldProduct.size_id} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                        <option value={oldProduct.size_id}>{oldProduct.size.name}</option>                        
                                                                               
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="color"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Color</label>
                                    <select id="color" name="color_id" onChange={handleChange} value={oldProduct.color_id} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                        <option value={oldProduct.color_id}>{oldProduct.color.name}</option>
                                                                            
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="image"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Choose File</label>
                                    <input type="file" name="thumbnail" onChange={handleChange} id="image" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Product description" required/>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                    <textarea id="description" name="description" onChange={handleChange} value={oldProduct.description} rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Write product description here"></textarea>
                                </div>
                            </div>
                            <div className="flex items-center justify-between space-x-4">
                                <button onClick={()=>{setEditprod(!editprod)}} type="submit" className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Update product</button>
                                <button onClick={()=>{setEditprod(!editprod)}} data-modal-add="deleteModal" type="button" className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
                            </div>
                        </form>
                    </div>
                </div>           
            </div>
        </>
    )
}
export default Product;