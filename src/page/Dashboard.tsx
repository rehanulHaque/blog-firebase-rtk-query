import { useSelector } from "react-redux";
import { useGetMyPostsQuery } from "../services/blogApi";
import BlogCard from "../components/BlogCard";
import { FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { UserTypes, postsTypes } from "../config/types";

const Blog = () => {
  const user = useSelector(
    (state: { User: { user: UserTypes } }) => state.User
  );
  const { data, isFetching } = useGetMyPostsQuery(user.user.uid);
  const isVerified = user.user.emailVerified;
  if (!isVerified) {
    return <div className="mt-8 md:mt-16 lg:mt-20">
      <h1 className="text-center">Please verify your email</h1>
      <button className="px-4 py-2 bg-black text-white rounded-md w-full mt-4"><Link to={"/verify"}>Resend Email</Link></button>
    </div>;
  }
  if (isFetching) return "Loading...";

  return (
    <main className="">
      <div className="flex justify-between mt-8 pb-2 border-b-2">
        <h1 className="text-2xl font-bold">My Blogs</h1>
        <Link
          to="/profile"
          className="px-4 py2 rounded-md bg-blue-500 text-white flex justify-between items-center"
        >
          <FaRegUser className="mr-2" /> Profile
        </Link>
      </div>
      <div className=" block mt-8">
        {data &&
          data.map((post: postsTypes) => (
            <BlogCard key={post.id} {...post} dashboard />
          ))}
      </div>
    </main>
  );
};

export default Blog;
