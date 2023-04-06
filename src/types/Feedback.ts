export interface IFeedback {
    id?: string;
    title?: string;
    description?: string;
    project_id?: string;
    status?:string;
    estimated_time?:string;
    priority?:string;
    rating?:string;
    createdAt?:string;
    modifiedAt?:string;
    usersId?: string[];
    creator?:string[];
  }
