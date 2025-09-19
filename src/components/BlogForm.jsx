import { useState } from "react"

const BlogForm = ({ handleCreateBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState(0)

  const createBlog = (event) => {
    event.preventDefault()
    let newBlog = {
      title: title,
      author: author,
      url: url,
      likes: likes
    }
    // console.log(newBlog)
    handleCreateBlog(newBlog)
    setTitle('')
    setAuthor('')
    setUrl('')
    setLikes(0)
  }

  return (
    <form onSubmit={createBlog}>
      <label style={{ display: "block" }}>title: <input type='text' onChange={event => setTitle(event.target.value)} value={title} ></input></label>
      <label style={{ display: "block" }}>author: <input type='text' onChange={event => setAuthor(event.target.value)} value={author} ></input></label>
      <label style={{ display: "block" }}>url: <input type='text' onChange={event => setUrl(event.target.value)} value={url}></input></label>
      <label style={{ display: "block" }}>likes: <input type='number' onChange={event => setLikes(event.target.value)} value={likes} ></input></label>
      <button type='submit' style={{ display: "block" }}>Create Blog</button>
    </form>
  )
}

export default BlogForm