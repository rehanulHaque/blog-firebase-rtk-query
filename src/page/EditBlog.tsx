import { FormEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetSinglePostQuery,
  useUpdateMyBLogMutation,
} from "../services/blogApi";
import ReactQuill from "react-quill";
import { toast } from "react-toastify";
import Loader from "@/components/Loader";

const EditBlog = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const [updateMyBLog] = useUpdateMyBLogMutation();

  const { data, isFetching } = useGetSinglePostQuery(id || "");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title && value) {
      try {
        await updateMyBLog({
          id,
          title,
          body: value,
        });
        navigate("/dashboard");
        toast.success("Post updated successfully");
      } catch (error) {
        toast.error("Something went wrong");
      }
    } else {
      toast.error("Please edit title and body");
    }
  };
  if (isFetching) return <Loader/>;
  return (
    <main className="w-full mb-8">
      <div className="">
        <h1 className="text-3xl font-semibold my-2">Create New Post</h1>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="">
            <input
              type="text"
              placeholder="New Post title..."
              defaultValue={data?.title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-black rounded-md my-2"
            />
          </div>
          <div>
            <ReactQuill
              theme="snow"
              onChange={setValue}
              defaultValue={data?.body}
            />
          </div>
          <button className="px-4 py-2 bg-black text-white rounded-md w-full mt-4">
            Update
          </button>
        </form>
      </div>
    </main>
  );
};

export default EditBlog;
