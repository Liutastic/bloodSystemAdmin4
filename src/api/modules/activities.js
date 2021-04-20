export default ({ request }) => ({

  /**
   * 获取活动列表
   * http://doc.vodeshop.com/web/#/34?page_id=2626
   * @param {*} data
   */
  getActivityList (params) {
    return request({
      url: '/admin/v1/activity/index',
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
      url: '/admin/v1/activity/release-type',
      method: 'get',
      params
    })
  },

  /**
   * 获取活动分类
   * http://doc.vodeshop.com/web/#/34?page_id=2637
   * @param {*} params
   */
  getActivityCategory (params) {
    return request({
      url: '/admin/v1/activity/category',
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
      url: '/admin/v1/activity/store',
      method: 'post',
      data
    })
  }

})
