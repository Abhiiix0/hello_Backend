import { configureStore } from "@reduxjs/toolkit";
import uesrReducer from "./userSlice";
export const store = configureStore({
  reducer: {
    user: uesrReducer,
  },
});
