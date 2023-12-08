const url = {
    BASE_URL: "https://semester3shoprunner.azurewebsites.net/api",
    PRODUCT:{
        DEFAULT: "/product",
        DELETE: "/product/delete?id=",
        DETAIL: "/product/get-by-id?id=",
        SEARCH: "/product/search?search=",
        UPDATE: "/product/update",
        PAGINATION: {
            PAGE:"/product/paginate?page=",
            LIMIT: "&pagesize=",
        },
        LOAD: {
            FROM: "/product/filter?to=",
            TO: "&from=",
            CATEGORY: "&category=",
            GENDER: "&gender=",
            BRAND: "&brand=",
            SIZE: "&size=",
            COLOR: "&color=",
            PAGE:  "&page=",
        }
    },
    USER:{
        LOGIN: "/users/login",
        LOGOUT: "/users/log_out?id=",
        REFRESHTOKEN: "/users/refresh-token?id=",
        CREATE: "/staff/create-acc-staff",
        CHANGEPASSWORD: "/staff/change-password",
        LOAD:{
            USER: "/staff/get-users",
            STAFF: "/admin/get-staffs",
        } ,
        ONOFF:{
            USER: "/staff/toggle-user?userId=67",
            STAFF: "/admin/toggle-staffs?id=79",
        }
    },
    ORDER:{
        PEDING: "/order/staff/status-order",
        PAID:"/order/staff/get-verified-order",
        COMPLETED: "/order/staff/history-staff",
        DETAIL: "/order/staff/detail/order-detail?orderid=",
        COMFIRM: {
            FRIST:"/order/staff/verify-order?orderid=",
            LAST: "/Order/staff/staff-verify?orderId=",
        },
        CANCEL: {
            ID:"/order/staff/cancel-order?orderId=",
            REASON:"&reason_cancel=",
        }   
    },
    BRAND:{
        LOAD:"/brand/brand/get-all?page=",
        DELETE:"/brand/brand/delete?id=3",
        ADD:"/brand/brand/post",
        UPDATE:"/brand/brand/update"
    },
    CATEGORY:{
        LOAD:"/category/category/get-all?page=",
        DELETE:"/category/category/delete?id=3",
        ADD:"/category/category/post-cate",
        UPDATE:"/category/category/update-cart"
    },
    GENDER:{
        LOAD:"/gender/gender/get-all?page=",
        DELETE:"/gender/gender/delete?id=3",
        ADD:"/gender/gender/post",
        UPDATE:"/gender/gender/update"
    },
    SIZE:{
        LOAD:"/size/size/get-all?page=",
        DELETE:"/size/size/delete?id=3",
        ADD:"/size/size/post",
        UPDATE:"/size/size/update"
    },
    COLOR:{
        LOAD:"/color/color/get-all?page=",
        DELETE:"/color/color/delete?id=3",
        ADD:"/color/color/post",
        UPDATE:"/color/color/update"
    },
}
export default url;