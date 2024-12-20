import { Link, useNavigate } from "react-router-dom";
import { useDeletePostMutation } from "../services/blogApi";
import { MdOutlineDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { postsTypes } from "../config/types";

const BlogCard = ({
  title,
  body,
  id,
  timestamp,
  author,
  dashboard,
}: postsTypes) => {
  const navigate = useNavigate()
  const [deletePost] = useDeletePostMutation()
  const handelDelete = async () => {
    deletePost(id)
    navigate('/')
  }
  return (
    <div className="p-4 shadow-md card bg-white rounded-md">
      <Link to={`/blog/${id}`}>
        <h1 className="text-sm xl:text-xl md:text-xl font-semibold text-wrap">{title}</h1>
        <small className="text-gray-400">Author: {author.split("@")[0]}</small>
        {dashboard && dashboard ? (
          <div
            dangerouslySetInnerHTML={{ __html: body.substring(0, 300) }}
            className="mt-3 prose text-wrap text-sm xl:text-xl md:text-xl"
          ></div>
        ) : null}
        {!dashboard ? (
          <p
            dangerouslySetInnerHTML={{ __html: body.substring(0, 100) }}
            className="mt-3"
          ></p>
        ) : null}
        <small className="text-gray-500">
          {new Date(timestamp?.seconds * 1000).toLocaleString()}
        </small>
      </Link>
      {dashboard && (
        <div className="flex gap-4 mt-4">
          <button className="px-4 py-2 rounded-md bg-red-500 text-white flex justify-between items-center" onClick={handelDelete}>
            <MdOutlineDelete className="text-xl mr-2"/> Delete
          </button>
          <Link to={`/editblog/${id}`} className="px-4 py-2 rounded-md bg-blue-500 text-white flex justify-between items-center">
            <FaRegEdit className="text-xl mr-2"/> Edit
          </Link>
        </div>
      )}
    </div>
  );
};

export default BlogCard;
