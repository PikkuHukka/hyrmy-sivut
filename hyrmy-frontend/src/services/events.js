import axios from 'axios'
const baseUrl = '/api/events'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const remove = (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then(response => response.data)
}

const likeEvent = async (id) => {
  const changedEvent = await axios.get(`${baseUrl}/${id}`)
  changedEvent.data.likes = changedEvent.data.likes + 1
  return axios.put(`${baseUrl}/${id}`, changedEvent.data)
}
const commentEvent = async (id, comment) => {
  const changedEvent = await axios.get(`${baseUrl}/${id}`)
  changedEvent.data.comments.push(comment)
  return axios.put(`${baseUrl}/${id}`, changedEvent.data)
}

export default { getAll, create, update, setToken, remove, likeEvent, commentEvent }
