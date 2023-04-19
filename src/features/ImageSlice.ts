import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiStatus } from "../types/ApiStatus";
import { deleteImageApi, getImagesUrlsByIdFeedbackApi } from "../services/ImageService";
import { IImage } from "../types/Image";


const list : IImage []= [];



const initialState = {
    list,
    status: ApiStatus.ideal,
}

export const GetImageUrlsIdFeedbackAction = createAsyncThunk(
    "image/GetImageUrlsIdFeedbackAction",
    async (id:string) => {
       const response = await getImagesUrlsByIdFeedbackApi(id);
       return response.data;
    }
);

export const DeleteImageAction = createAsyncThunk(
    "image/DeleteImageAction",
    async (id:string) => {
       const response = await deleteImageApi(id);
       return response.data;
    }
);

const imageSlice = createSlice({
    name:"image",
    initialState,
    reducers:{

    },
    extraReducers: (builder) =>{

        // GetImageUrlsIdFeedbackAction
        builder.addCase(GetImageUrlsIdFeedbackAction.pending,(state)=>{
            state.status = ApiStatus.loading
        });
    
        builder.addCase(GetImageUrlsIdFeedbackAction.fulfilled,(state,action)=>{
            state.status=ApiStatus.ideal;
            state.list=action.payload;
        });
    
        builder.addCase(GetImageUrlsIdFeedbackAction.rejected, (state) => {
            state.status = ApiStatus.error;
          });

        // DeleteImageAction
        builder.addCase(DeleteImageAction.pending,(state)=>{
            state.status = ApiStatus.loading
        });
    
        builder.addCase(DeleteImageAction.fulfilled,(state)=>{
            state.status=ApiStatus.ideal;
        });
    
        builder.addCase(DeleteImageAction.rejected, (state) => {
            state.status = ApiStatus.error;
          });


            
    }
})


export default imageSlice.reducer