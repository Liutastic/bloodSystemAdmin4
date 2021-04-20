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
  }
})
