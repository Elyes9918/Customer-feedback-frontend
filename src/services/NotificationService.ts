import axios from "axios";
import { INotification } from "../types/Notification";

export const getToken = () => JSON.parse(localStorage.getItem('accessToken') || "{}");

const getAuthorizationHeader = `Bearer ${getToken()}`;

const apiNotificationsURL = "http://127.0.0.1:8000/api/v1/notifications"

const authAxios = axios.create({
    baseURL:apiNotificationsURL,
    headers : {
        Authorization: getAuthorizationHeader,
    },
});

export const createNotificationApi = async (data: INotification) =>{
    return await authAxios.post(apiNotificationsURL,data);
}

export const getNotificationListApi = async () => {
    return await authAxios.get<INotification[]>(apiNotificationsURL);
};

export const getNotificationsByIdUserApi = async(id:string) => {
    const url = `${apiNotificationsURL}/user/${id}`;
    return await authAxios.get<INotification[]>(url)
}

export const updateNotificationApi = async (data: INotification) => {
    const url = `${apiNotificationsURL}/${data.id}`;
    return await authAxios.patch(url, data);
};

export const deleteNotificationApi = async(id:string)=>{
    const url = `${apiNotificationsURL}/${id}`;
    return await authAxios.delete(url);
}
