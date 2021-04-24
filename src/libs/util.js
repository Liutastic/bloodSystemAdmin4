import cookies from './util.cookies'
import db from './util.db'
import log from './util.log'
import dayjs from 'dayjs'
import { IMGBASEURL } from '@/api/config'

const util = {
  cookies,
  db,
  log
}

/**
 * @description 更新标题
 * @param {String} title 标题
 */
util.title = function (titleText) {
  const processTitle = process.env.VUE_APP_TITLE || 'D2Admin'
  window.document.title = `${processTitle}${titleText ? ` | ${titleText}` : ''}`
}

/**
 * @description 打开新页面
 * @param {String} url 地址
 */
util.open = function (url) {
  var a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('target', '_blank')
  a.setAttribute('id', 'd2admin-link-temp')
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(document.getElementById('d2admin-link-temp'))
}
/**
 * 将任意对象转化为树
 * @param data
 * @param key
 * @param pid
 * @param parent
 * @returns {Array}
 */
util.formatDataToTree = (data, key = 'menu_id', pid = 'parent_id', parent = {}) => {
  if (!data || Object.keys(data).length <= 0) {
    return []
  }

  const map = {}
  const isSetParent = Object.keys(parent).length > 0

  data.forEach(value => {
    if (isSetParent && parent.value.includes(value[parent.key])) {
      value[pid] = 0
    }

    map[value[key]] = { ...value }
  })

  const tree = []
  for (const id in data) {
    if (!Object.prototype.hasOwnProperty.call(data, id)) {
      continue
    }

    // 对应索引
    const index = data[id][key]
    if (!Object.prototype.hasOwnProperty.call(map, index)) {
      continue
    }

    // 子节点压入
    if (map[index][pid]) {
      if (!map[map[index][pid]]) {
        continue
      }

      if (!Object.prototype.hasOwnProperty.call(map[map[index][pid]], 'children')) {
        map[map[index][pid]].children = []
      }

      map[map[index][pid]].children.push(map[index])
      continue
    }

    tree.push(map[index])
  }

  return tree
}

/**
 *
 * @param {*} data对象
 * @description 日期格式化
 * @returns
 */
util.formatDate = (data) => {
  return dayjs(data).format('YYYY-MM-DD HH:mm:ss')
}
/**
 * @params {*} 文件名字符串
 * @description 判断是否为url
 */
util.convertHttp = (url) => {
  const regexp = new RegExp(/^http/)
  if (!url) return `${IMGBASEURL}gysa-default-logo.png`
  if (regexp.test(url)) {
    return url
  } else {
    return `${IMGBASEURL}${url.replace(/\\/g, '/')}`
  }
}
/**
 *
 * @param {*} date1
 * @param {*} date2
 * @description 返回参数1 - 参数2的天数
 */
util.dateDiff = (date_1, date_2) => {
  const timeLine = dayjs(date_1).diff(dayjs(date_2)) / 1000
  const second = parseInt(timeLine % (60 * 60) % 60)
  const minute = parseInt(timeLine % (60 * 60) / 60)
  const hour = parseInt(timeLine / 60 / 60)
  return {
    stamp: timeLine * 1000,
    seconds: timeLine,
    minutes: parseInt(timeLine / 60),
    hours: parseInt(timeLine / 60 / 60),
    days: parseInt(timeLine / 60 / 60 / 24),
    weeks: parseInt(timeLine / 60 / 60 / 24 / 7),
    time: `${hour < 10
      ? `0${hour}`
      : hour}:${minute < 10
        ? `0${minute}`
        : minute}:${second < 10
          ? `0${second}`
          : second}`
  }
}

/**
 * json转字典
 * @param {*} json
 * @returns
 */
util.jsonToDict = (json) => {
  const arr = []
  for (const i in json) {
    arr.push({
      key: i,
      value: json[i]
    })
  }
  return arr
}
export default util
