import { Action, configureStore,ThunkDispatch } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import userReducer  from "../features/userSlice";
import authReducer  from "../features/authSlice";
import projectReducer  from "../features/projectSlice";
import feedbackSlice from "../features/feedbackSlice";
import globalSlice from "../features/globalSlice";
import CommentSlice from "../features/CommentSlice";



export const store = configureStore({
  reducer: {
    user : userReducer,
    auth : authReducer,
    project: projectReducer,
    feedback: feedbackSlice,
    global: globalSlice,
    comment:CommentSlice
  }
  
  
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type ThunkAppDispatch = ThunkDispatch<RootState, void, Action>;
export const useAppThunkDispatch = () => useDispatch<ThunkAppDispatch>();

