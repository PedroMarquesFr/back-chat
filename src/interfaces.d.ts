export interface User {
    email:string;
    password:string;
    displayName:string;
}

export interface ErrMessage {
    message?:string;
    code?:number;
    ok?:string;
}