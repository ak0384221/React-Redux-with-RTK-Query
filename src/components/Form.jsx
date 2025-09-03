import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAddPostMutation } from "../feature/api/postsApi";
export default function PostForm() {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    tags: [],
  });
  const dispatch = useDispatch();
  const [addPost] = useAddPostMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e) {
    e.preventDefault();

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
    function idGen() {
      return crypto.randomUUID();
    }

    const newObj = {
      id: idGen(),
      title: formData.title,
      body: formData.body,
      reactions: {
        likes: reactionGen("likes"),
        dislikes: reactionGen("dislikes"),
      },
      tags: tagsGen(formData.tags),
    };
    await addPost(newObj);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className=" p-4 rounded-2xl shadow-xl w-full max-w-md space-y-4 border border-neutral-700 mx-auto my-5"
    >
      <div className="flex  gap-3">
        {/* Title */}
        <div>
          <label className="block mb-2 font-medium text-gray-300">Title</label>
          <input
            required
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter post title"
            className="w-full p-3 rounded-lg bg-neutral-900   outline-none"
          />
        </div>

        {/* Body */}

        {/* Tags */}
        <div>
          <label className="block mb-2 font-medium text-gray-300">Tags</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="e.g., travel  food  coding"
            className="w-full p-3 rounded-lg bg-neutral-900   outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block mb-2 font-medium text-gray-300">
          Post Content
        </label>
        <textarea
          required
          name="body"
          value={formData.body}
          onChange={handleChange}
          rows="4"
          placeholder="Write your post..."
          className="w-full p-3 rounded-lg bg-neutral-900   outline-none"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-neutral-900 hover:bg-neutral-800 cursor-pointer transition-colors p-3 rounded-lg font-semibold text-white"
      >
        Submit
      </button>
    </form>
  );
}
