import axios from "axios";
import { IComment } from "../types/Comment";
import { IDashboardData } from "../types/dashboardData";

export const getToken = () => JSON.parse(localStorage.getItem('accessToken') || "{}");

const getAuthorizationHeader = `Bearer ${getToken()}`;

const apiDashboardURL = "http://127.0.0.1:8000/api/v1/dashboard"

const authAxios = axios.create({
    baseURL:apiDashboardURL,
    headers : {
        Authorization: getAuthorizationHeader,
    },
});

export const getDashboardDataApi = async() => {
    const url = `${apiDashboardURL}/data`;
    return await authAxios.get<IDashboardData>(url)
}

