import cookies from './util.cookies'
import db from './util.db'
import log from './util.log'

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
export default util
