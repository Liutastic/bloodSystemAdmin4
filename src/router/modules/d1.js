import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/d',
  name: 'd1',
  meta,
  redirect: { name: 'd1' },
  component: layoutHeaderAside,
  children: [
    {
      path: 'd1',
      name: 'd1',
      meta: {
        title: '页面 dd',
        auth: true
      },
      component: _import('d1')
    }
  ]
}
