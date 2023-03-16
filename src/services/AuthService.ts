import { IUser, IUserForm } from "../types/User";
import axios from "axios";

const baseURL = "http://127.0.0.1:8000"

export const RegisterUserApi = async (data: IUserForm) => {
    const url = `${baseURL}/api/register`;
    return await axios.post<IUser>(url, data);
};

export const LoginUserApi = async (data: IUserForm) => {
    const url = `${baseURL}/api/login_check`;
    return await axios.post<IUser>(url, data);
};

export const ResetPasswordRequestApi = async(data:IUserForm)=>{
    const url = `${baseURL}/api/reset-password`;
    return await axios.post<IUser>(url, data);
}

export const ChangePasswordApi = async(data:IUserForm)=>{
    const url = `${baseURL}/api/reset-password/reset/${data.token}`;
    return await axios.post<IUser>(url,data)
}