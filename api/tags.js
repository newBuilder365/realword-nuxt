import { request } from "@/plugins/request"

// 获取标签
const getTags = () => {
  return request({
    method: 'GET',
    url: '/api/tags',
  })
}

export {
  getTags
}