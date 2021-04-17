import { imgBaseUrl } from '@/api/config'

/**
 * @desc 七牛压缩以及域名处理
 * @param {url} 七牛KEY或完整路径
 * @param {width} 七牛图片压缩宽度高度自适应
 * @param {type} 媒体类型默认图片可传video
*/
export function qiniu (url, width = 768, type = 'image') {
  if (url && typeof url === 'string') {
    // 判断是否存在域名，然后返回媒体
    if (url.includes('http') || url.includes('https')) {
      if (type === 'image' && url !== 'gysa-default-logo.png') {
        return `${url}?imageView2/2/w/${width}/format/png`
      }
      return url
    }
    if (type === 'image' && url !== 'gysa-default-logo.png') {
      return `${imgBaseUrl}${url}?imageView2/2/w/${width}/format/png`
    }
    return `${imgBaseUrl}${url}`
  }
  return `${imgBaseUrl}gysa-default-logo.png`
}

// 格式化w单位
export function formatNumber (v) {
  if (v > 9999) {
    return (v / 10000).toFixed(1) + 'w'
  }
  return v
}
