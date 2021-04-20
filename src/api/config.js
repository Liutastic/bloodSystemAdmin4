let MBASEURL, MSOCKETURL, MWEb_BASEURL

if (process.env.NODE_ENV === 'development') {
  // 开发 npm run dev
  MBASEURL = 'https://test.api.vodeshop.com'
  // MBASEURL = 'http://10.10.10.178:9501'
  MWEb_BASEURL = 'https://test.m.vodeshop.com'
  MSOCKETURL = 'ws://123.207.136.134:9010/ajaxchattest'
} else if (process.env.NODE_ENV === 'production') {
  // 生产 npm run build
  MBASEURL = 'https://api.vodeshop.com'
  MWEb_BASEURL = 'https://m.vodeshop.com'
  MSOCKETURL = 'ws://8.129.186.35:6001/'
}

export const BASEURL = MBASEURL
export const SOCKETURL = MSOCKETURL
export const WEb_BASEURL = MWEb_BASEURL
export const QINIUURL = 'https://upload-z2.qiniup.com'
export const IMGBASEURL = 'https://image.v1.vodeshop.com/' // 七牛域名
export const GD_FE_KEY = 'ba6d7bcba1c0f4f8b5dfb704d553ccf0' // 高德web端key
export const GD_S_KEY = 'f0d91cd10e926499e9e466e541afc203' // 高德web端服务key
export const GD_WX_KEY = 'ca06b283654e96768fcfb0f66ad982c2' // 高德微信小程序key

// 过滤不需要token的接口
export const WHITE_LIST = [
  `${BASEURL}/api/auth/login/weixin`
]
