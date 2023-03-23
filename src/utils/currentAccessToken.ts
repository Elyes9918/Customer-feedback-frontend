import jwt_decode from "jwt-decode";
import { IjwtPayload } from "../types/Jwt";


export const currentAccessToken = () => {
    const getToken = () => JSON.parse(localStorage.getItem('accessToken') || '{}');
    const decodedJwt = jwt_decode<IjwtPayload>(getToken() || '') || null;
    
    return decodedJwt;
}

export default currentAccessToken;