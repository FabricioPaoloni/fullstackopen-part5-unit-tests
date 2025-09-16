import { useState } from "react"

const Blog = ({ blog }) => {
  const [ showMore, setShowMore ] = useState(false)
  const toggleVisibility = () => setShowMore(!showMore)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }



  return(
  <div style={showMore ? blogStyle: {} }>
    {blog.title} by {blog.author} - <button onClick={toggleVisibility}>{ showMore ? 'hide' : 'view' }</button>
    {showMore && <div>
      <p>url: {blog.url}</p>
      <p>likes: {blog.likes} <button>like</button></p>
      <p>user: {blog.user.name}</p>
    </div>}
  </div>  
)}

export default Blog