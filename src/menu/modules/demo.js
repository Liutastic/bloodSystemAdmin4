export default {
  path: '/demo',
  title: 'demo',
  icon: 'plug',
  children: [
    {
      title: '页面',
      icon: 'folder-o',
      children: [
        { path: '/demo/page1', title: '页面 1' },
        { path: '/demo/page3', title: '页面 3' }
      ]
    },
    {
      title: '页面2',
      icon: 'folder-o',
      children: [
        { path: '/demo/page2', title: '页面 2' }
      ]
    }
  ]
}
