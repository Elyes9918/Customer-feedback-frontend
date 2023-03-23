import { Navigate, Outlet } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { IjwtPayload } from "../types/Jwt";

// After the register im gonna put a key in the localStorage the person on wizard register needs to verify it if
//it is valid he can stay 

export const isVerified = () =>{
    
    const getToken = () => JSON.parse(localStorage.getItem('accessToken') || '{}');
    const decodedJwt = jwt_decode<IjwtPayload>(getToken() || '') || null;

    return decodedJwt?.isVerified;

}


const RouteToWizardRegister = () => {

    return isVerified() ? <Outlet/> : <Navigate to="/registerWizard" />;
}
 
export default RouteToWizardRegister;