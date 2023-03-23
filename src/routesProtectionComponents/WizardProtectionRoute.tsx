import { Navigate, Outlet } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { IjwtPayload } from "../types/Jwt";


export const useAuth = () =>{

    const token = localStorage.getItem('accessToken');
    if(token){
        return true;
    }else{
        return false;
    }
  
}


const WizardProtectionRoute = () => {

    const isAuth = useAuth();
    const getToken = () => JSON.parse(localStorage.getItem('accessToken') || '{}');
    const decodedJwt = jwt_decode<IjwtPayload>(getToken() || '') || null;

    if((isAuth===true && decodedJwt.isVerified===false)){
         return <Outlet/>;
    }else if(isAuth===false || decodedJwt.isVerified===true){
       return  <Navigate to="/login"  replace/>;
    }

};

export default WizardProtectionRoute;
