import * as DIST from './dist'
export const crudOptions = {
  // rowHandle: {
  //   columnHeader: '操作',
  //   width: 100,
  //   custom: [
  //     {
  //       text: ' 自定义',
  //       type: 'warning',
  //       size: 'small',
  //       emit: 'customHandleBtn',
  //       icon: 'el-icon-s-flag'
  //     }
  //   ],
  //   fixed: 'right' // 右边固定列
  // },
  // indexRow: {
  //   headerAlign: 'center',
  //   align: 'center'
  // },
  rowHandle: false,
  searchOptions: {
    // columns: [],
    // defaultSpan: 12,
    // span: 12
  },
  options: {
    height: '100%', // 表格高度100%, 使用toolbar必须设置
    rowKey: 'id',
    stripe: true
  },
  viewOptions: {
    componentType: 'row'
  },
  pageOptions: {
    compact: true // 是否紧凑型页面
  },
  columns: [
    {
      title: 'ID',
      key: 'id',
      width: 90,
      // fixed: 'left',
      align: 'center',
      span: '12',
      search: {
        key: 'id',
        disabled: false,
        props: {
          span: 12
        }
      },
      form: {
        // disabled: true
        component: {
          show: false
        }
      }

    },
    {
      title: '参与人',
      key: 'user_name',
      // sortable: true,
      align: 'center',
      // width: 100,
      search: { key: 'user_name ', disabled: false },
      // fixed: 'left',
      form: {
        component: {
          // props: { }
          // placeholder: '左边固定1'
          // disabled: true
        }
      }
    },
    {
      title: '活动名称',
      key: 'title',
      align: 'center',
      type: 'text',
      search: { key: 'title', disabled: false }
      // sortable: true
      // width: 160
    },
    {
      title: '支付时间',
      key: 'pay_time',
      sortable: true,
      align: 'center',

      search: { key: 'pay_time', disabled: false },
      type: 'text'
      // width: 300
    },
    {
      title: '报名时间',
      key: 'sign_at',
      sortable: true,
      align: 'center',
      width: 300,
      type: 'datetime',
      search: { key: 'sign_at', disabled: false }
      // fixed: 'right'
    },
    {
      title: '活动状态',
      key: 'status',
      sortable: true,
      search: { key: 'status', disabled: false },
      type: 'select',
      align: 'center',
      form: {
        component: { props: { filterable: true, multiple: false, clearable: true } }
      },
      dict: {
        data: DIST.ACTIVITY_STATUS
      }
      // width: 300
    }
  ]

}
