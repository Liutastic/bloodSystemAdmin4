export const crudOptions = {
  options: {
    height: '100%' // 表格高度100%, 使用toolbar必须设置
  },
  columns: [
    {
      title: 'ID',
      key: 'id',
      width: 100,
      align: 'center',
      form: {
        disabled: true
      }
    },
    {
      title: '名称',
      key: 'name',
      search: {
        disabled: false // 启用搜索
      }
    },
    {
      title: '地区',
      key: 'province',
      sortable: true,
      search: { key: 'province', disabled: false },
      type: 'select',
      form: {
        component: {
          props: { filterable: true, multiple: true, clearable: true }
        }
      },
      dict: {
        data: [
          { value: 'sz', label: '深圳' },
          { value: 'gz', label: '广州' },
          { value: 'wh', label: '武汉' },
          { value: 'sh', label: '上海' }
        ]
      }
    },
    {
      title: '图标选择',
      key: 'iconSelect',
      sortable: true,
      type: 'icon-selector',
      form: {
        rules: [{ required: true, message: '请选择图标' }]
      }
    },
    {
      title: '用户可输入',
      key: 'iconSelect2',
      sortable: true,
      type: 'icon-selector',
      form: {
        component: {
          props: {
            'user-input': true
          }
        }
      }
    }
  ]
}
