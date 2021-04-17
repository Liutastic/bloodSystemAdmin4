// Vue
import Vue from 'vue'
import i18n from './i18n'
import App from './App'
// 核心插件
import d2Admin from '@/plugin/d2admin'
// store
import store from '@/store/index'
import {
  // request,
  requestForMock
} from '@/api/service'
import $apis from '@/api/'

// 菜单和路由设置
import router from './router'
import { menuHeader, menuAside } from '@/menu'
import { frameInRoutes } from '@/router/routes'

// import '@/api/mock' // mock数据，实际开发要去掉

import { d2CrudPlus } from 'd2-crud-plus'

// 引入echarts
import * as echarts from 'echarts'

Vue.prototype.$echarts = echarts
Vue.prototype.$apis = $apis

// #region 引入d2CrudPlus
Vue.use(d2CrudPlus, {
  starTip: false,
  getRemoteDictFunc (url, dict) {
    // 此处配置你的字典http请求方法
    // 实际使用请改成request
    return requestForMock({
      url: url,
      data: dict.body,
      method: 'get'
    }).then(ret => {
      return ret.data
    })
  },
  commonOption () {
    // 公共配置
    return {
      format: {
        page: {
          // page接口返回的数据结构配置，
          request: {
            current: 'current',
            size: 'size'
          },
          response: {
            current: 'current', // 当前页码 ret.data.current
            size: 'size', // 当前页码 ret.data.current
            // size: (data) => { return data.size }, // 每页条数，ret.data.size, 你也可以配置一个方法，自定义返回
            total: 'total', // 总记录数 ret.data.total
            records: 'records' // 列表数组 ret.data.records
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

// 核心插件
Vue.use(d2Admin)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  created () {
    // 处理路由 得到每一级的路由设置
    this.$store.commit('d2admin/page/init', frameInRoutes)
    // 设置顶栏菜单
    this.$store.commit('d2admin/menu/headerSet', menuHeader)
    // // 设置侧边栏菜单
    // this.$store.commit('d2admin/menu/asideSet', menuAside)
    // 初始化菜单搜索功能
    this.$store.commit('d2admin/search/init', menuHeader)
  },
  mounted () {
    // 展示系统信息
    this.$store.commit('d2admin/releases/versionShow')
    // 用户登录后从数据库加载一系列的设置
    this.$store.dispatch('d2admin/account/load')
    // 获取并记录用户 UA
    this.$store.commit('d2admin/ua/get')
    // 初始化全屏监听
    this.$store.dispatch('d2admin/fullscreen/listen')
  },
  watch: {
    // 检测路由变化切换侧边栏内容
    '$route.matched': {
      handler (matched) {
        if (matched.length > 0) {
          const _side = menuAside.filter(menu => menu.path === matched[0].path)
          this.$store.commit('d2admin/menu/asideSet', _side.length > 0 ? _side[0].children : [])
        }
      },
      immediate: true
    }
  }
}).$mount('#app')
