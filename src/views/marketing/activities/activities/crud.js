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
        }
      },
      {
        title: '报名日期',
        key: 'daterange',
        type: 'daterange',
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

      }

    ],

    format: {
      response (ret) {
        return ret.data // getlist返回结果获取
      }

    }
  }
}
