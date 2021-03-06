import { request } from '@/api/service'

export function GetList (query) {
  return request({
    url: '/svc/marketing-svc/admin/v1/activity-user/users',
    method: 'get',
    params: query
  })
}

export function AddObj (obj) {
  return request({
    url: '/fix/add',
    method: 'post',
    data: obj
  })
}

export function UpdateObj (obj) {
  return request({
    url: '/fix/update',
    method: 'post',
    data: obj
  })
}
export function DelObj (id) {
  return request({
    url: '/fix/delete',
    method: 'post',
    data: { id }
  })
}
