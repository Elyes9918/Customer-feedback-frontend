import axios from "axios";
import { IFeedback } from "../types/Feedback";

export const getToken = () => JSON.parse(localStorage.getItem('accessToken') || "{}");

const getAuthorizationHeader = `Bearer ${getToken()}`;

const apiFeedbacksURL = "http://127.0.0.1:8000/api/v1/feedbacks"

const authAxios = axios.create({
    baseURL:apiFeedbacksURL,
    headers : {
        Authorization: getAuthorizationHeader,
    },
});

export const createFeedbackApi = async (data: IFeedback) =>{
    return await authAxios.post(apiFeedbacksURL,data);
}

export const getFeedbackListApi = async () => {
    return await authAxios.get<IFeedback[]>(apiFeedbacksURL);
};

export const getFeedbackByIdApi = async(id:string) => {
    const url = `${apiFeedbacksURL}/${id}`;
    return await authAxios.get<IFeedback>(url)
}

export const getFeedbacksByIdUserApi = async(id:string) => {
    const url = `${apiFeedbacksURL}/user/${id}`;
    return await authAxios.get<IFeedback[]>(url)
}

export const getFeedbacksByIdProjectApi = async(id:string) => {
    const url = `${apiFeedbacksURL}/project/${id}`;
    return await authAxios.get<IFeedback[]>(url)
}

export const updateFeedbackApi = async (data: IFeedback) => {
    const url = `${apiFeedbacksURL}/${data.id}`;
    return await authAxios.patch(url, data);
};

export const deleteFeedbackApi = async(id:string)=>{
    const url = `${apiFeedbacksURL}/${id}`;
    return await authAxios.delete(url);
}
