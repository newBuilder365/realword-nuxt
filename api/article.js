import request from "@/utils/request"

// 登录
const getArticles = (data) => {
  return request({
    method: 'GET',
    url: '/api/articles',
    data
  })
}

export {
  getArticles
}