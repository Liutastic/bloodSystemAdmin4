import request from '@/api/request.mock'

// import { requestForMock } from '@/api/service'
// const request = requestForMock

export function GetList (query) {
  return request({
    url: '/column/page',
    method: 'get',
    data: query
  })
}

export function AddObj (obj) {
  return request({
    url: '/column/add',
    method: 'post',
    data: obj
  })
}

export function UpdateObj (obj) {
  return request({
    url: '/column/update',
    method: 'post',
    data: obj
  })
}
export function DelObj (id) {
  return request({
    url: '/column/delete',
    method: 'post',
    data: { id }
  })
}
export function BatchDel (ids) {
  return request({
    url: '/column/batchDelete',
    method: 'post',
    data: { ids }
  })
}
