import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiStatus } from "../types/ApiStatus";
import { IFile } from "../types/File";
import { deleteFileApi, getFilesUrlsByIdFeedbackApi } from "../services/FileService";


const list : IFile [] = [];



const initialState = {
    list,
    status: ApiStatus.ideal,
}

export const GetFileUrlsIdFeedbackAction = createAsyncThunk(
    "file/GetFileUrlsIdFeedbackAction",
    async (id:string) => {
       const response = await getFilesUrlsByIdFeedbackApi(id);
       return response.data;
    }
);

export const DeleteFileAction = createAsyncThunk(
    "file/DeleteFileAction",
    async (id:string) => {
       const response = await deleteFileApi(id);
       return response.data;
    }
);

const imageSlice = createSlice({
    name:"file",
    initialState,
    reducers:{

    },
    extraReducers: (builder) =>{

        // GetFileUrlsIdFeedbackAction
        builder.addCase(GetFileUrlsIdFeedbackAction.pending,(state)=>{
            state.status = ApiStatus.loading
        });
    
        builder.addCase(GetFileUrlsIdFeedbackAction.fulfilled,(state,action)=>{
            state.status=ApiStatus.ideal;
            state.list=action.payload;
        });
    
        builder.addCase(GetFileUrlsIdFeedbackAction.rejected, (state) => {
            state.status = ApiStatus.error;
          });

        // DeleteFileAction
        builder.addCase(DeleteFileAction.pending,(state)=>{
            state.status = ApiStatus.loading
        });
    
        builder.addCase(DeleteFileAction.fulfilled,(state)=>{
            state.status=ApiStatus.ideal;
        });
    
        builder.addCase(DeleteFileAction.rejected, (state) => {
            state.status = ApiStatus.error;
          });
   
    }
})


export default imageSlice.reducer