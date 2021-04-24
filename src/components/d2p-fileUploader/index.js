import {
  request
} from '@/api/service'

import {
  BASEURL
} from '@/api/config'

import { d2CrudPlus } from 'd2-crud-plus'

export default {
  d2CrudPlus,
  defaultType: 'qiniu', // 默认类型为腾讯云上传，可选值：【cos、qiniu、alioss】
  qiniu: {
    bucket: 'd2p-demo',
    getToken (custom) {
      return request({
        url: BASEURL + '/api/qiniu-uptoken',
        method: 'get'
      }).then(ret => {
        console.log('ret: ', ret)
        const obj = {
          token: ret.uptoken,
          expires: 100000
        }
        return obj // {token:xxx,expires:xxx}
      })
    },
    successHandle (ret) { // 上传完成后可以在此处处理结果，修改url什么的
      console.log('success handle:', ret)
      return ret
    },
    domain: 'https://image.v1.vodeshop.com'
  }
}
