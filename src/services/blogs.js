import axios from 'axios'
const baseUrl = '/api/blogs'

//variable token y función que define un nuevo token para crear nuevos blogs con información de usuario
let token = null
let setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async updateBlog => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.put(`${baseUrl}/${updateBlog.id}`, updateBlog, config)
  return response.data
}

const deleteBlog = async deleteBlog => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${deleteBlog.id}`, config)
  return response
}

export default { getAll, setToken, create, update, deleteBlog }