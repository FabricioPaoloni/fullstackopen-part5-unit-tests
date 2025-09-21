import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
    })
  }, [])
  //sort blogs to show them in order acording to the amount of likes
  let sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

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

  const handleCreateBlog = async (newBlog) => {
    try {
      const createdBlog = await blogService.create(newBlog)
      setSuccessMessage(`New blog created: ${createdBlog.title} by ${createdBlog.author}`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
      let newBlogList = blogs.concat(createdBlog)
      console.log(createdBlog)
      setBlogs(newBlogList)
    } catch {
      setErrorMessage('An error ocurred while creating a new blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLike = async (updateBlog) => {
    try {
      const updatedBlog = await blogService.update(updateBlog)
      setSuccessMessage(`Blog updated: ${updatedBlog.title} by ${updatedBlog.author}`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch {
      setErrorMessage('Error ocurred while updating the blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleDeleteBlog = async (deleteBlog) => {
    try {
      let confirmation = window.confirm('Are you sure you want to delete that blog?')
      if (confirmation) {
        const deletedBlog = await blogService.deleteBlog(deleteBlog)
        let filteredArray = blogs.filter(blog => blog.id !== deleteBlog.id)
        setBlogs(filteredArray)
        console.log(deletedBlog)
        setSuccessMessage(`Blog deleted: ${deleteBlog.title} by ${deleteBlog.author}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      } else {
        setErrorMessage('Delete operation canceled by user')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    } catch {
      setErrorMessage('Error ocurred while deleting the blog')
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
      {errorMessage && <h3 style={{ color: "red" }}>Error: {errorMessage}</h3>}
      {successMessage && <h3 style={{ color: "green" }}>{successMessage}</h3>}

      {user === null ?
        loginForm() :
        <div>
          <h3>{user.name} logged in <button onClick={handleLogout} >logout</button></h3>

          <h2>Create new blog:</h2>
          <Togglable buttonLabel='create new blog' >
            <BlogForm
              handleCreateBlog={handleCreateBlog}
            />
          </Togglable>


          <h2>blogs</h2>
          {/* <ul> */}
          {sortedBlogs.map(blog =>
            <Blog key={blog.id} blog={blog}
              handleLike={handleLike} loggedUser={user}
              handleDeleteBlog={handleDeleteBlog} />
          )}
          {/* </ul> */}
        </div>
      }

    </div>
  )
}

export default App