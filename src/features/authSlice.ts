import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { ApiStatus } from "../../src/types/ApiStatus";
import { IUserForm } from "../../src/types/User";
import { ChangePasswordApi, LoginUserApi, RegisterUserApi, ResetPasswordRequestApi } from "../services/AuthService";
import { IjwtPayload } from "../../src/types/Jwt";

const jwtpayload : IjwtPayload = {} as any;


const initialState = {
    authStatus : ApiStatus.ideal,
    jwtpayload
}

export const LoginUserAction = createAsyncThunk(
    "auth/loginUserAction",
    async (data:IUserForm)=> {
       await LoginUserApi(data).then((response)=>{
            const AccessToken = JSON.stringify(response.data.token);
            localStorage.setItem("accessToken",AccessToken);
    
            return response.data;
        }).catch((error)=>{
            throw error
        });
    }
)

export const LogoutUserAction = createAsyncThunk(
    "auth/logoutUserAction",
    async () => {
        localStorage.clear();
    }
)

export const resetUserPasswordAction = createAsyncThunk(
    "auth/resetUserPasswordAction",
    async (data:IUserForm) =>{
        await ResetPasswordRequestApi(data);
    }
)

export const ChangeUserPasswordAction = createAsyncThunk(
    "auth/ChangeUserPasswordAction",
    async (data:IUserForm) => {
        await ChangePasswordApi(data);

    }
)

export const RegisterUserAction = createAsyncThunk(
    "auth/registerUserAction",
    async (data:IUserForm)=>{
        await RegisterUserApi(data);
    }
)


const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers: {

    },
    extraReducers: (builder) =>{
        builder.addCase(LoginUserAction.pending,(state)=>{
            state.authStatus = ApiStatus.loading
        });

        builder.addCase(LoginUserAction.fulfilled,(state,action)=>{
            state.authStatus = ApiStatus.success;
            // state.jwtpayload = action.payload;
        });

        builder.addCase(LoginUserAction.rejected,(state)=>{
            state.authStatus = ApiStatus.error
        });
    }

})

export default authSlice.reducer
