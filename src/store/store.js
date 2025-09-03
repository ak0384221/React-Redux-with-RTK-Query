import { configureStore } from "@reduxjs/toolkit";
import postSliceReducer from "../feature/slices/postSlice";
import { postsApiSlice } from "../feature/api/postsApi";

const store = configureStore({
  reducer: {
    posts: postSliceReducer,
    [postsApiSlice.reducerPath]: postsApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApiSlice.middleware),
});

export default store;
