const TOKEN_KEY = 'geek-pc-hz21-token'

/**
 * 保存token
 * @param {*} token 
 */
export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token)
}
/**
 * 获取token
 * @returns token
 */
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY)
}

/**
 * 移除token
 */
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY)
}

/**
 * 判断是否有token
 * @returns 
 */
export const hasToken = () => !!getToken()


