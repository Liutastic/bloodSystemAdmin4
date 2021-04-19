import {
  request
} from '@/api/service'

import {
  BASEURL,
  QINIUURL
} from '@/api/config'

export default {
  defaultType: 'qiniu', // 默认类型为腾讯云上传，可选值：【cos、qiniu、alioss】
  qiniu: {
    bucket: 'd2p-demo',
    getToken (custom) {
      return request({
        url: BASEURL + '/api/qiniu-uptoken',
        method: 'get'
      }).then(ret => {
        return {
          token: ret.uptoken,
          expires: 100000
        }
      })
    },
    successHandle (ret) { // 上传完成后可以在此处处理结果，修改url什么的
      return ret
    },
    domain: 'https://image.v1.vodeshop.com'
  },
  form: {
    action: QINIUURL,
    name: 'file',
    withCredentials: false,
    successHandle (ret) { // 上传完成后的结果处理， 此处后台返回的结果应该为 ret = {data:'fileurl'}
      if (ret.data == null || ret.data === '') {
        throw new Error('上传失败')
      }
      return { url: ret.data }
    }
  }
}
