import { ApiStatus } from "./ApiStatus";
import { IjwtPayload } from "./Jwt";

export interface IUser {
    id?: string;
    email?: string;
    password?: string;
    createdAt?: string;
    modifiedAt?:string;
    lastLogin?:string;
    firstName?:string;
    lastName?:string;
    birthDate?:string;
    status?:string;
    address?:string;
    phoneNumber?:string
    company?:string;
    country?:string;
    projectsId?: number[];
    feedbacksId?: number[];
    roles?: string[];
    token?:IjwtPayload;
    refresh_token?:string;
    isVerified?:number;
    notificationIsOn?:string;
    checked?:boolean;
  }

export interface IUserForm{
  email?:string;
  password?:string;
  token?:string;
  lastLogin?:string;
  refresh_token?:string;
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