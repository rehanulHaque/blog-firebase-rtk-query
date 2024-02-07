import { FormEvent, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useAddPostMutation } from "../services/blogApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { UserTypes } from "../config/types";

const AddBlog = () => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const [addPost] = useAddPostMutation();
  const user = useSelector((state: {User: {user: UserTypes}}) => state.User);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title && value) {
      await addPost({ title, body: value, author: user.user?.email, userId: user.user?.uid });
      navigate("/");
      toast.success("Post created successfully");
    } else {
      toast.error("Please add title and body");
    }
  };
  return (
    <main className="w-full  mb-8">
      <div className="">
        <h1 className="text-3xl font-semibold my-2">Create New Post</h1>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="">
            <input
              type="text"
              placeholder="New Post title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-black rounded-md my-2"
            />
          </div>
          <div>
            <ReactQuill theme="snow" value={value} onChange={setValue}/>
          </div>
          <button className="px-4 py-2 bg-black text-white rounded-md w-full mt-4">
            Create
          </button>
        </form>
      </div>
    </main>
  );
};

export default AddBlog;
