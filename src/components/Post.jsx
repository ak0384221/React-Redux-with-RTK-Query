import { useDispatch } from "react-redux";
import { dislike, like, remove } from "../feature/slices/postSlice";

export default function Post({ data }) {
  const dispatch = useDispatch();
  return (
    <div className="w-[90dvw] border border-neutral-600 rounded-xl h-max min-h-[20dvh] flex flex-col justify-between p-5">
      <div className="upper ">
        <h1 className="text-3xl font-bold">
          {data?.title || "...Title empty"}
        </h1>

        <h3 className="font-light my-5">{data?.body || "empty"}</h3>
      </div>
      <div className="lower flex justify-evenly items-center">
        <span
          onClick={() => dispatch(like(data?.id))}
          className="border border-neutral-600 w-1/3 py-2 text-center bg-neutral-800"
        >
          likes : {data?.reactions?.likes || 0}
        </span>
        <span
          onClick={() => dispatch(dislike(data?.id))}
          className="border border-neutral-600 w-1/3 py-2 text-center bg-neutral-800"
        >
          dislikes : {data?.reactions?.dislikes || 0}
        </span>
        <span
          onClick={() => dispatch(remove(data?.id))}
          className="border border-neutral-600 w-1/3 py-2 text-center bg-neutral-800"
        >
          remove
        </span>
      </div>
    </div>
  );
}
