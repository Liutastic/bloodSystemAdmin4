import StringUtils from 'd2-crud-plus/src/lib/utils/util.string'
import util from '@/libs/util'
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

export const crudOptions = (StatusTag, that) => {
  return {
    options: {
      height: '100%'
    },
    columns: [
      {
        title: 'ID',
        key: 'id',
        sortable: true,
        width: 90,
        align: 'center'
      },
      {
        title: '素材名称',
        key: 'name',
        width: 120,
        showOverflowTooltip: true,
        align: 'center',
        form: {
          disabled: true
        },
        search: {
          width: 233,
          key: 'name'
        },
        formatter (row) {
          return row.name.length > 6 ? row.name.substring(0, 6) + '...' : row.name
        }
      },
      {
        title: '素材分类',
        key: 'category_name',
        sortable: true,
        align: 'center',
        type: 'select',
        search: {
          width: 233,
          key: 'category_id',
          disabled: false,
          component: {
            name: 'dict-select'
          }
        },
        // component: {
        //   props: {
        //     filterable: true,
        //     multiple: false,
        //     clearable: true
        //   }
        // },
        form: {
          component: {
            props: {
              filterable: true,
              multiple: false,
              clearable: true
              // emitPath: false
            }
          }
        },
        dict: {
          url: '/svc/marketing-svc/admin/v1/pink-circle-category/index',
          value: 'id',
          label: 'name',
          children: 'children'
          // isTree: true,
          // transfer: data => {
          //   return util.formatDateToTree(data, 'id')
          // }
        }
      },
      {
        title: '素材子分类',
        key: 'category_child_name',
        align: 'center',
        formatter (row) {
          return row.category_child_name ? row.category_child_name : '无'
        }
      },
      {
        title: '权限模板',
        key: 'competence_name',
        type: 'select',
        align: 'center',
        search: {
          width: 233,
          key: 'competence_id',
          disabled: false,
          component: {
            name: 'dict-select',
            style: {
              // marginRight: '900px'
            }
          }
        },
        dict: {
          url: '/svc/marketing-svc/admin/v1/template/list',
          transfer: (data) => {
            for (const i of data) {
              if (i.key === 'data') {
                // console.log(i.value.filter(item => item.status === 1))
                return i.value.filter(item => item.status === 1)
              }
            }
          },
          value: 'id',
          label: 'title'
        }
      },
      {
        title: '展示商品',
        key: 'goods_name',
        width: 300,
        align: 'center',
        search: {
          width: 233,
          key: 'goods_id'
        },
        formatter (row) {
          return row.goods_name ? row.goods_name : '暂无'
        }
      },
      {
        // 1是图文 2是视频
        title: '素材类型',
        key: 'type',
        type: 'select',
        align: 'center',
        search: {
          width: 233,
          key: 'type',
          disabled: false,
          component: {
            name: 'dict-select'
          }
        },
        dict: {
          data: [
            { value: 1, label: '图文' },
            { value: 2, label: '视频' }
          ]
        }
      },
      {
        title: '创建日期',
        key: 'created_at',
        type: 'datetimerange',
        align: 'center',
        width: 180,
        search: {
          disabled: false,
          width: 350,
          component: {

          }
        },
        form: {
          title: '创建日期',
          component: {
            props: {
              'time-arrow-control': true,
              'default-time': ['00:00:00', '00:00:00'],
              'picker-options': { shortcuts: shortcuts }
            }
          }
        },
        valueBuilder (row, key) {
          if (!StringUtils.hasEmpty(row.start_at, row.end_at)) {
            row.created_at = [
              new Date(row.start_at),
              new Date(row.end_at)
            ]
          }
        },
        valueResolve (row, key) {
          if (row.created_at?.length > 1) {
            row.start_at = util.formatDate(row.created_at[0])
            row.end_at = util.formatDate(row.created_at[1])
          } else {
            row.start_at = null
            row.end_at = null
          }
        }
      },
      {
        // 在.vue引入组件，然后在这里使用on属性配置
        title: '状态',
        key: 'is_enable',
        align: 'center',
        component: {
          name: StatusTag,
          on: {
            input: async (e) => {
              const { code, msg } = await that.$apis.UpdateMaterialStatus({ id: e.props.scope.row.id, is_enable: e.props.scope.row.is_enable === 1 ? 0 : 1 })
              if (code === 0) {
                that.pageRequest(that.query)
              } else {
                this.$message({
                  type: 'error',
                  message: msg
                })
              }
            }
          }
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
      align: 'center',
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
