import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiStatus } from "../types/ApiStatus";
import { IComment } from "../types/Comment";
import { createCommentApi, deleteCommentApi, getCommentByIdApi, getCommentListApi, getCommentsByIdFeedbackApi, updateCommentApi } from "../services/CommentService";


const list : IComment[] = [];
const comment: IComment = {};


const initialState = {
    list,
    comment,
    status: ApiStatus.ideal,
}

export const CreateCommentAction = createAsyncThunk(
    "comment/CreateCommentAction",
    async (data:IComment) => {
       const response = await createCommentApi(data);
       return response.data;
    }
);

export const UpdateCommentAction = createAsyncThunk(
    "comment/UpdateCommentAction",
    async (data:IComment) => {
       const response = await updateCommentApi(data);
       return response.data;
    }
);

export const getCommentListAction = createAsyncThunk(
    "feedback/getCommentListAction",
    async () => {
       const response = await getCommentListApi();
       return response.data;
    }
);

export const GetCommentByIdAction = createAsyncThunk(
    "comment/GetCommentByIdAction",
    async (id:string) => {
       const response = await getCommentByIdApi(id);
       return response.data;
    }
);


export const GetCommentByFeedbackIdAction = createAsyncThunk(
    "comment/GetCommentByFeedbackIdAction",
    async (id:string) => {
       const response = await getCommentsByIdFeedbackApi(id);
       return response.data;
    }
);


export const DeleteCommentAction = createAsyncThunk(
    "comment/DeleteCommentAction",
    async (id:string) => {
       const response = await deleteCommentApi(id);
       return response.data;
    }
);

const commentSlice = createSlice({
    name:"comment",
    initialState,
    reducers:{

    },
    extraReducers: (builder) =>{

        // CreateCommentAction
        builder.addCase(CreateCommentAction.pending,(state)=>{
            state.status = ApiStatus.loading
        });
        builder.addCase(CreateCommentAction.fulfilled,(state,action)=>{
            state.status=ApiStatus.ideal;
        });
        builder.addCase(CreateCommentAction.rejected, (state) => {
            state.status = ApiStatus.error;
          });
    
        // getCommentListAction
        builder.addCase(getCommentListAction.pending,(state)=>{
            state.status = ApiStatus.loading
        });
    
        builder.addCase(getCommentListAction.fulfilled,(state,action)=>{
            state.status=ApiStatus.ideal;
            state.list=action.payload;
        });
    
        builder.addCase(getCommentListAction.rejected, (state) => {
            state.status = ApiStatus.error;
          });
          
        // GetCommentByIdAction
        builder.addCase(GetCommentByIdAction.pending,(state)=>{
            state.status = ApiStatus.loading
        });
    
        builder.addCase(GetCommentByIdAction.fulfilled,(state,action)=>{
            state.status=ApiStatus.ideal;
            state.comment=action.payload;
        });
    
        builder.addCase(GetCommentByIdAction.rejected, (state) => {
            state.status = ApiStatus.error;
          });

       
        // GetCommentByFeedbackIdAction
        builder.addCase(GetCommentByFeedbackIdAction.pending,(state)=>{
            state.status = ApiStatus.loading
        });
    
        builder.addCase(GetCommentByFeedbackIdAction.fulfilled,(state,action)=>{
            state.status=ApiStatus.ideal;
            state.list=action.payload;
        });
    
        builder.addCase(GetCommentByFeedbackIdAction.rejected, (state) => {
            state.status = ApiStatus.error;
          });

        // UpdateFeedbackAction
        builder.addCase(UpdateCommentAction.pending,(state)=>{
            state.status = ApiStatus.loading
        });
    
        builder.addCase(UpdateCommentAction.fulfilled,(state)=>{
            state.status=ApiStatus.ideal;
        });
    
        builder.addCase(UpdateCommentAction.rejected, (state) => {
            state.status = ApiStatus.error;
          });

        // DeleteFeedbackAction
        builder.addCase(DeleteCommentAction.pending,(state)=>{
            state.status = ApiStatus.loading
        });
    
        builder.addCase(DeleteCommentAction.fulfilled,(state)=>{
            state.status=ApiStatus.ideal;
        });
    
        builder.addCase(DeleteCommentAction.rejected, (state) => {
            state.status = ApiStatus.error;
          });

            
    }
})


export default commentSlice.reducer