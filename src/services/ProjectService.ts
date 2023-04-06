import axios from "axios";
import { IProject } from "../types/Project";

export const getToken = () => JSON.parse(localStorage.getItem('accessToken') || "{}");

const getAuthorizationHeader = `Bearer ${getToken()}`;

const apiProjectsURL = "http://127.0.0.1:8000/api/v1/projects"

const authAxios = axios.create({
    baseURL:apiProjectsURL,
    headers : {
        Authorization: getAuthorizationHeader,
    },
});

export const createProjectApi = async (data: IProject) =>{
    return await authAxios.post(apiProjectsURL,data);
}

export const getProjectListApi = async () => {
    return await authAxios.get<IProject[]>(apiProjectsURL);
};


export const getProjectByIdApi = async(id:string) => {
    const url = `${apiProjectsURL}/${id}`;
    return await authAxios.get<IProject>(url)
}

export const getProjectsByIdUserApi = async(id:string) => {
    const url = `${apiProjectsURL}/user/${id}`;
    return await authAxios.get<IProject[]>(url)
}

export const updateProjectApi = async (data: IProject) => {
    const url = `${apiProjectsURL}/${data.id}`;
    return await authAxios.patch(url, data);
};

export const deleteProjectApi = async(id:string)=>{
    const url = `${apiProjectsURL}/${id}`;
    return await authAxios.delete(url);
}
