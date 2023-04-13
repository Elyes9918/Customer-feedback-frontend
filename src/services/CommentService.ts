import axios from "axios";
import { IComment } from "../types/Comment";

export const getToken = () => JSON.parse(localStorage.getItem('accessToken') || "{}");

const getAuthorizationHeader = `Bearer ${getToken()}`;

const apiCommentsURL = "http://127.0.0.1:8000/api/v1/comments"

const authAxios = axios.create({
    baseURL:apiCommentsURL,
    headers : {
        Authorization: getAuthorizationHeader,
    },
});

export const createCommentApi = async (data: IComment) =>{
    return await authAxios.post(apiCommentsURL,data);
}

export const getCommentListApi = async () => {
    return await authAxios.get<IComment[]>(apiCommentsURL);
};

export const getCommentByIdApi = async(id:string) => {
    const url = `${apiCommentsURL}/${id}`;
    return await authAxios.get<IComment>(url)
}


export const getCommentsByIdFeedbackApi = async(id:string) => {
    const url = `${apiCommentsURL}/feedback/${id}`;
    return await authAxios.get<IComment[]>(url)
}

export const updateCommentApi = async (data: IComment) => {
    const url = `${apiCommentsURL}/${data.id}`;
    return await authAxios.patch(url, data);
};

export const deleteCommentApi = async(id:string)=>{
    const url = `${apiCommentsURL}/${id}`;
    return await authAxios.delete(url);
}
