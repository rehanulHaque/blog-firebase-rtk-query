import { Link } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import { postsTypes } from "../config/types";
import { useGetPostsQuery } from "../services/blogApi";
import Loader from "@/components/Loader";

const sideBarLinks = [
  {
    id: 1,
    name: "Home",
    link: "/",
  },
  {
    id: 2,
    name: "Dashboard",
    link: "/dashboard",
  },
  {
    id: 3,
    name: "Profile",
    link: "/profile",
  },
  {
    id: 4,
    name: "Reading List",
    link: "/readinglist",
  },
  {
    id: 5,
    name: "Pricing",
    link: "/pricing",
  },
];

const Home = () => {
  const { data, isFetching } = useGetPostsQuery("");
  if (isFetching) return <Loader/>;
  return (
    <main className="grid grid-cols-6 bg-slate-100 min-h-screen w-full p-4">
      {/* SideBar */}
      <div className="flex flex-col gap-4 ">
        {sideBarLinks.map((link) => (
          <div key={link.id} className="">
            <Link to={link.link} className="">{link.name}</Link>
          </div>
        ))}
      </div>

      {/* Main */}
      <div className="col-span-5 ml-2">
        {data &&
          data.map((post: postsTypes) => <BlogCard key={post.id} {...post} />)}
      </div>
    </main>
  );
};

export default Home;
