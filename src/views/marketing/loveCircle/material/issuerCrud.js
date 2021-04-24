export const crudOptions = (statusTag, that) => {
  return {
    options: {
      height: '100%'
    },
    columns: [
      {
        title: 'ID',
        key: 'id',
        sortable: true,
        // width: 90,
        align: 'center',
        form: {
          disabled: true
        }
      },
      {
        title: '发布人名称',
        key: 'name',
        // width: 120,
        align: 'center',
        search: {
          width: 233,
          key: 'name'
        },
        form: {
          component: {
            name: 'el-input',
            placeholder: '输入发布人名称，限10个字符',
            maxlength: '10'
          },
          rules: [
            { required: true, message: '请输入发布人名称' },
            { min: 1, max: 10, message: '发布人名称长度应小于10个字符串' }
          ]

          // disabled: true
        }
      },
      {
        title: '头像',
        key: 'avatar',
        align: 'center',
        // type: 'image-uploader',
        type: 'avatar-uploader',
        width: 200,
        rowSlot: true,
        component: {
          name: 'el-image'
        },
        form: {
          rules: [
            { required: true, message: '请选择头像', trigger: 'blur' }
          ],
          component: {
            props: {
              uploader: {
                type: 'qiniu'
              }
            },
            span: 24
          }
        },
        formatter (row) {
          console.log('row,', row)
          // return 'https://image.v1.vodeshop.com/' + row.avatar
        }
      },
      {
        title: '创建日期',
        key: 'created_at',
        // width: 150,
        align: 'center',
        form: {
          disabled: true
        }
      },
      {
        title: '状态',
        key: 'is_enable',
        // width: 150,
        type: 'select',
        align: 'center',
        editDisabled: true,
        valueBuilder (row) {
          // edit组件无作用
          console.log('valueBuilder', row)
          row.is_enable = row.is_enable === 1
          // console.log('row', row)
        },
        valueResolve (row) {
          row.is_enable ? row.is_enable = 1 : row.is_enable = 0
          // console.log(row.is_enable)
        },
        addForm: {
          component: {
            name: 'el-switch',
            props: {
              activeColor: '#13ce66'
            },
            value: true
          }
        },
        editForm: {
          disabled: false,
          component: {
            name: 'el-switch',
            props: {
              activeColor: '#13ce66'
            }
          }
        },
        search: {
          width: 233,
          key: 'is_enable',
          disabled: false,
          component: {
            name: 'dict-select'
          }
        },
        component: {
          name: statusTag,
          on: {
            input: async e => {
              const { code } = await that.$apis.UpdateIssuerStatus({ id: e.props.scope.row.id, is_enable: e.props.scope.row.is_enable === 1 ? 0 : 1 })
              if (code === 0) {
                that.pageRequest(that.query)
              }
            }
          }
        },
        dict: {
          data: [
            { value: 1, label: '启用' },
            { value: 0, label: '禁用' }
          ]
        }
      }
    ],
    form: {
      width: 400
    },
    rowHandle: {
      align: 'center',
      view: false
    }
  }
}
