export interface IProject {
    id?: string;
    title?: string;
    client?: string;
    status?: string;
    description?:string;
    createdAt?:string;
    modifiedAt?:string;
    usersId?: string[];
  }