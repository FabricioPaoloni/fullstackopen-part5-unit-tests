import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState(0)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const parsedUser = JSON.parse(loggedUserJSON)
      setUser(parsedUser)
      blogService.setToken(parsedUser.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      setUser(user)
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
    } catch {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBloglistUser')
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    try {
      let newBlog = {
        title: title,
        author: author,
        url: url,
        likes: likes
      }
      const createdBlog = await blogService.create(newBlog)
      setTitle('')
      setAuthor('')
      setUrl('')
      setLikes(0)
      setSuccessMessage(`New blog created: ${createdBlog.title} by ${createdBlog.author}`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
      let newBlogList = blogs.concat(createdBlog)
      setBlogs(newBlogList)
    } catch {
      setErrorMessage('An error ocurred while creating a new blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input type='text' value={username}
              onChange={({ target }) => setUsername(target.value)}></input>
          </label>
        </div>
        <div>
          <label>
            password
            <input type='password' value={password}
              onChange={({ target }) => setPassword(target.value)}></input>
          </label>
        </div>
        <button type='submmit'>login</button>
      </form>
    </div>
  )

  return (
    <div>
      {errorMessage && <h3 style={{color: "red"}}>Error: {errorMessage}</h3>}
      {successMessage && <h3 style={{color: "green"}}>{successMessage}</h3>}
      
      {user === null ?
        loginForm() :
        <div>
          <h3>{user.name} logged in <button onClick={handleLogout} >logout</button></h3>

          <h2>Create new blog:</h2>
          <form onSubmit={handleCreateBlog}>
            <label style={{display: "block"}}>title: <input type='text' onChange={({ target }) => { setTitle(target.value) }} value={title} ></input></label>
            <label style={{display: "block"}}>author: <input type='text' onChange={({ target }) => { setAuthor(target.value) }} value={author} ></input></label>
            <label style={{display: "block"}}>url: <input type='text' onChange={({ target }) => { setUrl(target.value) }} value={url}></input></label>
            <label style={{display: "block"}}>likes: <input type='number' onChange={({ target }) => { setLikes(target.value) }} value={likes} ></input></label>
            <button type='submit' style={{display: "block"}}>Create Blog</button>
          </form>

          <h2>blogs</h2>
          

          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }

    </div>
  )
}

export default App