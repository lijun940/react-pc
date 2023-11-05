import request from 'utils/request'
/**
 * 获取频道数据
 * @returns
 */
export function getArticles(params) {
  return request({
    url: '/mp/articles',
    method: 'get',
    params,
  })
}
export const delArticle = (id) => {
  return request.delete(`/mp/articles/{${id}}`)
}

export const addArticle = (data, draft = false) => {
  return request.post(`/mp/articles?draft=${draft}`, data)
}

export const updateArticle = (data, draft = false) => {
  return request.put(`/mp/articles/${data.id}?draft=${draft}`, data)
}
