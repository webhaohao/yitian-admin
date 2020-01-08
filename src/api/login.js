import request from '@/utils/request'

export function loginByUsername(ac, se) {
  const data = {
    ac,
    se
  }
  return request({
    url: '/token/app',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

