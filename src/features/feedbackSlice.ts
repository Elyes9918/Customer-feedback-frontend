import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiStatus } from "../types/ApiStatus";
import { IFeedback } from "../types/Feedback";
import { createFeedbackApi, deleteFeedbackApi, getFeedbackByIdApi, getFeedbackListApi, getFeedbacksByIdProjectApi, getFeedbacksByIdUserApi, updateFeedbackApi } from "../services/FeedbackService";


const list : IFeedback[] = [];
const feedback: IFeedback = {};


const initialState = {
    list,
    feedback,
    status: ApiStatus.ideal,
}

export const CreateFeedbackAction = createAsyncThunk(
    "feedback/CreateFeedbackAction",
    async (data:IFeedback) => {
       const response = await createFeedbackApi(data);
       return response.data;
    }
);

export const UpdateFeedbackAction = createAsyncThunk(
    "feedback/UpdateFeedbackAction",
    async (data:IFeedback) => {
       const response = await updateFeedbackApi(data);
       return response.data;
    }
);

export const getFeedbackListAction = createAsyncThunk(
    "feedback/getFeedbackListAction",
    async () => {
       const response = await getFeedbackListApi();
       return response.data;
    }
);

export const GetFeedbackByIdAction = createAsyncThunk(
    "feedback/GetFeedbackByIdAction",
    async (id:string) => {
       const response = await getFeedbackByIdApi(id);
       return response.data;
    }
);

export const GetFeedbackByUserIdAction = createAsyncThunk(
    "feedback/GetFeedbackByUserIdAction",
    async (id:string) => {
       const response = await getFeedbacksByIdUserApi(id);
       return response.data;
    }
);

export const GetFeedbackByProjectIdAction = createAsyncThunk(
    "feedback/GetFeedbackByProjectIdAction",
    async (id:string) => {
       const response = await getFeedbacksByIdProjectApi(id);
       return response.data;
    }
);



export const DeleteFeedbackAction = createAsyncThunk(
    "feedback/DeleteFeedbackAction",
    async (id:string) => {
       const response = await deleteFeedbackApi(id);
       return response.data;
    }
);

const feedbackSlice = createSlice({
    name:"feedback",
    initialState,
    reducers:{

    },
    extraReducers: (builder) =>{

        // CreateFeedbackAction
        builder.addCase(CreateFeedbackAction.pending,(state)=>{
            state.status = ApiStatus.loading
        });
        builder.addCase(CreateFeedbackAction.fulfilled,(state,action)=>{
            state.status=ApiStatus.ideal;
        });
        builder.addCase(CreateFeedbackAction.rejected, (state) => {
            state.status = ApiStatus.error;
          });
    
        // getFeedbackListAction
        builder.addCase(getFeedbackListAction.pending,(state)=>{
            state.status = ApiStatus.loading
        });
    
        builder.addCase(getFeedbackListAction.fulfilled,(state,action)=>{
            state.status=ApiStatus.ideal;
            state.list=action.payload;
        });
    
        builder.addCase(getFeedbackListAction.rejected, (state) => {
            state.status = ApiStatus.error;
          });
          
        // GetFeedbackByIdAction
        builder.addCase(GetFeedbackByIdAction.pending,(state)=>{
            state.status = ApiStatus.loading
        });
    
        builder.addCase(GetFeedbackByIdAction.fulfilled,(state,action)=>{
            state.status=ApiStatus.ideal;
            state.feedback=action.payload;
        });
    
        builder.addCase(GetFeedbackByIdAction.rejected, (state) => {
            state.status = ApiStatus.error;
          });

        //   GetFeedbackByUserIdAction
        builder.addCase(GetFeedbackByUserIdAction.pending,(state)=>{
            state.status = ApiStatus.loading
        });
    
        builder.addCase(GetFeedbackByUserIdAction.fulfilled,(state,action)=>{
            state.status=ApiStatus.ideal;
            state.list=action.payload;
        });
    
        builder.addCase(GetFeedbackByUserIdAction.rejected, (state) => {
            state.status = ApiStatus.error;
          });

        // GetFeedbackByProjectIdAction
        builder.addCase(GetFeedbackByProjectIdAction.pending,(state)=>{
            state.status = ApiStatus.loading
        });
    
        builder.addCase(GetFeedbackByProjectIdAction.fulfilled,(state,action)=>{
            state.status=ApiStatus.ideal;
            state.list=action.payload;
        });
    
        builder.addCase(GetFeedbackByProjectIdAction.rejected, (state) => {
            state.status = ApiStatus.error;
          });

        // UpdateFeedbackAction
        builder.addCase(UpdateFeedbackAction.pending,(state)=>{
            state.status = ApiStatus.loading
        });
    
        builder.addCase(UpdateFeedbackAction.fulfilled,(state)=>{
            state.status=ApiStatus.ideal;
        });
    
        builder.addCase(UpdateFeedbackAction.rejected, (state) => {
            state.status = ApiStatus.error;
          });

        // DeleteFeedbackAction
        builder.addCase(DeleteFeedbackAction.pending,(state)=>{
            state.status = ApiStatus.loading
        });
    
        builder.addCase(DeleteFeedbackAction.fulfilled,(state)=>{
            state.status=ApiStatus.ideal;
        });
    
        builder.addCase(DeleteFeedbackAction.rejected, (state) => {
            state.status = ApiStatus.error;
          });

            
    }
})


export default feedbackSlice.reducer