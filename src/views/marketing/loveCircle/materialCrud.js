import StringUtils from 'd2-crud-plus/src/lib/utils/util.string'

function toNooning (date) {
  if (date == null) {
    date = new Date()
  }
  date.setHours(12)
  date.setMinutes(0)
  date.setSeconds(0)
  return date
}
function addDays (date, days) {
  date.setTime(date.getTime() + 3600 * 1000 * 24 * days)
}

const shortcuts = [
  {
    text: '今天一晚',
    onClick (picker) {
      const start = new Date()
      const end = toNooning()
      addDays(end, 1)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '今天两晚',
    onClick (picker) {
      const start = new Date()
      const end = toNooning()
      addDays(end, 2)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '今天三晚',
    onClick (picker) {
      const start = new Date()
      const end = toNooning()
      addDays(end, 3)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '今天四晚',
    onClick (picker) {
      const start = new Date()
      const end = toNooning()
      addDays(end, 4)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '明天一晚',
    onClick (picker) {
      const start = toNooning()
      const end = toNooning()
      addDays(start, 1)
      addDays(end, 2)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '明天两晚',
    onClick (picker) {
      const start = new Date()
      const end = new Date()
      addDays(start, 1)
      addDays(end, 3)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '明天三晚',
    onClick (picker) {
      const start = new Date()
      const end = new Date()
      addDays(start, 1)
      addDays(end, 3)
      picker.$emit('pick', [start, end])
    }
  }
]

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
        search: {
          key: 'competence_id',
          disabled: false,
          component: {
            name: 'dict-select'
          }
        },
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
        key: 'created_at',
        type: 'datetimerange',
        width: 300,
        search: {
          disabled: false,
          width: 350
        },
        form: {
          component: {
            props: {
              'time-arrow-control': true,
              'default-time': ['12:00:00', '12:00:00'],
              'picker-options': { shortcuts: shortcuts }
            }
          }
        },
        valueBuilder (row, key) {
          if (!StringUtils.hasEmpty(row.datetimerangeStart, row.datetimerangeEnd)) {
            row.datetimerange = [new Date(row.datetimerangeStart), new Date(row.datetimerangeEnd)]
          }
        },
        valueResolve (row, key) {
          if (row.datetimerange != null && !StringUtils.hasEmpty(row.datetimerange)) {
            row.datetimerangeStart = row.datetimerange[0].getTime()
            row.datetimerangeEnd = row.datetimerange[1].getTime()
          } else {
            row.datetimerangeStart = null
            row.datetimerangeEnd = null
          }
        }
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
