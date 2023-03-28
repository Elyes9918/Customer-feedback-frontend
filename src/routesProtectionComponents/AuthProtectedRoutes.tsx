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

const AuthProtectedRoutes = () => {

    const isAuth = useAuth();

    if(isAuth===true){
        return <Outlet/>;

    }else if(isAuth===false){
       return  <Navigate to="/login"  replace/>;
    }

};

export default AuthProtectedRoutes;


