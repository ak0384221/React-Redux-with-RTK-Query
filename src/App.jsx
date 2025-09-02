import { useDispatch, useSelector } from "react-redux";
import PostForm from "./components/Form";
import Post from "./components/Post";
import { fetchPosts, selectAllPosts } from "./feature/slices/postSlice";
import { useEffect } from "react";

function App() {
  const posts = useSelector(selectAllPosts);
  console.log(posts);
  const dispatch = useDispatch();
  useEffect(() => {
    if (posts.status === "idle") {
      dispatch(fetchPosts());
    }
  }, []);
  return (
    <>
      <PostForm />

      <div className="flex flex-col gap-2 items-center py-5 ">
        {posts.status === "pending" && <h1>Loading...</h1>}
        {posts.status === "failed" && <h1>Error: {posts.error}</h1>}
        {posts.ids?.map((id) => (
          <Post key={id} data={posts.entities[id]} />
        ))}
      </div>
    </>
  );
}
export default App;
