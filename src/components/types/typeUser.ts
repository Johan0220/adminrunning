type User ={
    email: string;
    password: string;
}
type CurrentUser = {
    access_token: string
    user : {
        id : number;
        fullname: string;
        email: string;
        role: string
    },
}
type RefreshToken = {
    access_token: any;
    user: {
        id: number;
        fullname: string;
        email: string;
        role: string;
    };
}
type CreateUser = {
    fullName: string;
    password: string;
    confirmPassword: string;
}

type ChangePassword ={
    id: number;
    password_old: string;
    password_new: string;

}