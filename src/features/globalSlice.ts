import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    eTime : 0,
    progress :""
}

export const global = createSlice({
  name: "global",
  initialState,
  reducers: {
    getData: (state, action) => {
      state.eTime = action.payload;
    },
  },
});

export const { getData } = global.actions;

export default global.reducer;