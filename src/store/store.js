import { configureStore } from "@reduxjs/toolkit";
import postSliceReducer from "../feature/slices/postSlice";
const store = configureStore({
  reducer: {
    posts: postSliceReducer,
  },
});

export default store;
