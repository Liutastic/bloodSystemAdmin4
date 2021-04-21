import StringUtils from 'd2-crud-plus/src/lib/utils/util.string'
import { BASEURL } from '@/api/config'
import { DICT_STATUS, DICT_STATIS_TYPE, DICT_IS_TOLL } from './dict.js'

export const crudOptions = (vm) => {
  return {
    columns: [
      {
        title: 'ID',
        key: 'id',
        width: '80',

        search: {
          key: 'id',
          title: '用户ID',
          placeHolder: '请输入用户ID',
          component: {
            disabled: false
          }
        },
        form: {
          component: {
            show: true,
            disabled: true
          }
        },
        addForm: {
          component: {
            show: false,
            disabled: true
          }
        }
      },
      {
        title: '活动名称',
        key: 'title',
        search: {
          key: 'title',
          title: '活动名称',
          placeHolder: '请输入活动名称'
        },
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
        value: 0,
        dict: {
          url: `${BASEURL}/admin/v1/activity/release-type`,
          cache: true
        },
        form: {
          rules: [
            { required: true, message: '请选择发布平台' }
          ],
          valueChange (key, value, form) {
            form.category_id = ''
            console.log(vm.getEditForm())
          }
        },
        component: {
          name: ''
        }
      },
      {
        title: '活动分类',
        key: 'category_id',
        type: 'select',
        dict: {
          url: `${BASEURL}/admin/v1/activity/category`,
          cache: true
        }
      },
      {
        title: '统计类型',
        key: 'statistics_type',
        type: 'select',
        dict: { data: DICT_STATIS_TYPE },
        form: {}
      },
      {
        title: '是否收费',
        key: 'is_toll',
        type: 'select',
        dict: {
          data: DICT_IS_TOLL
        }
      },
      {
        title: '报名结束',
        key: 'signDate',
        type: 'datetimerange',
        form: {
          title: '报名时间',
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
          title: '活动时间',
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
        type: 'select',
        dict: {
          data: DICT_STATUS
        },
        search: {
          key: 'is_enable',
          title: '启用状态'
        },
        form: {
          rules: [
            { required: true, message: '请选择启用状态' }
          ],
          value: 1,
          valueResolve (row, key) {
            row[key] = row[key] ? 1 : 0
          }
        }
        // component: {
        //   valueBinding: 'is_enable',
        //   on: {
        //     click (form) {
        //       console.log('vm:', form.scope.row)
        //       // console.log('api:', api)

        //       // console.log('vm:', vm.$refs)

        //       // vm.doRefresh()
        //     }
        //   }
        // }

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
