export const crudOptions = (vm) => {
  return {
    columns: [
      {
        title: 'ID',
        key: 'id',
        width: '80',
        disabled: true
      },
      {
        title: '分类名称',
        key: 'name',
        width: '100'
      },
      {
        title: '排序ID',
        key: 'sort',
        width: '80'
      },
      {
        title: '子类',
        key: 'children'
      },
      {
        title: '权限模板',
        // 此处是权限模板id
        key: 'pink_circle_competence_id',
        width: '150'
      },
      {
        title: '状态',
        key: 'is_enable',
        width: '120',
        sortable: true,
        search: { key: 'is_enable', disabled: false },
        type: 'select',
        dict: {
          data: [
            { value: 0, label: '禁用' },
            { value: 1, label: '启用' }
          ]
        }
      },
      {
        title: '操作'
      }
    ],
    format: {
      response (ret) {
        return ret.data // getlist返回结果获取
      },
      page: { // page接口返回的数据结构配置，
        request: { // 请求参数
          current: 'page', // 当前页码
          size: 'per_page' // 当前每页条数
          // size(page,size){page[xxx]=size}//你还可以配置为一个方法，自定义操作请求参数
        },
        response: { // 返回结果
          current: 'current_page', // 当前页码 ret.data.current
          size: 'per_page', // 每页条数，ret.data.size,
          // size: (data) => { return data.size }, //你也可以配置一个方法，自定义返回
          total: 'total', // 总记录数 ret.data.total
          records: 'data' // 列表数组 ret.data.records
        }
      }
    }
  }
}
