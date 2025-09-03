import PostForm from "./components/Form";
import { useGetPostsQuery } from "./feature/api/postsApi";
import Post from "./components/Post";
function App() {
  const { data, error, isLoading } = useGetPostsQuery();
  console.log(data);
  return (
    <>
      <PostForm />

      <div className="flex flex-col gap-2 items-center py-5 ">
        {isLoading && <h1>Loading...</h1>}
        {error && <h1>Error: {data.error}</h1>}
        {data?.ids?.map((id) => (
          <Post key={id} data={data.entities[id]} />
        ))}
      </div>
    </>
  );
}
export default App;
