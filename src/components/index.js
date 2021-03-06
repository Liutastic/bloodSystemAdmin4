import Vue from 'vue'

import D2CrudX from 'd2-crud-x'
import d2Container from './d2-container'
import { d2CrudPlus } from 'd2-crud-plus'
import util from '@/libs/util'

import {
  request
} from '@/api/service'

import { BASEURL } from '@/api/config'

// 引入echarts
import * as echarts from 'echarts'

import {
  D2pAreaSelector,
  D2pFileUploader,
  D2pIconSelector,
  // D2pTreeSelector,
  D2pFullEditor,
  D2pUploader,
  D2pDemoExtend
} from 'd2p-extends' // 源码方式引入，上传组件支持懒加载
import pluginExport from '@d2-projects/vue-table-export'
import d2pUploaderConfig from './d2p-uploader'
import d2pFileUploaderConfig from './d2p-fileUploader'
// import D2CrudX from 'd2-crud-x'

// 注意 有些组件使用异步加载会有影响
Vue.component('d2-container', d2Container)
Vue.component('d2-icon', () => import('./d2-icon'))
Vue.component('d2-icon-svg', () => import('./d2-icon-svg/index.vue'))

Vue.use(D2CrudX, {
  name: 'd2-crud-x'
})

Vue.use(pluginExport)
Vue.use(D2pAreaSelector)
Vue.use(D2pFileUploader, d2pFileUploaderConfig)
Vue.use(D2pUploader, d2pUploaderConfig)

Vue.use(D2pFullEditor, {
  ueditor: {
    serverUrl: `${BASEURL}/ueditor/server`
  }
})
Vue.use(D2pIconSelector)

Vue.prototype.$echarts = echarts

Vue.use(D2pDemoExtend)
// #region 引入d2CrudPlus
Vue.use(d2CrudPlus, {
  starTip: false,
  async getRemoteDictFunc (url, dict) {
    // 此处配置你的字典http请求方法
    // 实际使用请改成request
    const ret = await request({
      url: url,
      data: dict.body,
      method: 'get'
    })

    let { data } = ret
    // 如果是json，转数组
    if (Object.prototype.toString.call(data).toLowerCase() === '[object object]') {
      data = util.jsonToDict(data)
    }

    return data
  },
  commonOption () {
    // 公共配置
    return {
      format: {
        page: { // page接口返回的数据结构配置
          request: { // 请求参数
            current: 'page', // 当前页码
            size: 'per_page' // 当前每页条数
          },
          response: { // 返回结果
            current: 'current_page', // 当前页码 ret.data.current
            size: 'per_page', // 每页条数，ret.data.size,
            // size: (data) => { return data.size }, //你也可以配置一个方法，自定义返回
            total: 'total', // 总记录数 ret.data.total
            records: 'data' // 列表数组 ret.data.records
          }
        }
      },
      pageOptions: {
        compact: true,
        export: {
          local: true, // 本地导出,false为服务端导出
          title: '导出数据', // 文件名
          type: 'excel' // 导出类型，excel 或 cvs
          // formatter(row,context){}
        }
      },
      options: {
        size: 'small'
      },
      formOptions: {
        maxHeight: true,
        saveRemind: true, // 有修改时，是否提醒保存
        closeOnClickModal: true, // 点击对话框背景关闭对话框,实际使用过程中容易误触把对话框关闭，导致输入内容丢失，建议设置为false
        nullToBlankStr: true, // 提交修改表单时，将undefined的数据修改为空字符串''，可以解决无法清空字段的问题
        defaultSpan: 12 // 默认的表单 span
      },
      viewOptions: {
        disabled: false,
        componentType: 'form' // 【form,row】 表单组件 或 行组件展示
      },
      rowHandle: {
        width: 260,
        edit: {
          type: 'primary'
        }
      }
    }
  }
})
// #endregion

//  自定义字段类型示例
d2CrudPlus.util.columnResolve.addTypes({
  time2: {
    form: {
      component: {
        name: 'el-date-picker',
        props: {
          type: 'datetime'
        }
      }
    }, // 编辑时支持日期时间
    search: {
      component: {
        props: {
          type: 'date'
        }
      }
    }, // 搜索时只支持日期
    formatter (row, column, value, index) {
      return value + '-->我是自定义字段类型：time2'
    },
    _handle (column) {
      //  此方法主要将column中某些依赖的用户配置的属性放到默认配置中，比如数据字典的配置
      if (column.dict != null) {
        this.form.component.props.dict = column.dict
        this.component.props.dict = column.dict
      }
    }
  }
})

// 修改官方字段类型
const selectType = d2CrudPlus.util.columnResolve.getType('select')
selectType.component.props.color = 'auto' // 修改官方的字段类型，设置select的单元格组件支持自动染色
