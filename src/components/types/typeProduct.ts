
type Product = {
    [key: string]: any;
    Name: string;
    price: number;
    qty: number;
    description?: string;
    gender_id: 0;
    color_id: 0;
    brand_id: 0;
    size_id: 0;
    Thumbnail?: File;
    category_id: number;
    user_id: number;   
}
type ProductSlice = {
    id: number;
    name: string;
    price: number;
    qty: number;
    description?: string;
    gender_id: 0;
    color_id: 0;
    brand_id: 0;
    size_id: 0;
    thumbnail?: string;
    category_id: number;  
}
type UpProduct = {
    [key: string]: any;
    id: number; 
    name: string;
    price: number;
    qty: number;
    description?: string;
    gender_id: number;
    color_id: number;
    brand_id: number;
    size_id: number;
    category_id: number;         
    thumbnail?: File;
}
type NewProduct = {
    [key: string]: any;
    Name: string;
    price: number;
    qty: number;
    description?: string;
    gender_id: 0;
    color_id: 0;
    brand_id: 0;
    size_id: 0;
    Thumbnail?: File;
    category_id: number;
    user_id: number;
}
type ProductDetail =  {
    [key: string]: any;   
};
type ProductSearch =  {
    id: number;
    name: string;  
};

export type {Product,UpProduct,NewProduct,ProductDetail,ProductSlice,ProductSearch}