// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import usernameReducer from "../slices/usernameSlice";
import useridReducer from "../slices/useridSlice";
import dataReducer from "../slices/dataSlice";

export const store = configureStore({
  reducer: {
    username: usernameReducer,
    userid: useridReducer,
    data: dataReducer,
  },
});

// Define the RootState type using the store's state
export type RootState = ReturnType<typeof store.getState>;

// Define the AppDispatch type for dispatch
export type AppDispatch = typeof store.dispatch;
