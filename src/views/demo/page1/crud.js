import request from "@/api/request.mock";

// import { requestForMock } from '@/api/service'
// console.log("requestForMock: " , requestForMock);
// const request = requestForMock

export const crudOptions = function(vm) {
  return {
    rowHandle: {
      // columnHeader: '操作',
      width: 370,
      custom: [
        {
          text: " 自定义",
          type: "warning",
          size: "small",
          emit: "customHandleBtn",
          icon: "el-icon-s-flag"
        }
      ],
      fixed: "right"
    },
    formOptions: {
      // 编辑对话框及el-form的配置
      type: "drawer", //默认对话框模式，drawer 抽屉模式
      size: "60%", //抽屉模式的宽度
      fullscreen: true, //全屏按钮，传null则隐藏全屏按钮，抽屉模式请隐藏
      draggable: true, //是否支持表单对话框拖拽，抽屉模式请关闭
      saveRemind: true, //有修改时是否需要保存提醒，也可以传入一个方法，自定义确认对话框，()=> return vm.$confirm({})
      labelWidth: "100px",
      labelPosition: "left",
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
        "expand-change": (row, arg2) => {
          console.log("expand-changed:", row, arg2);
        }
      },
      height: "100%", // 表格高度100%, 使用toolbar必须设置
      highlightCurrentRow: true,
      rowKey: "id",
      lazy: true,
      load: (tree, treeNode, resolve) => {
        request({
          url: "/column/children",
          method: "get",
          data: { id: tree.id }
        }).then(ret => {
          console.log("懒加载数据", ret.data);
          // 执行valueBuilder
          vm._doRowValueBuilder(ret.data);
          resolve(ret.data);
        });
      },
      showSummary: true,
      summaryMethod(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = "总价";
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += " 元";
          } else {
            sums[index] = "";
          }
        });

        return sums;
      }
    },
    indexRow: {
      // 或者直接传true,不显示title，不居中
      title: "序号",
      align: "center"
    },
    selectionRow: {
      align: "center",
      width: 100
    },
    expandRow: {
      // 或者直接传true,不显示title，不居中
      title: "展开",
      align: "center"
    },
    columns: [
      {
        title: "数据列",
        key: "data",
        sortable: true,
        width: 200
      },
      {
        title: "ID",
        key: "id",
        width: 90,
        form: {
          disabled: true
        }
      },
      {
        title: "时间",
        key: "time",
        type: "datetime",
        sortable: true,
        search: { key: "time", disabled: false },
        width: 160,
        showOverflowTooltip: true,

      },
      {
        title: "时间1",
        key: "time1",
        // type: "datetime",
        type: 'text-area',
        sortable: true,
        search: { key: "time1", disabled: false },
        // width: 160,
        form: {
          title: "表单", //默认使用column的title
          rules: [
            // 表单校验规则
            //更多帮助请参考 https://element.eleme.cn/#/zh-CN/component/form#zi-ding-yi-xiao-yan-gui-ze
            { required: true, message: "请选择地区" }
          ],
          component: {
            //添加和修改时form表单的组件
            name: "dict-select", //表单组件名称，支持任何v-model组件
            value: null, //组件默认值，你还可以通过覆盖doDialogOpened(context)方法，修改context.form.xx的值
            props: {
              //表单组件的参数，具体参数请查看对应的组件文档
              // 如何查找组件配置，请参考
              // http://d2-crud-plus.docmirror.cn/d2-crud-plus/guide/component.html
              separator: ",", //dict-select的组件参数，[不同组件参数不同]
              elProps: {
                //dict-select内部封装了el-select
                filterable: true, //可过滤选择项
                multiple: true, //支持多选
                clearable: true //可清除
              },
              dict: {} //详细见dict配置。运行时，会将column.dict复制到此处，再由此处配置的dict覆盖
            },
            placeholder: "",
            disabled: false, //是否在表单中禁用组件，可以配置为方法，动态禁用↓  ↓  ↓  ↓
            // disabled(context){return false}
            readonly: false, //表单组件是否是只读，还可以配置为方法，动态只读↓  ↓  ↓  ↓
            // readonly(context){return false}
            show: true, //是否显示该字段，还可以配置为方法，动态显隐↓  ↓  ↓  ↓
            // show(context){return false}
            on: {
              //除input change事件外，更多组件事件监听
              select(event) {
                console.log(event);
              } //监听表单组件的select事件
            },
            slots: {
              //插槽渲染
              default: (h, scope) => {
                //默认的scoped插槽
                return <div>{scope.data}</div>;
              }
            },
            children: [
              //子元素
              h => {
                return <div slot="prefix">非scoped插槽</div>;
              }
            ],
            span: 12 //该字段占据多宽，24为占满一行
          },
          order: 1, //排序号，默认为10，数字越小 越靠前
          //注意：↓↓↓↓ 以下三个disabled，仅初始化时有效，不可动态启用，需要动态显隐字段请配置component.show
          disabled: false, //完全关闭该字段在表单中显示
          addDisabled: false, //是否仅在添加编辑框中关闭该字段
          editDisabled: false, //是否仅在修改编辑框中关闭该字段
          /**
             * @param value 当前选择的值
             * @param form 当前表单
             * @param getColumn 获取字段配置的方法，getColumn(keyName) 返回keyName的字段配置，可以动态修改组件配置
             * @param mode 当前模式:【add、edit、search】
             * @param component 当前组件的ref
             * @param immediate 是否是对话框打开后立即触发的
             * @param getComponent 获取组件Ref的方法， getComponent(keyName), 返回组件ref，可以动态调用该组件的方法
                  注意：当component未初始化或者没有显示时，是获取不到组件ref的
          **/
          valueChange(
            key,
            value,
            form,
            { getColumn, mode, component, immediate, getComponent }
          ) {
            // form表单数据change事件，表单值有改动将触发此事件
          },
          valueChangeImmediate: false, //是否在打开对话框后触发一次valueChange事件
          // 是否启用form编辑框的slot插槽,需要d2-crud-x才支持
          // 示例 http://preview.d2-crud-plus.docmirror.cn/D2CrudPlusExample/#/demo/form/slot
          slot: false,
          itemProps: {
            // el-form-item的配置
            //  https://element.eleme.cn/#/zh-CN/component/form#form-item-attributes
            labelWidth: "0px" //可以隐藏表单项的label
          }
        },
        dict: {
          data: [
            { value: "sz", label: "111111111" },
            { value: "gz", label: "2222222222" },
            { value: "wh", label: "33333333333" },
            { value: "sh", label: "44444444" }
          ]
        }
      },
      {
        title: "地区",
        key: "province",
        sortable: true,
        search: { key: "province", disabled: false },
        type: "select",
        form: {
          component: {
            props: { filterable: true, multiple: true, clearable: true }
          }
        },
        dict: {
          data: [
            { value: "sz", label: "深圳" },
            { value: "gz", label: "广州" },
            { value: "wh", label: "武汉" },
            { value: "sh", label: "上海" }
          ]
        },
        width: 300
      },
      {
        title: "金额(元)",
        key: "amount",
        sortable: true,
        form: {
          rules: [
            { required: true, message: "请输入姓名," },
            { pattern: /^\d+$/, message: "必须为整数" }
          ]
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
                type: 'form' // 上传后端类型【cos,aliyun,oss,form】
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
                serverUrl: '/api/ueditor/'
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
      }
    ]
  };
};
