import { useParams } from "react-router-dom"
import { useGetSinglePostQuery } from "../services/blogApi"

const SingleBlog = () => {
  const {id} = useParams()
  const {data, isFetching} = useGetSinglePostQuery(id || "")
  
  if(isFetching) {
    return 'Loading...'
  }

  return (
    <main className="py-8 px-8">
      <h1 className="text-3xl font-semibold py-3">{data.title}</h1>
      <p className="text-gray-700 pb-4 ">Author: {data.author.split('@')[0]}</p>
      <div dangerouslySetInnerHTML={{__html: data.body}} className="prose xl:prose-xl"></div>
    </main>
  )
}

export default SingleBlog
