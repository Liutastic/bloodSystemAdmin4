<template>
  <d2-container>
    <template slot="header">权限模块</template>
    <d2-crud-x
      :columns="columns"
      :data="permissionData"
      :rowHandle="rowHandle"
      :options="options"
      @row-remove="deleteRow"
      @custom-edit="goEdit"/>
  </d2-container>
</template>

<script>
import StatusTag from './components/StatusTag'
export default {
  name: 'Template',
  data () {
    return {
      // 表头配置
      columns: [
        {
          title: 'ID',
          key: 'id',
          align: 'center',
          width: '150'
        },
        {
          title: '模板名称',
          key: 'title',
          align: 'center'
        },
        {
          title: '状态',
          key: 'status',
          align: 'center',
          component: {
            name: StatusTag
          }
        }
      ],
      // 权限列表数据
      permissionData: [],
      // 固定表头
      options: {
        height: '100%'
      },
      // 自定义操作列
      rowHandle: {
        align: 'center',
        custom: [
          {
            text: '编辑',
            type: 'primary',
            size: 'mini',
            emit: 'custom-edit',
            order: 1
          }
        ],
        remove: {
          size: 'mini',
          confirmText: '确定删除此权限模板吗？',
          confirm: true,
          order: 2
        }
      }
    }
  },
  mounted () {
    this.getPermissionList()
  },
  methods: {
    // 获取权限列表
    async getPermissionList () {
      const { code, msg, data } = await this.$apis.GetPermissionList()
      console.log(code, msg, data)
      if (code === 0) {
        this.permissionData = data.data
        console.log('this.permissionData', this.permissionData)
      }
    },
    // 删除
    async deleteRow ({ index, row }, done) {
      const { code, msg, data } = await this.$apis.DeletePermission({ id: row.id })
      console.log(code, msg, data)
      if (code === 0) {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        done()
      } else {
        this.$message({
          message: msg,
          type: 'warning'
        })
      }
    },
    // 去编辑页面
    goEdit ({ index, row }) {
      console.log(index, row)
      this.$router.push({
        path: '/marketing/loveCircle/permission/addTemplate',
        query: { id: row.id }
      })
    }
  }
}
</script>
