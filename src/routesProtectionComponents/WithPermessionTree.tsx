import React from "react"
import jwt_decode from "jwt-decode";
import { IjwtPayload } from "../types/Jwt";

type Props = {
	minRoleRequired: "ADMIN" | "MEMBER" | "GESTIONNAIRE" | "CLIENT"
	children?: React.ReactNode
}

let permession : {[key: string]: number} ={
    ROLE_ADMIN:4,
    ROLE_GESTIONNAIRE:3,
    ROLE_MEMBER:2,
    ROLE_CLIENT:1
}

//if role required is equals

const useRole = () => {

    const getToken = () => JSON.parse(localStorage.getItem('accessToken') || '{}');
    const decodedJwt = jwt_decode<IjwtPayload>(getToken() || '') || null;
    const roles = decodedJwt.roles;

	if (roles) {
		return roles
	} else {
		return "USER"
	}
}

const WithPermessionTree = (props: Props) => {
	const {minRoleRequired, children} = props
	const roles = useRole();


    const isAllowed = () => {
        for (var role of roles) {
            if(permession[role] >= permession["ROLE_"+minRoleRequired]){
                return true;
            }
       }
        return false;
    }


	return (
		<>{ isAllowed() ? children : <></>}</>
	)
}

export default WithPermessionTree