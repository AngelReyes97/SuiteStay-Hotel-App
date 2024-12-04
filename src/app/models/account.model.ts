export interface User{
    account_id?: number;
    f_name: string;
    l_name: string;
    email: string;
    password?: string;
}

export interface userCredentials{
    email: string;
    password: string;
}