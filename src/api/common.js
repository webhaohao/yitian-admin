/*
 * @Author: your name
 * @Date: 2020-01-09 14:09:21
 * @LastEditTime : 2020-01-19 10:19:46
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xianxiapai-admin\src\api\common.js
 */
import request from '@/utils/request'

export function getCatories() {
  return request({
    url: '/category/all',
    method: 'get'
  })
}

export function getNewsCategory() {
  return request({
    url: '/newsCategory/all',
    method: 'get'
  })
}

export function removeNewsCategory(id) {
  return request({
    url: `/newsCategory/remove/${id}`,
    method: 'get'
  })
}

export function createNewsCategory(data) {
  return request({
    url: '/newsCategory/create',
    method: 'post',
    data
  })
}

export function createActivity(data) {
  return request({
    url: '/create_activity',
    method: 'post',
    data
  })
}
export function createNews(data) {
  return request({
    url: '/create_news',
    method: 'post',
    data
  })
}

export function createOrUpdateAbout(data) {
  return request({
    url: '/about/createOrUpdate',
    method: 'post',
    data
  })
}

export function getAbout() {
  return request({
    url: '/about/get',
    method: 'get'
  })
}

export function createOrUpdateUserAgreement(data) {
  return request({
    url: '/userAgreement/createOrUpdate',
    method: 'post',
    data
  })
}

export function getUserAgreement() {
  return request({
    url: '/userAgreement/get',
    method: 'get'
  })
}

export function getMarkers(type) {
  return request({
    url: '/markers',
    method: 'get',
    params: {
      type
    }
  })
}

export function getMarkersType() {
  return request({
    url: '/getMarkersType',
    method: 'get'
  })
}

export function getActivityTypeCategory() {
  return request({
    url: '/activityType/category',
    method: 'get'
  })
}

export function createCategory(data) {
  return request({
    url: '/category/create',
    method: 'post',
    data
  })
}

export function removeCategory(id) {
  return request({
    url: `/category/remove/${id}`,
    method: 'get'
  })
}

export function getCategoryByActivityTypeId(params) {
  return request({
    url: '/category/byActivityTypeId',
    method: 'get',
    params
  })
}

export function getActivitesByActivityTypeId(params) {
  return request({
    url: '/activity/byActivityType',
    method: 'get',
    params
  })
}

export function getActivityDetailById(id) {
  return request({
    url: `/activity/detail/${id}`,
    method: 'get'
  })
}

export function createBanner(data) {
  return request({
    url: `/banner/createBanner`,
    method: 'post',
    data
  })
}
export function getNewsDetailByCategoryId(params) {
  return request({
    url: '/news/detail_by_CategoryId',
    method: 'get',
    params
  })
}

//  api common test 123456 123123
