import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { ApiStatus } from "../types/ApiStatus";
import {  getUserByEmailApi, getUserByIdApi, getUserListApi, unAssignFeedbackApi, unAssignProjectApi, unAssignRoleApi, updateUserApi } from "../services/UserService";
import { IUser } from "../../src/types/User";


const list : IUser[] = [];

const initialState = {
    list,
    listStatus: ApiStatus.ideal,
    LoginUserFormStatus:ApiStatus.ideal
}

export const getUserListAction = createAsyncThunk(
    "user/getUserListAction",
    async () => {
       const response = await getUserListApi();
       console.log(response.data);
       return response.data;
    }
);

export const UpdateUserAction = createAsyncThunk(
    "user/UpdateUserAction",
    async (data:IUser) => {
       const response = await updateUserApi(data);
       console.log(response.data);
       return response.data;
    }
);

export const GetUserByIdAction = createAsyncThunk(
    "user/GetUserByIdAction",
    async (id:number) => {
       const response = await getUserByIdApi(id);
       console.log(response.data);
       return response.data;
    }
);

export const getUserByEmailAction = createAsyncThunk(
    "user/getUserByEmailAction",
    async (email:string) => {
       const response = await getUserByEmailApi(email);
       console.log(response.data);
       return response.data;
    }
);

export const unAssignRoleAction = createAsyncThunk(
    "user/unAssignRoleAction",
    async (data:IUser) => {
       const response = await unAssignRoleApi(data);
       console.log(response.data);
       return response.data;
    }
);

export const unAssignProjectAction = createAsyncThunk(
    "user/unAssignProjectAction",
    async (data:IUser) => {
       const response = await unAssignProjectApi(data);
       console.log(response.data);
       return response.data;
    }
);

export const unAssignFeedbackAction = createAsyncThunk("user/unAssignFeedbackAction", async (data : IUser) => {
    const response = await unAssignFeedbackApi(data);
    console.log(response.data);
    return response.data;
});





const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{

    },
    extraReducers: (builder) =>{

    builder.addCase(getUserListAction.pending,(state)=>{
        state.listStatus = ApiStatus.loading
    });

    builder.addCase(getUserListAction.fulfilled,(state,action)=>{
        state.listStatus=ApiStatus.ideal;
        state.list=action.payload;
    });

    builder.addCase(getUserListAction.rejected, (state) => {
        state.listStatus = ApiStatus.error;
      });

    }
})

export default userSlice.reducer