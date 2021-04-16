import Vue from 'vue'

import D2CrudX from 'd2-crud-x'
import d2Container from './d2-container'

import {
  D2pAreaSelector,
  // D2pFileUploader,
  D2pIconSelector,
  // D2pTreeSelector,
  D2pFullEditor
//   D2pUploader
  // D2pDemoExtend
} from 'd2p-extends' // 源码方式引入，上传组件支持懒加载
import pluginExport from '@d2-projects/vue-table-export'
// import d2pUploaderConfig from './d2p-uploader'
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
// Vue.use(D2pFileUploader)
Vue.use(D2pFullEditor, {
  // ueditor: {
  //   serverUrl: '/api/ueditor/'
  // }
})
Vue.use(D2pIconSelector)

// Vue.use(D2pDemoExtend)
// Vue.use(D2pUploader, d2pUploaderConfig)
