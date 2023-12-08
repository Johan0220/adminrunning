type OrderSlice = {
    id:number;
    user_id:number;
    created_at:string;
    grand_total:number;
    shipping_address:string;
    tel:string;
    invoiceId:string;
    status_id:number;
    satatus:{
        name:string;
    }
    payment_method_id:number;
    methodPayment:{
        name:string;
    }
    shipping_id:number;
    shhipping:{
        name:string;
    }
    
}
type OrderDetail = {
    productId: number;
    orderId: number;
    buyQty: number;
    price: number;
    id: number;
    nameProduct: string;
    colorProduct: string;
    sizeProduct: string;
    order: null;
    product: null;
}
