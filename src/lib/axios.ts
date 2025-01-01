import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
  },
})

instance.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    const errStatus = error.response.status
    if (errStatus == 401) {
      // do something
    }
    return Promise.reject(error)
  },
)

export default instance
