import StringUtils from 'd2-crud-plus/src/lib/utils/util.string'
import { BASEURL } from '@/api/config'
import { DICT_STATUS, DICT_STATIS_TYPE, DICT_YES_NO, aa } from './dict.js'
import API from './api'
export const crudOptions = vm => {
  return {
    options: {
      height: '100%', // 表格高度100%, 使用toolbar必须设置
      rowKey: 'id',
      stripe: true
    },
    formOptions: {
      // 编辑对话框及el-form的配置
      type: 'drawer', // 默认对话框模式，drawer 抽屉模式
      size: '60%', // 抽屉模式的宽度
      fullscreen: true, // 全屏按钮，传null则隐藏全屏按钮，抽屉模式请隐藏
      draggable: true, // 是否支持表单对话框拖拽，抽屉模式请关闭
      saveRemind: true, // 有修改时是否需要保存提醒，也可以传入一个方法，自定义确认对话框，()=> return vm.$confirm({})
      labelWidth: '100px',
      labelPosition: 'left',
      saveLoading: false,
      gutter: 20,
      saveButtonType: 'primary',
      maxHeight: true, // 对话框内部显示滚动条
      defaultSpan: 24, // 默认表单字段所占宽度
      updateTableDataAfterEdit: true // 添加和删除提交后，是否直接更新本地table的数据，默认会自动刷新表格，所以不需要更新本地数据
    },
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
          rules: [{ required: true, message: '请输入活动名称' }]
        }
      },
      {
        title: '发布平台',
        key: 'release_type',
        type: 'radio',
        dict: {
          url: `${BASEURL}/admin/v1/activity/release-type`,

          cache: true,
          value: 'id', // 数据字典中value字段的属性名
          label: 'name', // 数据字典中label字段的属性名
          children: 'child' // 数据字典中children字段的属性名
        },
        form: {
          rules: [{ required: true, message: '请选择发布平台' }],
          // 同步字典
          async valueChange (
            key,
            value,
            form,
            { getColumn, mode, component, immediate, getComponent }
          ) {
            const dictChild =
              component.dict.data.filter(item => item.id === value)[0].child ??
              []
            form.category_id = undefined // 将“city”的值置空
            console.log('dictChild:', value, dictChild)
            await getComponent('category_id').reloadDict() // 执行city的select组件的reloadDict()方法，触发“city”重新加载字典
            getComponent('category_id').setDictData(dictChild)
          }
          // valueChangeImmediate: true
        }
      },
      {
        title: '活动分类',
        key: 'category_id',
        type: 'select',
        disabled: true,
        dict: {
          // data: ,

          // url: `${BASEURL}/admin/v1/activity/release-type`,
          value: 'id', // 数据字典中value字段的属性名
          label: 'name', // 数据字典中label字段的属性名
          children: 'child', // children的属性名
          //  覆盖全局getRemoteDictData方法,返回 Promise<[dictData]>
          getData: async (url, dict, { form, component }) => {
            const { data } = await API.getActivityReleaseType()
            const distData = []
            data.filter(item => {
              console.log('item: ', item)
              if (item.id === form.release_type) return distData.push(...item.child)
            })
            return distData
          }

        },
        form: {
          component: {
            show (cmp) {
              return cmp.form.release_type
            }
          },
          rules: [{ required: true, message: '请选择活动分类' }]
        }

        // valueBuilder (row, col) {
        //   row.category_name = row.category_name
        // }
      },
      {
        title: '活动分类',
        key: 'category_name',
        type: 'select',

        form: {
          component: {
            show: false
          },
          rules: [{ required: true, message: '请选择活动分类' }]
        }

        // valueBuilder (row, col) {
        //   row.category_name = row.category_name
        // }
      },
      {
        title: '统计类型',
        key: 'statistics_type',
        type: 'radio',
        dict: { data: DICT_STATIS_TYPE },
        form: {
          value: 1,
          component: {
            show: true
          },
          rules: [{ required: true, message: '请选择活动分类' }]
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
        }
      },
      {
        title: '活动结束',
        key: 'activityDate',
        type: 'datetimerange',
        form: {
          title: '活动时间'
        },
        formatter (row) {
          return row.activity_end_at
        },
        valueBuilder (row, key) {
          if (!StringUtils.hasEmpty(row.daterangeStart, row.daterangeEnd)) {
            row.daterange = [
              new Date(row.daterangeStart),
              new Date(row.daterangeEnd)
            ]
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
          rules: [{ required: true, message: '请选择启用状态' }],
          value: 1,
          valueResolve (row, key) {
            row[key] = row[key] ? 1 : 0
          },
          component: {
            name: 'dict-switch'
          }
        }
      },
      {
        title: '是否收费',
        key: 'is_toll',
        type: 'select',
        dict: {
          data: DICT_YES_NO
        },
        form: {
          value: 1,
          rules: [{ required: true, message: '请选择活动分类' }],
          component: {
            name: 'dict-switch',
            dict: {
              data: DICT_YES_NO
            }
          },
          valueChange (
            key,
            value,
            form,
            { getColumn, mode, component, immediate, getComponent }
          ) {
            getComponent('toll_amount') && getComponent('toll_amount').clear()
          }
        }
      },
      {
        title: '收费金额',
        key: 'toll_amount',
        show: false,
        form: {
          component: {
            show (cmp) {
              return cmp.form.is_toll
            }
          }
        }
      },
      {
        title: '活动结束是否公开',
        key: 'is_public',
        type: 'switch',
        show: false,
        form: {
          component: {
            name: 'dict-switch',
            dict: {
              data: DICT_YES_NO
            }
          }
        }
      },
      {
        title: '顶栏活动标题图',
        key: 'header_image',
        type: 'image-uploader',
        disabled: true, // 设置true可以在行展示中隐藏
        component: {
          props: {
            btnSize: 'small', // type=file-uploader时按钮的大小
            type: 'qiniu', // 当前使用哪种存储后端【cos/qiniu/alioss】
            custom: {}, // 自定义参数，可以在获取token、sts时传入不同的参数给后端
            elProps: {
              // 与el-uploader配置一致
              limit: 1 // 限制上传文件数量
            }
          }
        }
      },
      {
        title: '参加权限',
        key: 'permission',
        disabled: true, // 设置true可以在行展示中隐藏
        form: { slot: true }
      },
      {
        title: '活动内容',
        key: 'content',
        disabled: true, // 设置true可以在行展示中隐藏
        type: 'editor-ueditor' // 富文本图片上传依赖file-uploader，请先配置好file-uploader
      }
    ]

  }
}
