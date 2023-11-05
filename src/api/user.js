import request from 'utils/request'

/**
 * 用户登录
 * @param {string} mobile 手机号
 * @param {string} code 验证码
 * @returns Promise
 */
export const login = (mobile, code) => {
  return request({
    method: 'post',
    url: '/authorizations',
    data: {
      mobile,
      code,
    },
  })
}

/**
 * 获取用户信息
 * @returns 
 */
export const getUserProfile = () => {
  return request({
    method: 'get',
    url: '/user/profile'
  })
}

