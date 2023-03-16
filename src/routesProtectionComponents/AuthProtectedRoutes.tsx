import { Navigate, Outlet } from "react-router-dom";


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
    return isAuth ? <Outlet/> : <Navigate to="/login"  replace/>;

};

export default AuthProtectedRoutes;


