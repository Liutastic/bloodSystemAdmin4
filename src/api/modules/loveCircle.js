export default ({ request }) => ({
  GetVersion (data) {
    return request({
      url: `/api/personal-center-function?version=${data.version}&type=${data.type}`,
      method: 'get'
    })
  },
  // 权限模板
  // 获取权限模板列表
  GetPermissionList (data) {
    return request({
      url: '/admin/v1/template/list',
      method: 'get'
    })
  },
  // 获取某个权限详情
  GetPermissionDetail (data) {
    return request({
      url: `/admin/v1/template/show-data?id=${data.id}`,
      method: 'get'
    })
  },
  // 新增或者编辑权限
  AddAndEditPermission (data) {
    return request({
      url: '/admin/v1/template/store',
      method: 'post',
      data
    })
  },
  // 修改权限状态
  EditPermissionStatus (data) {
    return request({
      url: '/admin/v1/template/status',
      method: 'post',
      data
    })
  },
  // 删除权限模板
  DeletePermission (data) {
    return request({
      url: '/admin/v1/template/delete',
      method: 'post',
      data
    })
  },
  // 获取分类列表
  GetCategoryList (params) {
    return request({
      url: '/admin/v1/pink-circle-category/index',
      method: 'get',
      params
    })
  },
  // 创建分类
  CreateCategory (data) {
    return request({
      url: '/admin/v1/pink-circle-category/create',
      method: 'post',
      data
    })
  },
  // 编辑分类
  UpdateCategory (data) {
    return request({
      url: '/admin/v1/pink-circle-category/update',
      method: 'put',
      data
    })
  },
  // 修改分类的状态
  UpdateCategoryStatus (data) {
    return request({
      url: '/admin/v1/pink-circle-category/enable',
      method: 'put',
      data
    })
  },
  // 删除一个分类
  DeleteCategory (params) {
    return request({
      url: '/admin/v1/pink-circle-category/delete',
      method: 'delete',
      params
    })
  },
  // 添加一个发布人
  AddIssuer (data) {
    return request({
      url: '/admin/v1/pink-circle-user/create',
      method: 'post',
      data
    })
  },
  // 查看权限模板列表
  GetAuthTemplateList (params) {
    return request({
      url: '/admin/v1/template/list',
      method: 'get',
      params
    })
  },
  // 新增图片素材
  AddImageMaterial (params) {
    return request({
      url: '/admin/v1/material/image',
      method: 'post',
      params
    })
  },
  // 获取发布人列表(不分页)
  GetAllIssuerList (params) {
    return request({
      url: '/admin/v1/pink-circle-user/user',
      method: 'get',
      params
    })
  },
  // 获取发布人列表（分页）
  GetIssuerList (params) {
    return request({
      url: '/admin/v1/pink-circle-user/index',
      method: 'get',
      params
    })
  },
  // 修改发布人状态
  UpdateIssuerStatus (data) {
    return request({
      url: '/admin/v1/pink-circle-user/enable',
      method: 'put',
      data
    })
  },
  // 删除一个发布人
  DeleteIssuer (params) {
    return request({
      url: '/admin/v1/pink-circle-user/delete',
      method: 'delete',
      params
    })
  }
})
