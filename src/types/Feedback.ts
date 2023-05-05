export interface IFeedback {
    id?: string;
    title?: string;
    description?: string;
    project_id?: string;
    status?:string;
    estimatedTime?:string;
    priority?:string;
    rating?:string;
    progress?:string;
    repo?:string;
    createdAt?:string;
    modifiedAt?:string;
    usersId?: string[];
    creator?:string[];
    project?:string[];
  }
