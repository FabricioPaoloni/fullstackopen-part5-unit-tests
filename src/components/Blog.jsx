import { useState } from "react"

const Blog = ({ blog, handleLike, loggedUser, handleDeleteBlog }) => {
  const [showMore, setShowMore] = useState(false)
  const toggleVisibility = () => {
    setShowMore(!showMore)
    // console.log(blog)
    // console.log(loggedUser)
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const deleteStyle = {
    marginBottom: 5,
    backgroundColor: 'orange',
    borderRadius: 5
  }

  const addLike = (event, blog) => {
    event.preventDefault()

    let blogToUpdate = blog
    blogToUpdate.likes += 1
    handleLike(blogToUpdate)
  }

  const deleteBlog = (blogToDelete) => {
    handleDeleteBlog(blogToDelete)
  }


  return (
    <div style={showMore ? blogStyle : {}}>
      {blog.title} by {blog.author} - <button onClick={() => toggleVisibility(blog)}>{showMore ? 'hide' : 'view'}</button>
      {showMore && <div>
        url: {blog.url} <br />
        likes: {blog.likes} <button onClick={(event) => addLike(event, blog)}>like</button> <br />
        user: {blog.user.name} <br />
        {loggedUser.username === blog.user.username &&
          <button style={deleteStyle} onClick={() => deleteBlog(blog)}>delete blog</button>
        }
      </div>}
    </div>
  )
}

export default Blog