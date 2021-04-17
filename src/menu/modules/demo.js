export default {
  path: '/demo',
  title: 'demo',
  icon: 'plug',
  children: [
    {
      title: 'd2-crud-plus',
      icon: 'folder-o',
      children: [
        { path: '/demo/page1', title: 'd2-crud-plus 实例' },
        { path: '/demo/page3', title: 'DEMO 页面' }
      ]
    },
    {
      title: '接口',
      icon: 'folder-o',
      children: [
        { path: '/demo/page2', title: '接口请求实例' }
      ]
    }
  ]
}
