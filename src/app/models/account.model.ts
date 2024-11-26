export interface User{
    account_id?: number;
    fName: string;
    lName: string;
    email: string;
    password?: string;
}

export interface userCredentials{
    email: string;
    password: string;
}