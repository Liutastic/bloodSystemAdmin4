import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/shopping',
  name: 'shopping',
  meta,
  redirect: { name: 'shopping' },
  component: layoutHeaderAside,
  children: [
    {
      path: 'loveCircle/operation',
      name: 'operation',
      meta: {
        title: '运营状态',
        auth: true
      },
      component: _import('shopping/loveCircle/operation')
    },
    {
      path: 'loveCircle/permission/template',
      name: 'template',
      meta: {
        title: '权限模板',
        auth: true
      },
      component: _import('shopping/loveCircle/permission/template')
    },
    {
      path: 'loveCircle/permission/addTemplate',
      name: 'addtemplate',
      meta: {
        title: '新增权限模板',
        auth: true
      },
      component: _import('shopping/loveCircle/permission/addTemplate')
    },
    {
      path: 'loveCircle/category/allCategory',
      name: 'addtemplate',
      meta: {
        title: '所有分类',
        auth: true
      },
      component: _import('shopping/loveCircle/category/allCategory')
    },
    {
      path: 'loveCircle/category/addCategory',
      name: 'addCategory',
      meta: {
        title: '新增/编辑分类',
        auth: true
      },
      component: _import('shopping/loveCircle/category/addCategory')
    },
    {
      path: 'loveCircle/allMaterial',
      name: 'allMaterial',
      meta: {
        title: '所有素材',
        auth: true
      },
      component: _import('shopping/loveCircle/allMaterial')
    },
    {
      path: 'loveCircle/material/issuerSetting',
      name: 'issuerSetting',
      meta: {
        title: '发布人身份设置',
        auth: true
      },
      component: _import('shopping/loveCircle/material/issuerSetting')
    },
    {
      path: 'loveCircle/material/imageMaterial',
      name: 'imageMaterial',
      meta: {
        title: '图文素材',
        auth: true
      },
      component: _import('shopping/loveCircle/material/imageMaterial')
    },
    {
      path: 'loveCircle/material/videoMaterial',
      name: 'videoMaterial',
      meta: {
        title: '视频素材',
        auth: true
      },
      component: _import('shopping/loveCircle/material/videoMaterial')
    }
  ]
}
