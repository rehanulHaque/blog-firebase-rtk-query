import BlogCard from "../components/BlogCard"
import { postsTypes } from "../config/types"
import { useGetPostsQuery } from "../services/blogApi"


const Home = () => {
  const {data, isFetching} = useGetPostsQuery('')
  if(isFetching) return 'Loading...'
  return (
    <main className="">
      <h1 className="text-3xl font-semibold my-2 text-center mt-8">Coding Blogs</h1>
      <div className="grid md:grid-cols-3 gap-4 sm:grid-cols-2 xs:block">
      {data && data.map((post: postsTypes) => (
        <BlogCard key={post.id} {...post}/>
      ))}
      </div>
    </main>
  )
}

export default Home