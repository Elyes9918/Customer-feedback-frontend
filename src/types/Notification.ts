export interface INotification {
    id?: string;
    description?: string;
    isRead?: string;
    type?:string;
    createdAt?:string;
    modifiedAt?:string;
    user?: string[];
    usersId?:string[];
  }
