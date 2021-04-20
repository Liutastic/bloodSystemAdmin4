import request from '@/api/request.mock'

export function GetList (query) {
  return request({
    url: '/api/icon/page',
    method: 'get',
    data: query
  })
}

export function AddObj (obj) {
  return request({
    url: '/api/icon/add',
    method: 'post',
    data: obj
  })
}

export function UpdateObj (obj) {
  return request({
    url: '/api/icon/update',
    method: 'post',
    data: obj
  })
}
export function DelObj (id) {
  return request({
    url: '/api/icon/delete',
    method: 'post',
    data: { id }
  })
}
export function GetCustomName (callingCode, mobile) {
  return request({
    url: '/api/icon/getCustomName',
    method: 'get',
    data: { callingCode, mobile }
  })
}
