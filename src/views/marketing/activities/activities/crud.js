import StringUtils from 'd2-crud-plus/src/lib/utils/util.string'
import { IMGBASEURL } from '@/api/config'
import { DICT_STATUS, DICT_STATIS_TYPE, DICT_YES_NO } from './dict.js'
import API from './api'
import util from '@/libs/util'
import UEditorConfig from '@/api/UEditor-config'

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
const ShortCUTS = [
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

export const crudOptions = vm => {
  return {
    options: {
      height: '100%', // 表格高度100%,使用toolbar必须设置
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
        search: {
          disabled: false,
          compnent: {
            // 查询 使用选择框组件，并且是可以清除的
            name: 'dict-select',
            props: {
              clearable: true
            }
          }
        },
        dict: {
          url: '/svc/marketing-svc/admin/v1/activity/release-type',
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
            console.log('component:', component.dict)

            const childArr = component.dict.data.filter(item => item.id === value)
            const dictChild =
              childArr[0].child ??
              []
            form.category_id = undefined // 将“city”的值置空
            await getComponent('category_id').reloadDict() // 执行city的select组件的reloadDict()方法，触发“city”重新加载字典
            getComponent('category_id').setDictData(dictChild)

            // 配置权限字段
            vm.getEditFormTemplate('permissions').title = childArr[0]?.name
            await getComponent('permissions').loadDict() // 执行city的select组件的reloadDict()方法，触发“city”重新加载字典
            // console.log(getComponent('permissions'))
            // const permissionDict = await getComponent('permissions').getDictData()
            // console.log('permissionDict:', permissionDict)
            // const dictArr = permissionDict.map(item => item.value)
            // console.log('dictArr:', dictArr)
            // await getComponent('permissions').setValue(dictArr)
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
          value: 'id', // 数据字典中value字段的属性名
          label: 'name', // 数据字典中label字段的属性名
          children: 'child', // children的属性名
          //  覆盖全局getRemoteDictData方法,返回 Promise<[dictData]>
          getData: async (url, dict, { form, component }) => {
            const { data } = await API.getActivityReleaseType()
            const distData = []
            data.filter(item => {
              if (item.id === form.release_type) return distData.push(...item.child)
            })
            return distData
          },
          onDictChanged () {
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
        title: '参加权限',
        key: 'permissionTitle',
        disabled: true, // 设置true可以在行展示中隐藏
        form: {
          slot: true,
          component: {
            show () {
              // 有权限列表按钮才展示
              const iShow = vm.getEditFormTemplate('permissions')?.component?.props
                ?.dict?.dict?.length
              return Boolean(iShow)
            }
          }
        },
        view: {
          disabled: true
        }

      },
      {
        title: '',
        key: 'permissions',
        type: 'checkbox',
        disabled: true, // 设置true可以在行展示中隐藏

        dict: {
          value: 'value', // 数据字典中value字段的属性名
          label: 'name', // 数据字典中label字段的属性名
          getData: async (url, dict, { form, component }) => {
            // 配置此参数会覆盖全局的getRemoteDictFunc
            const ret = await API.getPermissionsTags({ release_type: form.release_type })
            let { data } = ret
            // 转字符串防止checkbox报错
            data = data.map((item, idx) => ({
              ...item,
              id: item.id.toString()
            }))

            if (!form.id) {
              form.permissions = data.map(item => item.value)
            }

            dict.dict = data
            return data
          },

          onReady (data, dict, { component }) {
            console.log('data, dict, { component }:', data, dict, component)

            // 远程数据字典加载完成事件，每个引用该字典的组件都会触发一次
            // console.log('context22:', vm.getEditFormTemplate('permissions'))
            // console.log(vm.getEditFormTemplate('permissions').component)
          }
        }

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
        search: {
          title: '报名时间',
          disabled: false,
          span: 10,
          compnent: {
            // 查询 使用选择框组件，并且是可以清除的
          }
        },
        form: {
          title: '报名时间',
          component: {
            props: {
              'time-arrow-control': true,
              'default-time': ['00:00:00', '00:00:00'],
              'picker-options': { shortcuts: ShortCUTS }
            }
          },
          rules: [{ required: true, message: '请选择报名时间' }]
        },
        valueBuilder (row, key) {
          if (!StringUtils.hasEmpty(row.sign_start_at, row.sign_end_at)) {
            row.signDate = [
              new Date(row.sign_start_at),
              new Date(row.sign_end_at)
            ]
          }
        },
        valueResolve (row, key) {
          if (row.signDate?.length > 1) {
            row.sign_start_at = util.formatDate(row.signDate[0])
            row.sign_end_at = util.formatDate(row.signDate[1])
          } else {
            row.sign_start_at = null
            row.sign_end_at = null
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
        search: {
          title: '活动时间',
          disabled: false,
          span: 10,
          compnent: {
            // 查询 使用选择框组件，并且是可以清除的
          }
        },
        form: {
          title: '活动时间',
          component: {
            props: {
              'time-arrow-control': true,
              'default-time': ['00:00:00', '00:00:00'],
              'picker-options': { shortcuts: ShortCUTS }
            }
          },
          rules: [{ required: true, message: '请选择活动时间' }]
        },
        formatter (row) {
          return row.activity_end_at
        },
        valueBuilder (row, key) {
          if (!StringUtils.hasEmpty(row.activity_start_at, row.activity_end_at)) {
            row.activityDate = [
              new Date(row.activity_start_at),
              new Date(row.activity_end_at)
            ]
          }
        },
        valueResolve (row, key) {
          if (row.activityDate?.length > 1) {
            row.activity_start_at = util.formatDate(row.activityDate[0])
            row.activity_end_at = util.formatDate(row.activityDate[1])
          } else {
            row.activity_start_at = null
            row.activity_end_at = null
          }
        }
      },
      {
        title: '参与人数',
        key: 'sign_count',
        rowSlot: true,

        form: {
          disabled: true
        }
      },

      {
        title: '启用状态',
        key: 'is_enable',
        type: 'select',
        width: '100px',
        dict: {
          data: DICT_STATUS
        },
        search: {
          disabled: false,
          compnent: {
            // 查询 使用选择框组件，并且是可以清除的
            name: 'dict-select'

          }
        },
        component: {

          on: {
            click (event) {
              // 获取选中行ID
              const title = event.scope.row?.title
              const status = Math.abs(event.props.value - 1)
              console.log('event:', event, status)
              vm.$confirm(`此操作将${status ? '启用' : '禁用'}该活动（${title}）, 是否继续 ? `, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(async () => {
                await vm.updateRequest({ ...event.scope.row, is_enable: status })
                vm.$message.success('操作成功')
                await vm.doRefresh()
              })
            }
          }
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
        width: '80px',
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
        type: 'number',
        form: {
          value: 0,
          rules: [{ required: true, message: '请输入收费金额' }],
          component: {
            show (cmp) {
              return cmp.form.is_toll
            },
            props: {
              min: '0',
              precision: '2'
            }
          }
        },
        valueResolve (row, key) {
          if (!row.is_toll) {
            row.toll_amount = 0
          }
        }
      },
      {
        title: '活动结束是否公开',
        key: 'is_public',
        type: 'select',
        dict: {
          data: DICT_YES_NO
        },
        show: false,
        search: {
          disabled: false,
          compnent: {
            // 查询 使用选择框组件，并且是可以清除的
            name: 'dict-select'

          }
        },
        form: {
          rules: [{ required: true, message: '请选择活动结束是否公开' }],
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
        title: '顶栏活动标题图',
        key: 'header_image',
        type: 'image-uploader',
        disabled: true, // 设置true可以在行展示中隐藏
        width: 200,
        form: {
          rules: [{ required: true, message: '请上传顶栏活动标题图' }],

          component: {
            props: {
              btnSize: 'small', // type=file-uploader时按钮的大小
              type: 'qiniu', // 当前使用哪种存储后端【cos/qiniu/alioss】
              custom: {}, // 自定义参数，可以在获取token、sts时传入不同的参数给后端
              elProps: {
                // 与el-uploader配置一致
                limit: 1 // 限制上传文件数量
              },
              returnType: 'key', // 添加和编辑上传提交的值不要url，而只要key
              buildUrl (value, item) {
                // 私有下载链接，在后端构建cos签名后的url，然后redirect到该地址进行下载
                return IMGBASEURL + value
              }
            }
          }
        }
      },
      {
        title: '活动内容',
        key: 'content',
        disabled: true, // 设置true可以在行展示中隐藏
        type: 'editor-ueditor', // 富文本图片上传依赖file-uploader，请先配置好file-uploader
        form: {
          rules: [{ required: true, message: '请输入活动内容' }],
          component: {
            props: {
              config: UEditorConfig
            }
          }
        }
      },
      {
        title: '活动分享图',
        key: 'share_image',
        type: 'image-uploader',
        disabled: true, // 设置true可以在行展示中隐藏
        width: 200,
        form: {
          rules: [{ required: true, message: '请上传活动分享图' }],
          component: {
            props: {
              btnSize: 'small', // type=file-uploader时按钮的大小
              type: 'qiniu', // 当前使用哪种存储后端【cos/qiniu/alioss】
              custom: {}, // 自定义参数，可以在获取token、sts时传入不同的参数给后端
              elProps: {
                // 与el-uploader配置一致
                limit: 1 // 限制上传文件数量
              },
              returnType: 'key', // 添加和编辑上传提交的值不要url，而只要key
              buildUrl (value, item) {
                // 私有下载链接，在后端构建cos签名后的url，然后redirect到该地址进行下载
                return IMGBASEURL + value
              }
            }
          }
        }
      }
    ]

  }
}
