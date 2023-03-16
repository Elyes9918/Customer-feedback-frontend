import React from "react"
import jwt_decode from "jwt-decode";
import { IjwtPayload } from "../types/Jwt";

type Props = {
	roleRequired: "ADMIN" | "MEMBER" | "GESTIONNAIRE" | "CLIENT"
	children?: React.ReactNode
}

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

const WithPermessionUnique = (props: Props) => {
	const {roleRequired, children} = props
	const role = useRole();
    

	return (
		<>{role.includes("ROLE_"+roleRequired) ? children : <></>}</>
	)
}

export default WithPermessionUnique