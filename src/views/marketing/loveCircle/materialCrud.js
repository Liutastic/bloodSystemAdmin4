export const crudOptions = function (vm) {
  return {
    columns: [
      {
        title: 'ID',
        key: 'id',
        sortable: true,
        width: 90
      },
      {
        title: '素材名称',
        key: 'name',
        width: 120,
        form: {
          disabled: true
        },
        search: {
          key: 'name'
        }
      },
      {
        title: '素材分类',
        key: 'category_name',
        sortable: true,
        search: {
          key: 'category_name'
        }
      },
      {
        title: '权限模板',
        key: 'competence_name',
        search: {
          key: 'category_name',
          component: {
            name: 'dict-select'
          }
        }
      },
      {
        title: '展示商品',
        key: 'goods_name',
        search: {
          key: 'goods_name'
        }
      },
      {
        title: '素材类型',
        key: 'type'
      },
      {
        title: '创建日期',
        key: 'created_at'
      },
      {
        title: '状态',
        key: 'is_enable'
      }
    ],
    format: {
      format: {
        page: { // page接口返回的数据结构配置
          request: {
            current: 'page',
            size: 'per_page'
          },
          response: {
            current: 'current_page', // 当前页码 ret.data.current
            size: 'per_page', // 每页条数，ret.data.size, 你也可以配置一个方法，自定义返回
            total: 'total', // 总记录数 ret.data.total
            records: 'data' // 列表数组 ret.data.records
          }
        }
      }
    }
  }
}
