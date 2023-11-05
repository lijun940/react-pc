import axios from 'axios'
import { getToken, hasToken } from './storage'
import { message } from 'antd'
import { history } from 'utils/history'
export const baseURL = 'http://geek.itheima.net/v1_0/'
const instance = axios.create({
  baseURL,
  timeout: 5000,
})
instance.interceptors.request.use(
  function (config) {
    if (hasToken) {
      config.headers.Authorization = `Bearer ${getToken()}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
instance.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    if (!error.response) {
      message.error('网络繁忙')
      return Promise.reject(new Error('网络繁忙'))
    }
    if (error?.response.status === 401) {
      message.warn('登录信息过期了')
      history.push('/login')
    }
    return Promise.resolve(error)
  }
)
export default instance
