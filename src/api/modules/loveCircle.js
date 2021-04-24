export default ({ request }) => ({
  GetVersion (data) {
    return request({
      url: `/svc/marketing-svc/api/personal-center-function?version=${data.version}&type=${data.type}`,
      method: 'get'
    })
  },
  // 权限模板
  // 获取权限模板列表
  GetPermissionList (data) {
    return request({
      url: `/svc/marketing-svc/admin/v1/template/list?page=${data.page}&per_page=${data.per_page}`,
      method: 'get'
    })
  },
  // 获取某个权限详情
  GetPermissionDetail (data) {
    return request({
      url: `/svc/marketing-svc/admin/v1/template/show-data?id=${data.id}`,
      method: 'get'
    })
  },
  // 新增或者编辑权限
  AddAndEditPermission (data) {
    return request({
      url: '/svc/marketing-svc/admin/v1/template/store',
      method: 'post',
      data
    })
  },
  // 修改权限状态
  EditPermissionStatus (data) {
    return request({
      url: '/svc/marketing-svc/admin/v1/template/status',
      method: 'post',
      data
    })
  },
  // 删除权限模板
  DeletePermission (data) {
    return request({
      url: '/svc/marketing-svc/admin/v1/template/delete',
      method: 'post',
      data
    })
  },
  // 获取分类列表
  GetCategoryList () {
    return request({
      url: '/svc/marketing-svc/admin/v1/pink-circle-category/index',
      method: 'get'

    })
  },
  // 创建分类
  CreateCategory (data) {
    return request({
      url: '/svc/marketing-svc/admin/v1/pink-circle-category/create',
      method: 'post',
      data
    })
  },
  // 编辑分类
  UpdateCategory (data) {
    return request({
      url: '/svc/marketing-svc/admin/v1/pink-circle-category/update',
      method: 'put',
      data
    })
  },
  // 修改分类的状态
  UpdateCategoryStatus (data) {
    return request({
      url: '/svc/marketing-svc/admin/v1/pink-circle-category/enable',
      method: 'put',
      data
    })
  },
  // 删除分类
  DeleteCategory (params) {
    return request({
      url: '/svc/marketing-svc/admin/v1/pink-circle-category/delete',
      method: 'delete',
      params
    })
  },
  // 添加一个发布人
  AddIssuer (data) {
    return request({
      url: '/svc/marketing-svc/admin/v1/pink-circle-user/create',
      method: 'post',
      data
    })
  },
  UpdateIssuer (data) {
    return request({
      url: '/svc/marketing-svc/admin/v1/pink-circle-user/update',
      method: 'put',
      data
    })
  },
  // 查看权限模板列表
  GetAuthTemplateList (params) {
    return request({
      url: '/svc/marketing-svc/admin/v1/template/list',
      method: 'get',
      params
    })
  },
  // 素材列表
  GetMaterialList (params) {
    return request({
      url: '/svc/marketing-svc/admin/v1/material/index',
      method: 'get',
      params
    })
  },
  // 改变素材状态
  UpdateMaterialStatus (data) {
    return request({
      url: '/svc/marketing-svc/admin/v1/material/is-enable',
      method: 'put',
      data
    })
  },
  // 新增视频素材
  AddVideoMaterial (data) {
    return request({
      url: '/svc/marketing-svc/admin/v1/material/video',
      method: 'post',
      data
    })
  },
  // 新增图片素材
  AddImageMaterial (data) {
    return request({
      url: '/svc/marketing-svc/admin/v1/material/image',
      method: 'post',
      data
    })
  },
  // 删除一个素材
  DeleteMaterial (id) {
    return request({
      url: `/svc/marketing-svc/admin/v1/material/delete?id=${id}`,
      method: 'delete'
    })
  },
  // 获取发布人列表(不分页)
  GetAllIssuerList (params) {
    return request({
      url: '/svc/marketing-svc/admin/v1/pink-circle-user/user',
      method: 'get',
      params
    })
  },
  // 获取全部素材分类列表
  GetCategoryAllList () {
    return request({
      url: '/svc/marketing-svc/admin/v1/pink-circle-category/all-category',
      method: 'get'
    })
  },
  // 筛选素材
  filterMaterial (params) {
    return request({
      url: '/svc/marketing-svc/admin/v1/material/search',
      method: 'get',
      params
    })
  },
  // 获取商品列表
  GetProList (data) {
    return request({
      url: `/svc/marketing-svc/admin/v1/goods/search?keyword=${data.keyWord}&category_id=${data.category_id}&page=${data.page}`,
      method: 'get'
    })
  },
  // 获取商品分类列表
  GetProCategoryList (params) {
    return request({
      url: `/svc/marketing-svc/admin/v1/goods/category?category_id=${params.category_id}`,
      method: 'get'
    })
  },
  // 获取发布人列表（分页）
  GetIssuerList (params) {
    return request({
      url: '/svc/marketing-svc/admin/v1/pink-circle-user/index',
      method: 'get',
      params
    })
  },
  // 修改发布人状态
  UpdateIssuerStatus (data) {
    return request({
      url: '/svc/marketing-svc/admin/v1/pink-circle-user/enable',
      method: 'put',
      data
    })
  },
  // 删除一个发布人
  DeleteIssuer (params) {
    return request({
      url: `/svc/marketing-svc/admin/v1/pink-circle-user/delete?id=${params}`,
      method: 'delete'
    })
  },
  // 运营状态数据获取
  GetRunStatusData (params) {
    return request({
      url: '/svc/marketing-svc/admin/v1/state-diagram/index',
      method: 'get',
      params
    })
  },
  // 获取素材详情
  GetMaterialDetail (data) {
    return request({
      url: `/svc/marketing-svc/admin/v1/material/show?id=${data.id}`,
      method: 'get'
    })
  },
  // 编辑素材
  EditMaterial (data, id) {
    return request({
      url: `/svc/marketing-svc/admin/v1/material/update?id=${id}`,
      method: 'put',
      data
    })
  },
  // 获取商品详情
  GetProDetail (id) {
    return request({
      url: `/svc/marketing-svc/admin/v1/goods/show?goods_id=${id}`,
      method: 'get'
    })
  },
  // 运营状态获取素材分类列表
  GetRunCategoryList (data) {
    return request({
      url: '/svc/marketing-svc/admin/v1/pink-circle-category/category',
      method: 'get'
    })
  }
})
