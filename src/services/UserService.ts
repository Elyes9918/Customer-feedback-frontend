import { IUser } from "../types/User";
import axios from "axios";


export const getToken = () => JSON.parse(localStorage.getItem('accessToken') || "{}");

const getAuthorizationHeader = `Bearer ${getToken()}`;

const apiUsersURL = "http://127.0.0.1:8000/api/v1/users"


const authAxios = axios.create({
    baseURL:apiUsersURL,
    headers : {
        Authorization: getAuthorizationHeader,
    },
});

export const getUserListApi = async () => {
    return await authAxios.get<IUser[]>(apiUsersURL);
};

export const updateUserApi = async (data: IUser) => {
    const url = `${apiUsersURL}/${data.id}`;
    return await authAxios.patch(url, data);
};

export const getUserByIdApi = async(id:number) => {
    const url = `${apiUsersURL}/user/${id}`;
    return await authAxios.get<IUser>(url)
}

export const getUserByEmailApi = async(emailParam:string) => {
    const url = `${apiUsersURL}/user`;
    return await authAxios.get<IUser>(url,{ params: { email: emailParam } });
}

export const unAssignRoleApi = async(data:IUser) =>{
    const url = `${apiUsersURL}/${data.id}/role`;
    return await authAxios.patch(url, data);
}

export const unAssignProjectApi = async(data:IUser) =>{
    const url = `${apiUsersURL}/${data.id}/project`;
    return await authAxios.patch(url, data);
}

export const unAssignFeedbackApi = async(data:IUser) =>{
    const url = `${apiUsersURL}/${data.id}/feedback`;
    return await authAxios.patch(url, data);
}



