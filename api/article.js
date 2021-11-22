import {
  request
} from "@/plugins/request"

// 获取全部articles
const getArticles = (params) => {
  return request({
    method: 'GET',
    url: '/api/articles',
    params
  })
}

//获取关注的articles
const getFeedArticles = (params) => {
  return request({
    method: 'GET',
    url: '/api/articles/feed',
    params
  })
}

//点赞
const onFavorites = ({
  slug
}) => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/favorite`,
  })
}

//取消点赞
const unFavorites = ({
  slug
}) => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/favorite`,
  })
}

// 获取特定article
const getArticleBySlug = (slug) => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}`,
  })
}

//创建新文章
const createArticle = data => {
  return request({
    method: 'POST',
    url: '/api/articles',
    data
  })
}

export {
  getArticles,
  getFeedArticles,
  onFavorites,
  unFavorites,
  getArticleBySlug,
  createArticle
}