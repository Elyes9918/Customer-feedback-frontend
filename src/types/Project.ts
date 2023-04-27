export interface IProject {
    id?: string;
    title?: string;
    client?: string;
    status?: string;
    description?:string;
    repo?:string;
    createdAt?:string;
    modifiedAt?:string;
    usersId?: string[];
    feedbacks?: string[];
    creator?:string[];
    
  }