import { useState } from "react"

const Blog = ({ blog, handleLike }) => {
  const [ showMore, setShowMore ] = useState(false)
  const toggleVisibility = () => setShowMore(!showMore)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = (event, blog) => {
    event.preventDefault()

    let blogToUpdate = blog
    blogToUpdate.likes += 1
    handleLike(blogToUpdate)
  }



  return(
  <div style={showMore ? blogStyle: {} }>
    {blog.title} by {blog.author} - <button onClick={toggleVisibility}>{ showMore ? 'hide' : 'view' }</button>
    {showMore && <div>
      <p>url: {blog.url}</p>
      <p>likes: {blog.likes} <button onClick={(event) => addLike(event, blog)}>like</button></p>
      <p>user: {blog.user.name}</p>
    </div>}
  </div>  
)}

export default Blog