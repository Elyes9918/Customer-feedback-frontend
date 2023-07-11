import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiStatus } from "../types/ApiStatus";
import { IDashboardData } from "../types/dashboardData";
import { getDashboardDataApi } from "../services/DashboardService";

const dashboardData: IDashboardData = {};

const initialState = {
    dashboardData,
    status: ApiStatus.ideal,
}

export const GetDashboardDataAction = createAsyncThunk(
    "dashboard/GetDashboardDataAction",
    async () => {
       const response = await getDashboardDataApi();
       return response.data;
    }
);

const dashboardSlice = createSlice({
    name:"dashboard",
    initialState,
    reducers:{

    },
    extraReducers: (builder) =>{
    
        // getCommentListAction
        builder.addCase(GetDashboardDataAction.pending,(state)=>{
            state.status = ApiStatus.loading
        });
    
        builder.addCase(GetDashboardDataAction.fulfilled,(state,action)=>{
            state.status=ApiStatus.ideal;
            state.dashboardData=action.payload;
        });
    
        builder.addCase(GetDashboardDataAction.rejected, (state) => {
            state.status = ApiStatus.error;
          });
               
    }
})

export default dashboardSlice.reducer