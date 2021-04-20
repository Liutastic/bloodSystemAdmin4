import StringUtils from 'd2-crud-plus/src/lib/utils/util.string'

export const crudOptions = (vm) => {
  return {
    columns: [
      {
        title: 'ID',
        key: 'id',
        width: '80',
        form: {
          component: {
            disabled: true
          }
        },
        addForm: {
          component: {
            show: false
          }
        },
        search: {
          key: 'id',
          title: '用户ID',
          placeHolder: '请输入用户ID',
          disabled: false
        }
      },
      {
        title: '活动名称',
        key: 'title',
        form: {
          rules: [
            { required: true, message: '请输入活动名称' }
          ]
        }
      },
      {
        title: '发布平台',
        key: 'release_type',
        type: 'select',
        dict: {
          data: [ // 本地数据字典，若data为null，则通过http请求获取远程数据字典
            { value: 'sz', label: '商城&美肌' },
            { value: 'gz', label: '名媛' },
            { value: 'wh', label: '共享新零售' }
          ]
        },
        form: {
          rules: [
            { required: true, message: '请选择发布平台' }
          ]
        },
        component: {
          name: ''
        }
      },
      {
        title: '活动分类',
        key: 'category_id'
      },
      {
        title: '报名结束',
        key: 'signDate',
        type: 'daterange',
        form: {
          component: {
            span: 18
          }
        },
        formatter (row) {
          return row.sign_end_at
        },
        valueBuilder (row, key) {
          if (!StringUtils.hasEmpty(row.sign_start_at, row.sign_end_at)) {
            row.signDate = [new Date(row.sign_start_at), new Date(row.sign_end_at)]
          }
        },
        valueResolve (row, key) {
          console.log('row:', row)

          if (row.signDate != null && row.signDate.length > 1) {
            row.sign_start_at = row.signDate[0]
            row.sign_end_at = row.signDate[1]
            delete row.signDate
          } else {
            row.daterangeStart = null
            row.daterangeEnd = null
          }
        }
      },
      {
        title: '活动结束',
        key: 'activity_end_at',
        type: 'daterange',
        form: {
          component: {
            span: 18
          }
        },
        valueBuilder (row, key) {
          if (!StringUtils.hasEmpty(row.daterangeStart, row.daterangeEnd)) {
            row.daterange = [new Date(row.daterangeStart), new Date(row.daterangeEnd)]
          }
        },
        valueResolve (row, key) {
          if (row.daterange != null && row.daterange.length > 1) {
            row.daterangeStart = row.daterange[0].getTime()
            row.daterangeEnd = row.daterange[1].getTime()
          } else {
            row.daterangeStart = null
            row.daterangeEnd = null
          }
        }
      },
      {
        title: '启用状态',
        key: 'is_enable',
        type: 'switch',
        dict: {
          data: [
            { value: false, label: '禁用' },
            { value: true, label: '启用' }
          ]
        },
        value: 'value', // 数据字典中value字段的属性名
        label: 'label', // 数据字典中label字段的属性名
        form: {
          rules: [
            { required: true, message: '请选择启用状态' }
          ],

          valueBuilder (row, key) {
            console.log('row.:', row.is_enable)
          },
          valueChange (key, value, form) {
            form[key] = value ? 0 : 1
          }
        },
        component: {
          name: ''
        }

      }

    ],
    formOptions: {
      size: '75%',
      saveButtonType: 'primary',
      updateTableDataAfterEdit: true
      // fullscreen: true // 全屏按钮，传null则隐藏全屏按钮，抽屉模式请隐藏
    }

  }
}
