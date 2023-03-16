import { Navigate, Outlet } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { IjwtPayload } from "../types/Jwt";


export const userRole = () =>{
    
    const getToken = () => JSON.parse(localStorage.getItem('accessToken') || '{}');
    const decodedJwt = jwt_decode<IjwtPayload>(getToken() || '') || null;
    const roles = decodedJwt.roles;

    if(roles){
        return roles;
    }else{
        return [];
    }
}

type ProtectedRouteRole = {
	rolesRequired : string;
}

const RoleProtectedRoutes = (props: ProtectedRouteRole) => {
    
    const userRoles = userRole();
    var rolesRequiredArr = props.rolesRequired.split(",");
    
    const isAllowed = () => {

        for (var role of userRoles) {
            for (var roleReq of rolesRequiredArr){
                if(role==="ROLE_"+roleReq) return 1;
            }
        }
        return 0;        
    }

    return isAllowed() ? <Outlet/> : <Navigate to="/main"  replace/>;

};

export default RoleProtectedRoutes;

