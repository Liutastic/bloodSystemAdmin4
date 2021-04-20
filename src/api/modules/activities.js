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
  }
})
