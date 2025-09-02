import { useState } from "react";
import { useDispatch } from "react-redux";
import { add } from "../feature/slices/postSlice";

export default function PostForm() {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    tags: [],
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(formData);
        dispatch(add(formData));
      }}
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
