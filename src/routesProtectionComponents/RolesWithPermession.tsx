import React from "react"
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

type Props = {
	rolesRequired : string;
	children?: React.ReactNode
}


const RolesWithPermession = (props: Props) => {
	const {rolesRequired, children} = props
	const userRoles = userRole();

	if(rolesRequired!==undefined){
		var rolesRequiredArr = rolesRequired.split(",");
	


    const isAllowed = () => {
        for (var role of userRoles) {
            for (var roleReq of rolesRequiredArr){
                if(role==="ROLE_"+roleReq) return 1;
            }
        }
        return 0;    
    }


	return (
		<>{ isAllowed() ? children : <></>}</>
	)

}else{
	return (<></>)
}
}

export default RolesWithPermession