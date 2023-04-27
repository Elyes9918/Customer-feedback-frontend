import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    eTime : 0,
    progress :"",

    notificationPanel : false,
    infoPerso : true,
}

export const global = createSlice({
  name: "global",
  initialState,
  reducers: {
    getData: (state, action) => {
      state.eTime = action.payload;
    },
    setNotificationPanel: (state, action) => {
      state.notificationPanel = action.payload;
    },
    setInfoPerso: (state, action) => {
      state.infoPerso = action.payload;
    },
  },
});

export const { getData } = global.actions;
export const { setNotificationPanel } = global.actions;
export const { setInfoPerso } = global.actions;



export default global.reducer;