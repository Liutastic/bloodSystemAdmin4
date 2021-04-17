import request from '@/api/request.mock'

// import { requestForMock } from '@/api/service'
// const request = requestForMock

export function GetList (query) {
  return request({
    url: '/api/column/page',
    method: 'get',
    data: query
  })
}

export function AddObj (obj) {
  return request({
    url: '/api/column/add',
    method: 'post',
    data: obj
  })
}

export function UpdateObj (obj) {
  return request({
    url: '/api/column/update',
    method: 'post',
    data: obj
  })
}
export function DelObj (id) {
  return request({
    url: '/api/column/delete',
    method: 'post',
    data: { id }
  })
}
export function BatchDel (ids) {
  return request({
    url: '/api/column/batchDelete',
    method: 'post',
    data: { ids }
  })
}
