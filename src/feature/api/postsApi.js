import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { initialState, postsAdapter } from "../slices/postSlice";

export const postsApiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  tagTypes: ["posts"],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts",
      providesTags: (res) =>
        res
          ? [
              { type: "posts", id: "LIST" },
              ...res.ids.map((id) => ({
                type: "posts",
                id,
              })),
            ]
          : [{ type: "posts", id: "LIST" }],
      transformResponse: (response) => {
        return postsAdapter.setAll(initialState, response);
      },
    }),

    addPost: builder.mutation({
      query: (post) => ({
        url: "/posts",
        method: "POST",
        body: post,
      }),
      invalidatesTags: [{ type: "posts", id: "LIST" }],
    }),

    removePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "posts", id }],
    }),
    updatePost: builder.mutation({
      query: ({ id, reactions }) => ({
        url: `posts/${id}`,
        method: "PATCH",
        body: { reactions },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "posts", id }],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useRemovePostMutation,
} = postsApiSlice;
