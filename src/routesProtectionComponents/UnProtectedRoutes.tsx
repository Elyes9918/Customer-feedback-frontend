import { Navigate, Outlet } from "react-router-dom";


const useAuth = () =>{

    const token = localStorage.getItem('accessToken');
    if(token){
        return false;
    }else{
        return true;
    }
  
}

const UnProtectedRoutes = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet/> : <Navigate to="/main"  replace/>;

};

export default UnProtectedRoutes;

