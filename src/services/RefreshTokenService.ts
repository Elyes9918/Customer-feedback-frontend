import { IUser } from "../types/User";
import axios from "axios";


export const getToken = () => JSON.parse(localStorage.getItem('accessToken') || "{}");

const getAuthorizationHeader = `Bearer ${getToken()}`;

const apiRefreshTokenURL = "http://127.0.0.1:8000/api/v1/refreshToken"


const authAxios = axios.create({
    baseURL:apiRefreshTokenURL,
    headers : {
        Authorization: getAuthorizationHeader,
    },
});

export const deleteRefreshTokenApi = async(email:string)=>{
    const url =`${apiRefreshTokenURL}/${email}`;
    return await authAxios.delete(url)

}

