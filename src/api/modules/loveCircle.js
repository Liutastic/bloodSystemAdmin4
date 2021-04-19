export default ({ request }) => ({
  GetVersion (data) {
    return request({
      url: `/api/personal-center-function?version=${data.version}&type=${data.type}`,
      method: 'get'
    })
  },
  // 获取分类列表
  GetCategoryList (params) {
    return request({
      url: `/admin/v1/pink-circle-category/index`,
      method: 'get',
      params
    })
  },
  // 创建分类
  CreateCategory (data) {
    return request({
      url: `/admin/v1/pink-circle-category/create`,
      method: 'post',
      data
    })
  },
  // 编辑分类
  UpdateCategory (data) {
    return request({
      url: `/admin/v1/pink-circle-category/update`,
      method: 'put',
      data
    })
  },
  // 修改分类的状态
  UpdateCategoryStatus (data) {
    return request({
      url: `/admin/v1/pink-circle-category/enable`,
      method: 'put',
      data
    })
  },
  // 删除一个分类
  DeleteCategory (params) {
    return request({
      url: `/admin/v1/pink-circle-category/delete`,
      method: 'delete',
      params
    })
  },
  // 查看权限模板列表
  GetAuthTemplateList (params) {
    return request({
      url: `/admin/v1/template/list`,
      method: 'get',
      params
    })
  }
})
