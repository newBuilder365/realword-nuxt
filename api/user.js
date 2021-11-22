import { request } from "@/plugins/request"

// 登录
const login = (data) => {
  return request({
    method: 'POST',
    url: '/api/users/login',
    data
  })
}

// 注册
const register = (data) => {
  return request({
    method: 'POST',
    url: '/api/users',
    data
  })
}

//获取用户信息
const getUser = () => {
  return request({
    method: 'GET',
    url: '/api/user'
  })
}

//更新用户信息
const updateUser = (data) => {
  return request({
    method: 'PUT',
    url: '/api/user',
    data 
  })
}

export {
  login,
  register,
  getUser,
  updateUser
}