import { FormEvent, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useAddPostMutation } from "../services/blogApi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { UserTypes } from "../config/types";

const AddBlog = () => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const [addPost] = useAddPostMutation();
  const user = useSelector((state: {User: {user: UserTypes}}) => state.User);
  const isVerified = user.user.emailVerified;
  if (!isVerified) {
    return <div className="mt-8 md:mt-16 lg:mt-20">
      <h1 className="text-center">Please verify your email</h1>
      <button className="px-4 py-2 bg-black text-white rounded-md w-full mt-4"><Link to={"/verify"}>Resend Email</Link></button>
    </div>;
  }
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (title && value) {
      await addPost({ title, body: value, author: user.user?.email, userId: user.user?.uid });
      navigate("/");
      toast.success("Post created successfully");
      setLoading(false)
    } else {
      setLoading(false)
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
          <button className="px-4 py-2 bg-black text-white rounded-md w-full mt-4 disabled:cursor-not-allowed disabled:bg-gray-700" disabled={loading}>
            {loading? "Creating Post..." : "Create Post"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default AddBlog;
