export interface IFeedback {
    id?: string;
    sujet?: string;
    description?: string;
    project_id?: string;
    status?:string;
    realised?:string;
    estimated_time?:string;
    priority?:string;
    rating?:string;
    createdAt?:string;
    modifiedAt?:string;
    usersId?: string[];
  }
