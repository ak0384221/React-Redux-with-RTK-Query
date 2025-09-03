import { createSlice } from "@reduxjs/toolkit";
import { createEntityAdapter } from "@reduxjs/toolkit";

export const postsAdapter = createEntityAdapter({});

export const initialState = postsAdapter.getInitialState({
  status: "idle",
  error: null,
});

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
});

export default postSlice.reducer;
