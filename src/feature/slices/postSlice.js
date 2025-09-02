import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { formatDistanceToNow } from "date-fns";
import { createEntityAdapter } from "@reduxjs/toolkit";
//

const postsAdapter = createEntityAdapter({});

const initialState = postsAdapter.getInitialState({
  status: "idle",
  error: null,
});

// const initialState = {
//   isLoading: false,
//   isError: false,
//   error: null,
//   posts: [
//     {
//       id: 1,
//       title: "title hello",
//       body: "content body",
//       reactions: { likes: 10, dislikes: 0 },
//       tags: ["eat", "sleep", "read"],
//     },
//   ],
// };

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await fetch("http://localhost:5000/posts");
  return response.json();
});

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    add: {
      prepare: (obj) => {
        function reactionGen(type) {
          if (type == "likes") {
            return Math.floor(Math.random() * 500) + 1;
          } else {
            return Math.floor(Math.random() * 5) + 1;
          }
        }
        function tagsGen(str) {
          return str.split(" ");
        }
        function relativeTime(date) {
          if (date instanceof Date) {
            return formatDistanceToNow(date, { addSuffix: true });
          }
        }
        function idGen() {
          return crypto.randomUUID();
        }

        return {
          payload: {
            id: idGen(),
            title: obj.title,
            body: obj.body,
            reactions: {
              likes: reactionGen("likes"),
              dislikes: reactionGen("dislikes"),
            },
            tags: tagsGen(obj.tags),
          },
        };
      },
      reducer: (state, action) => {
        postsAdapter.addOne(state, action);
        console.log(action.payload);
      },
    },
    remove: postsAdapter.removeOne,
    like: (state, action) => {
      if (state.entities[action.payload]) {
        state.entities[action.payload].reactions.likes += 1;
      }
    },
    dislike: (state, action) => {
      if (state.entities[action.payload]) {
        state.entities[action.payload].reactions.dislikes += 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        postsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        (state.error = true), (state.error = action.error.message);
      });
  },
});
export const selectAllPosts = (state) => state.posts;

export default postSlice.reducer;
export const { add, remove, like, dislike } = postSlice.actions;
