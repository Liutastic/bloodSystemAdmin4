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
        showOverflowTooltip: true,
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
        type: 'select',
        search: { key: 'competence_id', disabled: false },
        dict: {
          url: '/svc/marketing-svc/admin/v1/template/list',
          value: 'id',
          label: 'title'
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
        // 1是图文 2是视频
        title: '素材类型',
        key: 'type'
        // formatter: (row, column, cellValue, index) => {
        //   console.log(row, column, cellValue, index)
        //   if (cellValue === 1) {
        //     cellValue = '图文'
        //   } else if (cellValue === 2) {
        //     cellValue = '视频'
        //   }
        // }
      },
      {
        title: '创建日期',
        key: 'created_at'
      },
      {
        // 在.vue引入组件，然后在这里使用on属性配置
        title: '状态',
        key: 'is_enable',
        component: {
          name: 'el-tag'
        }
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
    },
    rowHandle: {
      view: false,
      edit: false,
      custom: [
        {
          thin: false,
          text: '编辑',
          type: 'primary',
          icon: 'el-icon-edit',
          size: 'small',
          show: true,
          disabled: false,
          order: 1,
          emit: 'edit'
        }
      ]
    }
  }
}
