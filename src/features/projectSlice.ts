import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiStatus } from "../types/ApiStatus";
import { IProject } from "../types/Project"
import { createProjectApi, deleteProjectApi, getProjectByIdApi, getProjectListApi, updateProjectApi,getProjectsByIdUserApi } from "../services/ProjectService";


const list : IProject[] = [];
const project: IProject = {};


const initialState = {
    list,
    project,
    status: ApiStatus.ideal,
}

export const CreateProjectAction = createAsyncThunk(
    "project/CreateProjectAction",
    async (data:IProject) => {
       const response = await createProjectApi(data);
       return response.data;
    }
);

export const getProjectListAction = createAsyncThunk(
    "project/getProjectListAction",
    async () => {
       const response = await getProjectListApi();
       return response.data;
    }
);

export const GetProjectsByIdUserAction = createAsyncThunk(
    "project/GetProjectsByIdUserAction",
    async (id:string) => {
       const response = await getProjectsByIdUserApi(id);
       return response.data;
    }
);

export const GetProjectByIdAction = createAsyncThunk(
    "project/GetProjectByIdAction",
    async (id:string) => {
       const response = await getProjectByIdApi(id);
       return response.data;
    }
);

export const UpdateProjectAction = createAsyncThunk(
    "project/UpdateProjectAction",
    async (data:IProject) => {
       const response = await updateProjectApi(data);
       return response.data;
    }
);

export const DeleteProjectAction = createAsyncThunk(
    "project/DeleteProjectAction",
    async (id:string) => {
       const response = await deleteProjectApi(id);
       return response.data;
    }
);

const projectSlice = createSlice({
    name:"project",
    initialState,
    reducers:{

    },
    extraReducers: (builder) =>{

        // CreateProjectAction
        builder.addCase(CreateProjectAction.pending,(state)=>{
            state.status = ApiStatus.loading
        });
        builder.addCase(CreateProjectAction.fulfilled,(state,action)=>{
            state.status=ApiStatus.ideal;
        });
        builder.addCase(CreateProjectAction.rejected, (state) => {
            state.status = ApiStatus.error;
          });
    
        // getProjectListAction
        builder.addCase(getProjectListAction.pending,(state)=>{
            state.status = ApiStatus.loading
        });
    
        builder.addCase(getProjectListAction.fulfilled,(state,action)=>{
            state.status=ApiStatus.ideal;
            state.list=action.payload;
        });
    
        builder.addCase(getProjectListAction.rejected, (state) => {
            state.status = ApiStatus.error;
          });

        
        // GetProjectsByIdUserAction
        builder.addCase(GetProjectsByIdUserAction.pending,(state)=>{
            state.status = ApiStatus.loading
        });
    
        builder.addCase(GetProjectsByIdUserAction.fulfilled,(state,action)=>{
            state.status=ApiStatus.ideal;
            state.list=action.payload;
        });
    
        builder.addCase(GetProjectsByIdUserAction.rejected, (state) => {
            state.status = ApiStatus.error;
          });

          
        // GetProjectByIdAction
        builder.addCase(GetProjectByIdAction.pending,(state)=>{
            state.status = ApiStatus.loading
        });
    
        builder.addCase(GetProjectByIdAction.fulfilled,(state,action)=>{
            state.status=ApiStatus.ideal;
            state.project=action.payload;
        });
    
        builder.addCase(GetProjectByIdAction.rejected, (state) => {
            state.status = ApiStatus.error;
          });

        // UpdateProjectAction
        builder.addCase(UpdateProjectAction.pending,(state)=>{
            state.status = ApiStatus.loading
        });
    
        builder.addCase(UpdateProjectAction.fulfilled,(state)=>{
            state.status=ApiStatus.ideal;
        });
    
        builder.addCase(UpdateProjectAction.rejected, (state) => {
            state.status = ApiStatus.error;
          });

        // DeleteProjectAction
        builder.addCase(DeleteProjectAction.pending,(state)=>{
            state.status = ApiStatus.loading
        });
    
        builder.addCase(DeleteProjectAction.fulfilled,(state)=>{
            state.status=ApiStatus.ideal;
        });
    
        builder.addCase(DeleteProjectAction.rejected, (state) => {
            state.status = ApiStatus.error;
          });

            
    }
})


export default projectSlice.reducer