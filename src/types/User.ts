import { ApiStatus } from "./ApiStatus";
import { IjwtPayload } from "./Jwt";

export interface IUser {
    id?: string;
    email?: string;
    password?: string;
    createdAt?: string;
    modifiedAt?:string;
    firstName?:string;
    lastName?:string;
    birthDate?:string;
    status?:string;
    address?:string;
    phoneNumber?:string
    company?:string;
    projectsId?: number[];
    feedbacksId?: number[];
    roles?: string[];
    token?:IjwtPayload;
    isVerified?:number;
    checked?:boolean;
  }

export interface IUserForm{
  email?:string;
  password?:string;
  token?:string;
}

export interface RegisterUser{
  email?:string;
  password?:string;
  cPassword?:string
}

interface IUserState{
    list: IUser[],
    listStatus: ApiStatus,
    LoginUserFormStatus:ApiStatus
}