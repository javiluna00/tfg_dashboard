import useRefresh from '@/hooks/useRefresh'
import axios from 'axios'

function CustomAxios () {
  const BASE_URL = 'http://localhost:8000/api/'

  const Axios = axios.create({
    baseURL: BASE_URL
  })

  const { refresh } = useRefresh()

  const AxiosGoogle = axios.create({})

  const AxiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  })

  const refreshAndRetryQueue = []

  // Flag to prevent multiple token refresh requests
  let isRefreshing = false

  AxiosPrivate.interceptors.request.use(
    (config) => {
      const token = window.localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => Promise.reject(error)
  )

  AxiosPrivate.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config

      const message = error.response?.data?.message
      if (error.response && error.response.status === 401 && (message === 'token_not_found' || message === 'token_expired')) {
        if (!isRefreshing) {
          isRefreshing = true
          try {
            // Refresh the access token
            const newAccessToken = await refresh()

            console.log('newAccessToken : ', newAccessToken)

            // Update the request headers with the new access token
            error.config.headers.Authorization = `Bearer ${newAccessToken}`

            // Retry all requests in the queue with the new token
            refreshAndRetryQueue.forEach(({ config, resolve, reject }) => {
              AxiosPrivate
                .request(config)
                .then((response) => resolve(response))
                .catch((err) => reject(err))
            })

            // Clear the queue
            refreshAndRetryQueue.length = 0

            // Retry the original request
            return AxiosPrivate(originalRequest)
          } finally {
            isRefreshing = false
          }
        }

        // Add the original request to the queue
        return new Promise((resolve, reject) => {
          refreshAndRetryQueue.push({ config: originalRequest, resolve, reject })
        })
      }

      // Return a Promise rejection if the status code is not 401
      return Promise.reject(error)
    }
  )

  return { Axios, AxiosPrivate, AxiosGoogle }
}

export default CustomAxios
