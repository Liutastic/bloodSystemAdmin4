export default {
  path: '/marketing',
  title: '全局营销工具',
  icon: 'plug',
  children: [
    {
      title: '爱粉圈',
      icon: 'home',
      children: [
        {
          title: '运营状态',
          icon: 'bar-chart',
          path: '/marketing/loveCircle/operation'
        },
        {
          title: '权限设置',
          icon: 'vcard',
          children: [
            {
              title: '权限模板',
              icon: 'hand-stop-o',
              path: '/marketing/loveCircle/permission/template'
            },
            {
              title: '新增权限模板',
              icon: 'edit',
              path: '/marketing/loveCircle/permission/addTemplate'
            }
          ]
        },
        {
          title: '分类设置',
          icon: 'align-justify',
          children: [
            {
              title: '所有分类',
              icon: 'minus',
              path: '/marketing/loveCircle/category/allCategory'
            }
            // {
            //   title: '新增/编辑分类',
            //   icon: 'edit',
            //   path: '/marketing/loveCircle/category/addCategory'
            // }
          ]
        },
        {
          title: '所有素材',
          icon: 'file-o',
          path: '/marketing/loveCircle/allMaterial'
        },
        {
          title: '上传素材',
          icon: 'paste',
          children: [
            // {
            //   title: '发布人身份设置',
            //   icon: 'user',
            //   path: '/marketing/loveCircle/material/issuerSetting'
            // },
            {
              title: '发布人身份设置',
              icon: 'user',
              path: '/marketing/loveCircle/material/issuerSetting'
            },
            {
              title: '图文素材',
              icon: 'file-photo-o',
              path: '/marketing/loveCircle/material/imageMaterial'
            },
            {
              title: '视频素材',
              icon: 'file-video-o',
              path: '/marketing/loveCircle/material/videoMaterial'
            }
          ]
        }
      ]
    }
    // {
    //   title: '报名活动',
    //   icon: 'home',
    //   children: [
    //     {
    //       title: '所有活动',
    //       icon: 'home',
    //       path: '/marketing/activities/activities'
    //     },
    //     {
    //       title: '参与人记录',
    //       icon: 'home',
    //       path: '/marketing/activities/participant'
    //     }
    //   ]
    // }
  ]
}
