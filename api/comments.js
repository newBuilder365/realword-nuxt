import { request } from "@/plugins/request"

//获取评论
const getComments = slug => {
  return request({
    method: "GET",
    url: `/api/articles/${slug}/comments`
  })
}

//添加评论
const addComments = data => {
  return request({
    method: "POST",
    url: `/api/articles/${data.slug}/comments`,
    data
  })
}

//删除评论
const deleteComments = data => {
  return request({
    method: "DELETE",
    url: `/api/articles/${data.slug}/comments/${data.id}`,
  })
}

export {
  getComments,
  addComments,
  deleteComments
}