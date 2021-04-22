import { request } from '@/api/service'

export default {

  /**
   * 获取活动列表
   * http://doc.vodeshop.com/web/#/34?page_id=2626
   * @param {*} data
   */
  getActivityList (params) {
    return request({
      url: '/svc/marketing-svc/admin/v1/activity/index',
      method: 'get',
      params
    })
  },

  /**
   * 获取来源列表
   * http://doc.vodeshop.com/web/#/34?page_id=2636
   * @param {*} data
   */
  getActivityReleaseType (params) {
    return request({
      url: '/svc/marketing-svc/admin/v1/activity/release-type',
      method: 'get',
      params
    })
  },

  /**
   * 创建活动
   * http://doc.vodeshop.com/web/#/34?page_id=2624
   * @param {*} data
   */
  addActivityStore (data) {
    return request({
      url: '/svc/marketing-svc/admin/v1/activity/store',
      method: 'post',
      data
    })
  },

  /**
   * 删除活动
   * http://doc.vodeshop.com/web/#/34?page_id=2638
   * @param {*} data
   */
  deleteActivity (data) {
    return request({
      url: '/svc/marketing-svc/admin/v1/activity/delete',
      method: 'delete',
      data
    })
  },

  /**
   * 编辑活动
   * http://doc.vodeshop.com/web/#/34?page_id=2625
   * @param {*} data
   */
  putActivity (data) {
    return request({
      url: '/svc/marketing-svc/admin/v1/activity/update',
      method: 'put',
      data
    })
  },

  /**
   * 获取权限字典
   * http://doc.vodeshop.com/web/#/34?page_id=2649
   * @param {*} params
   * @returns
   */
  getPermissionsTags (params) {
    return request({
      url: '/svc/marketing-svc/admin/v1/activity/permissions-tags',
      method: 'get',
      params
    })
  }

}
