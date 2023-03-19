import jwt_decode from "jwt-decode";
import { IjwtPayload } from "../types/Jwt";
import {  useAppDispatch } from "../app/store";
import { IUser } from "../types/User";
import { getUserByEmailAction } from "../features/userSlice";


export const currentUser = () => {
    const getToken = () => JSON.parse(localStorage.getItem('accessToken') || '{}');
    const decodedJwt = jwt_decode<IjwtPayload>(getToken() || '') || null;

    const getCurrentUser = () => JSON.parse(localStorage.getItem('currentUser') || '{}');
    const user = getCurrentUser() as IUser;

    user.token = decodedJwt;
    
    return user;
}

export default currentUser;