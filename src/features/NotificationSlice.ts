import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiStatus } from "../types/ApiStatus";
import { INotification } from "../types/Notification";
import { createNotificationApi, deleteNotificationApi, getNotificationListApi, getNotificationsByIdUserApi, updateNotificationApi } from "../services/NotificationService";


const list : INotification[] = [];
const notification: INotification = {};


const initialState = {
    list,
    notification,
    status: ApiStatus.ideal,
}

export const CreateNotificationAction = createAsyncThunk(
    "notification/CreateNotificationAction",
    async (data:INotification) => {
       const response = await createNotificationApi(data);
       return response.data;
    }
);

export const UpdateNotificationAction = createAsyncThunk(
    "notification/UpdateNotificationAction",
    async (data:INotification) => {
       const response = await updateNotificationApi(data);
       return response.data;
    }
);

export const getNotificationListAction = createAsyncThunk(
    "notification/getNotificationListAction",
    async () => {
       const response = await getNotificationListApi();
       return response.data;
    }
);


export const GetNotificationByUserIdAction = createAsyncThunk(
    "notification/GetNotificationByUserIdAction",
    async (id:string) => {
       const response = await getNotificationsByIdUserApi(id);
       return response.data;
    }
);


export const DeleteNotificationAction = createAsyncThunk(
    "notification/DeleteNotificationAction",
    async (id:string) => {
       const response = await deleteNotificationApi(id);
       return response.data;
    }
);

const notificationSlice = createSlice({
    name:"notification",
    initialState,
    reducers:{

    },
    extraReducers: (builder) =>{

        // CreateNotificationAction
        builder.addCase(CreateNotificationAction.pending,(state)=>{
            state.status = ApiStatus.loading
        });
        builder.addCase(CreateNotificationAction.fulfilled,(state,action)=>{
            state.status=ApiStatus.ideal;
        });
        builder.addCase(CreateNotificationAction.rejected, (state) => {
            state.status = ApiStatus.error;
          });
    
        // getNotificationListAction
        builder.addCase(getNotificationListAction.pending,(state)=>{
            state.status = ApiStatus.loading
        });
    
        builder.addCase(getNotificationListAction.fulfilled,(state,action)=>{
            state.status=ApiStatus.ideal;
            state.list=action.payload;
        });
    
        builder.addCase(getNotificationListAction.rejected, (state) => {
            state.status = ApiStatus.error;
          });
          

        // GetNotificationByUserIdAction
        builder.addCase(GetNotificationByUserIdAction.pending,(state)=>{
            state.status = ApiStatus.loading
        });
    
        builder.addCase(GetNotificationByUserIdAction.fulfilled,(state,action)=>{
            state.status=ApiStatus.ideal;
            state.list=action.payload;
        });
    
        builder.addCase(GetNotificationByUserIdAction.rejected, (state) => {
            state.status = ApiStatus.error;
          });

        // UpdateNotificationAction
        builder.addCase(UpdateNotificationAction.pending,(state)=>{
            state.status = ApiStatus.loading
        });
    
        builder.addCase(UpdateNotificationAction.fulfilled,(state)=>{
            state.status=ApiStatus.ideal;
        });
    
        builder.addCase(UpdateNotificationAction.rejected, (state) => {
            state.status = ApiStatus.error;
          });

        // DeleteNotificationAction
        builder.addCase(DeleteNotificationAction.pending,(state)=>{
            state.status = ApiStatus.loading
        });
    
        builder.addCase(DeleteNotificationAction.fulfilled,(state)=>{
            state.status=ApiStatus.ideal;
        });
    
        builder.addCase(DeleteNotificationAction.rejected, (state) => {
            state.status = ApiStatus.error;
          });

            
    }
})


export default notificationSlice.reducer