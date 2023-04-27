import axios from "axios";
import { IProject } from "../types/Project";

export const getToken = () => JSON.parse(localStorage.getItem('accessToken') || "{}");

const getAuthorizationHeader = `Bearer ${getToken()}`;

const apiFilesURL = "http://127.0.0.1:8000/api/v1/files"

const authAxios = axios.create({
    baseURL:apiFilesURL,
    headers : {
        Authorization: getAuthorizationHeader,
        'Content-Type': 'multipart/form-data'
    },
});

export const uploadFileApi = async (data) =>{
    return await authAxios.post(apiFilesURL,data);
}


export const getFilesUrlsByIdFeedbackApi = async(id:string) => {
    const url = `${apiFilesURL}/${id}`;
    return await authAxios.get(url);
}

export const downloadFileApi = async(fileUrl:string,fileName:string)=>{
    const response = await authAxios.get(fileUrl, { responseType: 'blob' });
    const blob = new Blob([response.data], { type: response.headers['content-type'] });
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


export const deleteFileApi = async(id:string)=>{
  const url = `${apiFilesURL}/${id}`;
  return await authAxios.delete(url);
}


