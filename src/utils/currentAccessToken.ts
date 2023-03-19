import jwt_decode from "jwt-decode";
import { IjwtPayload } from "../types/Jwt";
import {  useAppDispatch } from "../app/store";
import { IUser } from "../types/User";
import { getUserByEmailAction } from "../features/userSlice";


export const currentAccessToken = () => {
    const getToken = () => JSON.parse(localStorage.getItem('accessToken') || '{}');
    const decodedJwt = jwt_decode<IjwtPayload>(getToken() || '') || null;
    
    return decodedJwt;
}

export default currentAccessToken;