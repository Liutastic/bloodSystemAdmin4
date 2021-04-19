export default ({ request }) => ({
  // 获取七牛TOKEN
  qiniuToken () {
    return request({
      url: '/api/qiniu-uptoken',
      method: 'get'
    })
  }
})
