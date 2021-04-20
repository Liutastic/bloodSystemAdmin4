import request from '@/api/request.mock'

// import { requestForMock } from '@/api/service'
// console.log("requestForMock: " , requestForMock);
// const request = requestForMock

export const crudOptions = function (vm) {
  return {
    rowHandle: {
      // columnHeader: '操作',
      width: 370,
      custom: [
        {
          text: ' 自定义',
          type: 'warning',
          size: 'small',
          emit: 'customHandleBtn',
          icon: 'el-icon-s-flag'
        }
      ],
      fixed: 'right'
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
      maxHeight: true, // 对话框内部显示滚动条
      defaultSpan: 12, // 默认表单字段所占宽度
      updateTableDataAfterEdit: false // 添加和删除提交后，是否直接更新本地table的数据，默认会自动刷新表格，所以不需要更新本地数据
    },
    pageOptions: {
      compact: true // 是否紧凑型页面
    },
    options: {
      events: {
        /**
         *  默认没有支持的事件需要在此配置
         https://element.eleme.cn/#/zh-CN/component/table#table-events

         * 默认已经支持的事件
         @select
         @sort-change
         @cell-mouse-enter
         @cell-mouse-leave
         @cell-click
         @cell-dblclick
         @row-click
         @row-contextmenu
         @row-dblclick
         @header-click
         @header-contextmenu
         @current-change
         'select-all'
         'selection-change'
         */
        'expand-change': (row, arg2) => {
          console.log('expand-changed:', row, arg2)
        }
      },
      height: '100%', // 表格高度100%, 使用toolbar必须设置
      highlightCurrentRow: true,
      rowKey: 'id',
      lazy: true,
      load: (tree, treeNode, resolve) => {
        request({
          url: '/api/column/children',
          method: 'get',
          data: { id: tree.id }
        }).then(ret => {
          console.log('懒加载数据', ret.data)
          // 执行valueBuilder
          vm._doRowValueBuilder(ret.data)
          resolve(ret.data)
        })
      },
      showSummary: true,
      summaryMethod (param) {
        const { columns, data } = param
        const sums = []
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总价'
            return
          }
          const values = data.map(item => Number(item[column.property]))
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0)
            sums[index] += ' 元'
          } else {
            sums[index] = ''
          }
        })

        return sums
      }
    },
    indexRow: {
      // 或者直接传true,不显示title，不居中
      title: '序号',
      align: 'center'
    },
    selectionRow: {
      align: 'center',
      width: 100
    },
    expandRow: {
      // 或者直接传true,不显示title，不居中
      title: '展开',
      align: 'center'
    },
    columns: [
      {
        title: '数据列',
        key: 'data',
        sortable: true,
        width: 200
      },
      {
        title: 'ID',
        key: 'id',
        width: 90,
        form: {
          disabled: true
        }
      },
      {
        title: '时间',
        key: 'time',
        type: 'datetime',
        sortable: true,
        search: { key: 'time', disabled: false },
        width: 160,
        showOverflowTooltip: true

      },
      {
        title: '级联式',
        key: 'pca',
        type: 'area-selector',
        form: {
          helper: '级联式，获取到的值为code'
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
        },
        width: 300
      },

      {
        title: '金额(元)',
        key: 'amount',
        sortable: true,
        form: {
          rules: [
            { required: true, message: '请输入姓名,' },
            { pattern: /^\d+$/, message: '必须为整数' }
          ]
        }
      },
      {
        title: '图片',
        key: 'image',
        type: 'image-uploader',
        disabled: true,
        width: 200,
        form: {
          component: {
            props: {
              btnSize: 'small', // type=file-uploader时按钮的大小
              btnName: '选择文件', // type=file-uploader时按钮文字
              accept: '.png', // 接受的文件后缀类型
              suffix: '', // url后缀，用于图片样式处理，需要到对象存储平台配置样式
              type: 'qiniu', // 当前使用哪种存储后端【cos/qiniu/alioss】
              custom: {}, // 自定义参数，可以在获取token、sts时传入不同的参数给后端
              elProps: { // 与el-uploader配置一致
                limit: 1 // 限制上传文件数量
              }
            }
          }
        }
      },
      {
        title: '切换编辑器',
        key: 'change',
        sortable: false,
        type: 'radio',
        disabled: true,
        dict: { data: [{ value: 'quill', label: 'Quill' }, { value: 'ueditor', label: 'UEditor' }, { value: 'wang', label: 'WangEditor' }] }
      },
      {
        title: '内容',
        key: 'content',
        sortable: true,
        width: 300,
        type: 'editor-quill', // 富文本图片上传依赖file-uploader，请先配置好file-uploader
        disabled: true, // 设置true可以在行展示中隐藏
        form: {
          component: {
            disabled: () => {
              return vm.getEditForm().disable
            },
            props: {
              uploader: {
                type: 'qiniu' // 上传后端类型【cos,aliyun,oss,form】
              }
            },
            events: {
              'text-change': (event) => {
                console.log('text-change:', event)
              }
            },
            show (context) {
              return context.form.change === 'quill'
            }
          }
        }
      },
      {
        title: '内容',
        key: 'content_ueditor',
        sortable: true,
        width: 300,
        type: 'editor-ueditor', // 富文本图片上传依赖file-uploader，请先配置好file-uploader
        disabled: true, // 设置true可以在行展示中隐藏
        form: {
          component: {
            disabled: () => {
              return vm.getEditForm().disable
            },
            props: {
              config: {
                // serverUrl: 'https://test.api.vodeshop.com/ueditor/server?action=config'
                imageActionName: 'upload-image', imageFieldName: 'upfile', imageMaxSize: 2097152, imageAllowFiles: ['.png', '.jpg', '.jpeg', '.gif', '.bmp'], imageCompressEnable: true, imageCompressBorder: 1600, imageInsertAlign: 'none', imageUrlPrefix: '', imagePathFormat: '/uploads/image/{yyyy}/{mm}/{dd}/', scrawlActionName: 'upload-scrawl', scrawlFieldName: 'upfile', scrawlPathFormat: '/uploads/image/{yyyy}/{mm}/{dd}/', scrawlMaxSize: 2048000, scrawlUrlPrefix: '', scrawlInsertAlign: 'none', snapscreenActionName: 'upload-image', snapscreenPathFormat: '/uploads/image/{yyyy}/{mm}/{dd}/', snapscreenUrlPrefix: '', snapscreenInsertAlign: 'none', catcherLocalDomain: ['127.0.0.1', 'localhost', 'img.baidu.com'], catcherActionName: 'catch-image', catcherFieldName: 'source', catcherPathFormat: '/uploads/image/{yyyy}/{mm}/{dd}/', catcherUrlPrefix: '', catcherMaxSize: 2048000, catcherAllowFiles: ['.png', '.jpg', '.jpeg', '.gif', '.bmp'], videoActionName: 'upload-video', videoFieldName: 'upfile', videoPathFormat: '/uploads/video/{yyyy}/{mm}/{dd}/', videoUrlPrefix: '', videoMaxSize: 102400000, videoAllowFiles: ['.flv', '.swf', '.mkv', '.avi', '.rm', '.rmvb', '.mpeg', '.mpg', '.ogg', '.ogv', '.mov', '.wmv', '.mp4', '.webm', '.mp3', '.wav', '.mid'], fileActionName: 'upload-file', fileFieldName: 'upfile', filePathFormat: '/uploads/file/{yyyy}/{mm}/{dd}/', fileUrlPrefix: '', fileMaxSize: 51200000, fileAllowFiles: ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.flv', '.swf', '.mkv', '.avi', '.rm', '.rmvb', '.mpeg', '.mpg', '.ogg', '.ogv', '.mov', '.wmv', '.mp4', '.webm', '.mp3', '.wav', '.mid', '.rar', '.zip', '.tar', '.gz', '.7z', '.bz2', '.cab', '.iso', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.pdf', '.txt', '.md', '.xml'], imageManagerActionName: 'list-image', imageManagerListPath: '/uploads/image/', imageManagerListSize: 20, imageManagerUrlPrefix: '', imageManagerInsertAlign: 'none', imageManagerAllowFiles: ['.png', '.jpg', '.jpeg', '.gif', '.bmp'], fileManagerActionName: 'list-file', fileManagerListPath: '/uploads/file/', fileManagerUrlPrefix: '', fileManagerListSize: 20, fileManagerAllowFiles: ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.flv', '.swf', '.mkv', '.avi', '.rm', '.rmvb', '.mpeg', '.mpg', '.ogg', '.ogv', '.mov', '.wmv', '.mp4', '.webm', '.mp3', '.wav', '.mid', '.rar', '.zip', '.tar', '.gz', '.7z', '.bz2', '.cab', '.iso', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.pdf', '.txt', '.md', '.xml']
              }
            },
            show (context) {
              return context.form.change === 'ueditor'
            }
          }
        }
      },
      {
        title: '内容',
        key: 'content_wang',
        sortable: true,
        width: 300,
        type: 'editor-wang', // 富文本图片上传依赖file-uploader，请先配置好file-uploader
        disabled: true, // 设置true可以在行展示中隐藏
        form: {
          component: {
            disabled: () => {
              return vm.getEditForm().disable
            },
            props: {
              config: {
                // withCredentials: false,
                // uploadImgServer: 'http://localhost:7070/api/upload/form/upload'
              }
            },
            show (context) {
              return context.form.change === 'wang'
            }
          }
        }
      },
      {
        title: '图标选择',
        key: 'iconSelect',
        sortable: true,
        type: 'icon-selector',
        disabled: true, // 设置true可以在行展示中隐藏
        form: {
          rules: [{ required: true, message: '请选择' }]
        }
      },
      {
        title: '用户可输入',
        key: 'iconSelect2',
        sortable: true,
        type: 'icon-selector',
        disabled: true, // 设置true可以在行展示中隐藏
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
}
