export interface IjwtPayload {
    iat?: number;
    exp?: number;
    roles?: string[];
    username?: string;
    isVerified?:boolean;
    id?:string;
  }