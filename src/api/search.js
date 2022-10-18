import request from '@/utils/request'

/**
 *
 * @param {String} q 搜索关键词
 * @returns
 */

export const getSuggestionsAPI = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

/**
 *
 * @param {number} page 页码
 * @param {number} per_page  页面数
 * @param {string} q 关键字
 * @returns
 */

// 传参与params和data中的配置项要一一对应,顺序乱了报错！
export const getResultAPI = (q, page, per_page) => {
  return request({
    url: '/v1_0/search',
    params: {
      q,
      page,
      per_page
    }
  })
}
