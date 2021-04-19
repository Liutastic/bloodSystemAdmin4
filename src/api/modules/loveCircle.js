export default ({ request }) => ({
  GetVersion (data) {
    return request({
      url: `/api/personal-center-function?version=${data.version}&type=${data.type}`,
      method: 'get'
    })
  }
})
