import axios from "axios";
import { IProject } from "../types/Project";

export const getToken = () => JSON.parse(localStorage.getItem('accessToken') || "{}");

const getAuthorizationHeader = `Bearer ${getToken()}`;

const apiImagesURL = "http://127.0.0.1:8000/api/v1/images"

const authAxios = axios.create({
    baseURL:apiImagesURL,
    headers : {
        Authorization: getAuthorizationHeader,
        'Content-Type': 'multipart/form-data'
    },
});

export const uploadImageApi = async (data) =>{
    return await authAxios.post(apiImagesURL,data);
}


export const getImagesUrlsByIdFeedbackApi = async(id:string) => {
    const url = `${apiImagesURL}/${id}`;
    return await authAxios.get(url)
}

export const getImageStaticApi = async(url:string)=>{
    const headers = {
        Accept: 'image/*',
        'Content-Type': 'image/*'
      };
    
      try {
        const response = await authAxios.get(url, { headers, responseType: 'arraybuffer' });
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        return URL.createObjectURL(blob);
      } catch (error) {
        console.error(error);
        throw error;
      }
}

export const deleteImageApi = async(id:string)=>{
  const url = `${apiImagesURL}/${id}`;
  return await authAxios.delete(url);
}


