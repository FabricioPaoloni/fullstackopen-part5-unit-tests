

const BlogForm = ({
    handleCreateBlog,
    handleTitleChange,
    handleAuthorChange,
    handleUrlChange,
    handleLikesChange,
    title,
    author,
    url,
    likes
}) => {
    return(
        <form onSubmit={handleCreateBlog}>
            <label style={{display: "block"}}>title: <input type='text' onChange={handleTitleChange} value={title} ></input></label>
            <label style={{display: "block"}}>author: <input type='text' onChange={handleAuthorChange} value={author} ></input></label>
            <label style={{display: "block"}}>url: <input type='text' onChange={handleUrlChange} value={url}></input></label>
            <label style={{display: "block"}}>likes: <input type='number' onChange={handleLikesChange} value={likes} ></input></label>
            <button type='submit' style={{display: "block"}}>Create Blog</button>
          </form>
    )
}

export default BlogForm